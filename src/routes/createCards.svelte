<script>
  import { Navbar, Button, Card, Input, Radio } from "spaper";
  import { _ } from "svelte-i18n";
  import { initializeApp, getApps, getApp } from "firebase/app";
  import { firebaseConfig } from "../lib/firebaseConfig.svelte";
  import { userId, userEmail } from "../lib/Auth.svelte";
  import {
    getFirestore,
    doc,
    collection,
    updateDoc,
    getDoc,
  } from "firebase/firestore";

  export let params = {};

  const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  const db = getFirestore(app);

  let cardType = "";
  let cardsCreated = [];
  let cards = [];
  let front = "";
  let back = "";
  function goBack() {
    let Url = "";

    if (window.location.hostname == "127.0.0.1") {
      Url = `http://127.0.0.1:5173/#/set/${params.userId}/${params.setId}`;
    } else if (window.location.hostname == "langcards.vercel.app") {
      Url = `https://langcards.vercel.app/#/createCards/${params.userId}/${params.setId}`;
    }

    return Url;
  }

  async function createCard() {
    if (front == "") return;
    if (back == "") return;
    if (cardType == "") return;

    const docRef = doc(db, "users", params.userId);
    const colRef = doc(docRef, "sets", params.setId);

    const qSnap = await updateDoc(colRef, {
      Cards: [
        ...cards,
        {
          front,
          back,
          cardType,
        },
      ],
    });

    console.log("updated, Qsnap: ", qSnap);
    cardsCreated = [...cardsCreated, { front, back, cardType }];
    console.log("cardsCreated: ", cardsCreated);

    front = "";
    back = "";
    cardType = "";
  }

  async function getSet() {
    const docRef = doc(db, "users", params.userId);
    const colRef = doc(docRef, "sets", params.setId);
    const docSnap = await getDoc(colRef);
    if (docSnap.exists()) {
      let set = docSnap.data();
      console.log("Document data:", docSnap.data());
      cards = [...cards, ...set.Cards];
    }
  }

  getSet();
</script>

<main>
  <Navbar>
    <h3 slot="brand">
      <a href={goBack()}>{$_("langCards")}</a>
    </h3>
    <ul class="inline">
      <li>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-arrow-left-circle-fill"
          viewBox="0 0 16 16"
        >
          <path
            d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"
          />
        </svg>
        <a href={goBack()}>{$_("back")}</a>
      </li>
    </ul>
  </Navbar>
  <div class="container margin-top-small">
    <div class="row">
      <Input
        bind:value={front}
        class="col-6 s-12"
        type="textarea"
        placeholder={$_("front")}
      />
      <Input
        bind:value={back}
        class="col-6 s-12"
        type="textarea"
        placeholder={$_("back")}
      />
    </div>

    <div class="row">
      <div class="padding border border-5 grid-center col-6 col">
        <Button on:click={createCard} block>{$_("add")}</Button>
      </div>

      <div class="col-6 col padding border border-5 grid-center">
        <fieldset class="form-group">
          <legend>{$_("howMuchDoYouKnowTheCard")}</legend>
          <Radio
            value="Known"
            label={$_("iKnowTheCard")}
            bind:group={cardType}
          />
          <Radio
            value="Kinda"
            label={$_("iKindOfKnowTheCard")}
            bind:group={cardType}
          />
          <Radio
            value="Unknown"
            label={$_("iDontKnowTheCard")}
            bind:group={cardType}
          />
        </fieldset>
      </div>
    </div>
    <div class="cards-container" style="margin-top: 20px;">
      {#each cardsCreated as createdCard}
        <div
          class="padding border border-3"
          class:background-success={createdCard.cardType == "Known"}
          class:background-warning={createdCard.cardType == "Kinda"}
          class:background-danger={createdCard.cardType == "Unknown"}
        >
          <div class="padding border-down">{createdCard.front}</div>
          <div class="padding">{createdCard.back}</div>
        </div>
      {/each}
    </div>
  </div>
</main>

<style>
  .grid-center {
    display: grid;
    place-items: center;
  }

  .border-down {
    border-bottom: 1px solid #41403e;
  }

  .cards-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 7px;
  }
  @media screen and (max-width: 600px) {
    .cards-container {
      display: grid;
      grid-template-columns: 1fr;
      gap: 5px;
    }
  }
</style>
