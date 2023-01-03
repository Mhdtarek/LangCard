<script>
  import { Navbar, Button, Card } from "spaper";
  import { _ } from "svelte-i18n";
  import { initializeApp, getApps, getApp } from "firebase/app";
  import { firebaseConfig } from "../lib/firebaseConfig.svelte";
  import {
    getFirestore,
    doc,
    addDoc,
    getDoc,
    collection,
    getDocs,
  } from "firebase/firestore";
  export let params = {};
  const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  const db = getFirestore(app);

  let cards = [];

  let nothingToStudy = false;

  function goHome() {
    let homeUrl = "";

    if (window.location.hostname == "127.0.0.1") {
      homeUrl = "http://127.0.0.1:5173/#/";
    } else if (window.location.hostname == "langcards.vercel.app") {
      homeUrl = "https://langcards.vercel.app/#/";
    }

    return homeUrl;
  }

  function createCards() {
    let Url = "";

    if (window.location.hostname == "127.0.0.1") {
      Url = `http://127.0.0.1:5173/#/createCards/${params.userId}/${params.setId}`;
    } else if (window.location.hostname == "langcards.vercel.app") {
      Url = `https://langcards.vercel.app/#/createCards/${params.userId}/${params.setId}`;
    }

    window.location.replace(Url);
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
      <a href={goHome()}>{$_("langCards")}</a>
    </h3>
    <ul class="inline" />
  </Navbar>
  <div
    class="border border-6 container padding padding-4 margin-top background-secondary row"
  >
    {#if !nothingToStudy}
      <div class="col col-6 "><Button block>{$_("study")}</Button></div>
      <div class="col col-6 "><Button block>{$_("test")}</Button></div>
    {/if}
    {#if nothingToStudy}
      <h3 class="center-text col-12">{$_("nothingToStudy")}</h3>
      <div class="col col-6 "><Button block>{$_("studyAnyway")}</Button></div>
      <div class="col col-6 "><Button block>{$_("test")}</Button></div>
    {/if}
  </div>

  <div class="container cards-container" style="margin-top: 20px;">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="padding border border-5 grid-center background-primary">
      <Button on:click={createCards} block>{$_("addCard")}</Button>
    </div>
    {#each cards as card}
      <div class="padding border border-3">
        <div class="padding border-down">{card.front}</div>
        <div class="padding">{card.back}</div>
      </div>
    {/each}
  </div>

  {JSON.stringify(params)}
</main>

<style>
  .grid-center {
    display: grid;
    place-items: center;
  }
  .add-card-center {
    text-align: center;
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
