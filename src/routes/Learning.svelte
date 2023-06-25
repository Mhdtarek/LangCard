<script>
  import { Button, Modal } from "spaper";
  import { number, _ } from "svelte-i18n";
  import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
  import { firebaseConfig } from "../lib/firebaseConfig.svelte";
  import { initializeApp, getApps, getApp } from "firebase/app";

  export let params = {};

  let unknownQuestion = [];
  let kindaKnownQuestion = [];
  let knownQuestion = [];
  let allQuestion = [];

  let totalCardsNumber =
    unknownQuestion.length + kindaKnownQuestion.length + knownQuestion.length;

  const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  const db = getFirestore(app);

  let currentCard = {
    front: "",
    back: "",
    posInArray: 0,
    cardType: "",
  };

  let cardsDone = 0;
  let answerMode = false;

  function goBack() {
    let Url = "";

    if (window.location.hostname == "127.0.0.1") {
      Url = `http://127.0.0.1:5173/#/set/${params.userId}/${params.setId}`;
    } else if (window.location.hostname == "langcards.vercel.app") {
      Url = `https://langcards.vercel.app/#/set/${params.userId}/${params.setId}`;
    }

    window.location.replace(Url);

    updateSet();
  }

  function generateQuestion() {
    // checks if there is any question that is unknown
    if (unknownQuestion.length != 0) {
      // let question = ""

      let generateCard = Math.floor(Math.random() * unknownQuestion.length);
      let cardPosinArray = unknownQuestion[generateCard];
      answerMode = false;

      currentCard = {
        front: cardPosinArray.front,
        back: cardPosinArray.back,
        posInArray: generateCard,
        cardType: "unknown",
      };

      console.log({ unknownQuestion, kindaKnownQuestion, knownQuestion });

      return cardPosinArray;
      // return question
    }

    if (kindaKnownQuestion.length != 0) {
      let generateCard = Math.floor(Math.random() * kindaKnownQuestion.length);
      let cardPosinArray = kindaKnownQuestion[generateCard];
      answerMode = false;

      currentCard = {
        front: cardPosinArray.front,
        back: cardPosinArray.back,
        posInArray: generateCard,
        cardType: "kinda",
      };

      console.log({ unknownQuestion, kindaKnownQuestion, knownQuestion });

      return cardPosinArray;
      // return question
    }

    if (knownQuestion.length != 0) {
      let generateCard = Math.floor(Math.random() * knownQuestion.length);
      let cardPosinArray = knownQuestion[generateCard];
      answerMode = false;

      currentCard = {
        front: cardPosinArray.front,
        back: cardPosinArray.back,
        posInArray: generateCard,
        cardType: "known",
      };

      console.log({ unknownQuestion, kindaKnownQuestion, knownQuestion });

      return cardPosinArray;
      // returns the question
    }
  }

  function unknownKnowBtn(cardType) {
    if (cardType == "unknown") {
      cardsDone++;
      generateQuestion();
    }

    if (cardType == "kinda") {
      let card = currentCard;
      kindaKnownQuestion.splice(card.posInArray, 1);
      unknownQuestion.push(card);
      cardsDone++;
      generateQuestion();
    }

    if (cardType == "known") {
      knownQuestion.splice(currentCard.posInArray, 1);
      unknownQuestion.push(currentCard);
      cardsDone++;
      generateQuestion();
    }
  }

  function kindaKnowBtn(cardType) {
    if (cardType == "unknown") {
      let card = currentCard;
      unknownQuestion.splice(card.posInArray, 1);
      kindaKnownQuestion.push(card);
      cardsDone++;
      generateQuestion();
    }

    if (cardType == "kinda") {
      cardsDone++;
      generateQuestion();
    }

    if (cardType == "known") {
      knownQuestion.splice(currentCard.posInArray, 1);
      kindaKnownQuestion.push(currentCard);
      cardsDone++;
      generateQuestion();
    }
  }

  function KnownBtn(cardType) {
    if (cardType == "kinda") {
      let card = currentCard;
      kindaKnownQuestion.splice(card.posInArray, 1);
      knownQuestion.push(card);
      cardsDone++;
      generateQuestion();
    }

    if (cardType == "known") {
      cardsDone++;
      generateQuestion();
    }

    if (cardType == "unknown") {
      unknownQuestion.splice(currentCard.posInArray, 1);
      knownQuestion.push(currentCard);
      cardsDone++;
      generateQuestion();
    }

    if (totalCardsNumber == knownQuestion.length) {
      const modal = Modal.open({
        title: $_("finished"),
        content: $_("finishedModal"),
      });
      // Close programmatically
      setTimeout(modal.close, 2000);
    }

    console.log(knownQuestion.length);
  }

  async function getSet() {
    const docRef = doc(db, "users", params.userId);
    const colRef = doc(docRef, "sets", params.setId);
    const docSnap = await getDoc(colRef);
    if (docSnap.exists()) {
      let set = docSnap.data();
      let cards = set.Cards;

      allQuestion = cards;

      console.log("Document data:", docSnap.data());
      unknownQuestion = cards.filter((card) => card.cardType == "Unknown");
      kindaKnownQuestion = cards.filter((card) => card.cardType == "Kinda");
      knownQuestion = cards.filter((card) => card.cardType == "Known");

      totalCardsNumber =
        unknownQuestion.length +
        kindaKnownQuestion.length +
        knownQuestion.length;
    }
    generateQuestion();
  }

  function resetSet() {
    unknownQuestion = [
      ...unknownQuestion,
      ...kindaKnownQuestion,
      ...knownQuestion,
    ];
    kindaKnownQuestion = [];
    knownQuestion = [];
  }

  async function updateSet() {
    const docRef = doc(db, "userDocs", params.userId);
    const colRef = doc(docRef, "sets", params.setId);

    await updateDoc(colRef, {
      Cards: allQuestion,
    });
  }

  getSet();
</script>

<main>
  <div class="navigation">
    <!--Close btn -->
    <Button size="small" type="danger" on:click={goBack}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-x-circle"
        viewBox="0 0 16 16"
      >
        <path
          d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
        />
        <path
          d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
        />
      </svg>
    </Button>
    <Button size="small" on:click={resetSet}>{$_("reset")}</Button>
    <Button size="small" on:click={updateSet}>{$_("update")}</Button>
    <span class="right">{$_("cardsDone")} {cardsDone}</span>
  </div>

  {#if answerMode == false}
    <div>
      <h4 class="mainQn">{currentCard.front}</h4>
    </div>
    <div class="putAtBottom">
      <div class="buttonBottom">
        <Button on:click={() => (answerMode = true)} block
          >{$_("showAnswer")}</Button
        >
      </div>
    </div>
  {/if}

  {#if answerMode == true}
    <div>
      <h4 class="mainQn">{currentCard.back}</h4>
      <div class="putAtBottom">
        <Button on:click={() => unknownKnowBtn(currentCard.cardType)}
          >{$_("iDontKnowTheCard")}</Button
        >
        <Button on:click={() => kindaKnowBtn(currentCard.cardType)}
          >{$_("iKindOfKnowTheCard")}</Button
        >
        <Button on:click={() => KnownBtn(currentCard.cardType)}
          >{$_("iKnowTheCard")}</Button
        >
      </div>
    </div>
  {/if}
</main>

<style>
  main {
    height: 100vh;
    display: flex;
    flex-direction: column;
  }
  .mainQn {
    margin-top: 10%;
    text-align: center;
  }
  .putAtBottom {
    position: fixed;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10%;
  }
  .buttonBottom {
    width: 80%;
  }
</style>
