<script>
  import { Button, Card, Navbar, Modal, Input } from "spaper";
  import { firebaseConfig } from "../lib/firebaseConfig.svelte";
  import { initializeApp, getApps, getApp } from "firebase/app";
  import { userId, userName, userLanguage } from "../lib/Auth.svelte";
  import {
    getFirestore,
    doc,
    addDoc,
    getDoc,
    collection,
    getDocs,
  } from "firebase/firestore";
  import { _, locale } from "svelte-i18n";

  const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  const db = getFirestore(app);

  let sets = [];
  let showCreateSetModal = false;
  let newSetName = "";

  function goHome() {
    let homeUrl = "";

    if (window.location.hostname == "127.0.0.1") {
      homeUrl = "http://127.0.0.1:5173/#/";
    } else if (window.location.hostname == "langcards.vercel.app") {
      homeUrl = "https://langcards.vercel.app/#/";
    }

    return homeUrl;
  }

  async function getSets() {
    const querySnapshot = await getDocs(
      collection(db, "users", $userId, "sets")
    );
    querySnapshot.forEach((set) => {
      // doc.data() is never undefined for query doc snapshots
      let document = set;
      sets = [...sets, [set.data(), set.id]];
      console.log(sets);
    });
  }

  async function goToSet(setId) {
    if (window.location.hostname == "127.0.0.1") {
      location.replace(`http://127.0.0.1:5173/#/set/${$userId}/${setId}`);
    } else if (window.location.hostname == "langcards.vercel.app") {
      location.replace(
        `https://langcards.vercel.app/#/set/${$userId}/${setId}`
      );
    }
  }

  async function createSet() {
    const docRef = doc(db, "users", $userId);
    const colRef = collection(docRef, "sets");

    const qSnap = await addDoc(colRef, {
      title: newSetName,
      cards: [],
    });
    sets = [...sets, [{ title: newSetName, cards: {} }, qSnap.id]];
  }

  locale.set($userLanguage);
  getSets();
</script>

<main>
  <Navbar>
    <h3 slot="brand">
      <a href={goHome()}>{$_("langCards")}</a>
    </h3>
    <ul class="inline" />
  </Navbar>
  <div class="row flex-right mini-container">
    <label class="paper-btn margin" for="modal-1">{$_("createSet")}</label>
  </div>
  <input class="modal-state" id="modal-1" type="checkbox" />

  <div class="modal">
    <div class="modal-body">
      <label class="btn-close" for="modal-1">X</label>
      <h4 class="modal-title">{$_("createSet")}</h4>
      <p class="modal-text">
        <Input bind:value={newSetName} label={$_("nameOfSet")} />
        <Button on:click={() => createSet()}>{$_("create")}</Button>
      </p>
    </div>
  </div>

  <body>
    {#if Boolean(sets) == false}
      <p class="text-center italic">{$_("noSets")}</p>
    {/if}
    <div class="grid container">
      {#each sets as set}
        <Card title={set[0].title} subTitle={set[0].subtitle}>
          <Button slot="footer" on:click={() => goToSet(set[1])}
            >{$_("play")}</Button
          >
        </Card>
      {/each}
    </div>
  </body>
</main>

<style>
  body {
    margin-top: 10px;
  }
  .grid {
    margin-top: 5px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    grid-template-rows: auto;
  }
  .mini-container {
    margin: 0 20px;
  }
</style>
