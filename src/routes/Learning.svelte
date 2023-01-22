<script>
  import { Button } from "spaper";
  import { number, _ } from "svelte-i18n";

  export const params = {};
  let unknownQuestion = [
    { front: "front", back: "back", cardType: "unknown" },
    { front: "front", back: "back", cardType: "unknown" },
  ];
  let kindaKnownQuestion = [];
  let knownQuestion = [];

  let currentCard = {
    front: "",
    back: "",
    posInArray: 0,
    cardType: "",
  };

  let cardsDone = 0;
  let answerType = "";

  let answerMode = false;

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

      return cardPosinArray;
      // returns the question
    }
  }
  /*
  function answered(answer, typeAnswered, positionInArray) {
    switch (answer) {
      case "unknown":
        switch (typeAnswered) {
          case "unknown":
            cardsDone++;
            generateQuestion();
            console.log(currentCard);
            break;
          case "kinda":
            delete unknownQuestion[positionInArray];
            kindaKnownQuestion = [...kindaKnownQuestion, currentCard];
            cardsDone++;
            generateQuestion();
            console.log(positionInArray);
            break;
          case "known":
            unknownQuestion.splice(positionInArray, 1);
            knownQuestion.push(currentCard);
            cardsDone++;
            generateQuestion();
            break;
          default:
            console.error(
              "How did we get here?, did you type something wrong!??"
            );
            console.error(
              "error: you wrote the wrong code block at the function 'answered' unknown block"
            );
        }
        break;
      case "kinda":
        switch (typeAnswered) {
          case "unknown":
            kindaKnownQuestion.splice(positionInArray, 1);
            unknownQuestion.push(currentCard);
            cardsDone++;
            generateQuestion();
            break;
          case "kinda":
            cardsDone++;
            generateQuestion();
            break;
          case "known":
            kindaKnownQuestion.splice(positionInArray, 1);
            knownQuestion.push(currentCard);
            cardsDone++;
            generateQuestion();
            break;
          default:
            console.error(
              "How did we get here?, did you type something wrong!??"
            );
            console.error(
              "error: you wrote the wrong code block at the function 'answered' unknown block"
            );
        }
        break;
      case "known":
        // code block
        break;
      default:
        console.error("How did we get here?, did you type something wrong");
        console.error(
          "error: you wrote the wrong code block, at answered somewhere"
        );
    }
  }
  */
  function unknownQuestionBtn(cardType) {
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
      unknownQuestion.splice(currentCard.posInArray, 1);
      knownQuestion.push(currentCard);
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
      unknownQuestion.splice(currentCard.posInArray, 1);
      knownQuestion.push(currentCard);
      cardsDone++;
      generateQuestion();
    }
  }

  generateQuestion();
</script>

<main>
  <div class="navigation">
    <Button size="small">
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
    <span class="right">cards done: {cardsDone}</span>
  </div>

  {#if answerMode == false}
    <div>
      <h4 class="mainQn">{currentCard.front}</h4>
    </div>
    <div class="putAtBottom">
      <div class="buttonBottom">
        <Button on:click={() => (answerMode = true)} block>Show answer</Button>
      </div>
    </div>
  {/if}

  {#if answerMode == true}
    <div>
      <h4 class="mainQn">{currentCard.back}</h4>
      <div class="putAtBottom">
        <Button on:click={() => generateQuestion()}>I don't know</Button>
        <Button on:click={() => kindaKnowBtn(currentCard.cardType)}
          >kind of know</Button
        >
        <Button on:click={() => generateQuestion()}>I know</Button>
      </div>
    </div>
  {/if}
  <Button
    on:click={() =>
      console.log({
        unknownQuestion,
        kindaKnownQuestion,
        knownQuestion,
        currentCard,
      })}
  />
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
