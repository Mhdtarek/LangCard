<script>
  import { Button } from "spaper";
  import { _ } from "svelte-i18n";

  export const params = {};
  let unknownQuestion = [{ front: "front", back: "back" }];
  let kindaKnownQuestion = [];
  let knownQuestion = [];
  let question = "No Card found!!";
  let answer = "No Card found!!";
  let cardsDone = 0;
  let answerType = "";

  let answerMode = false;

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
  }

  function generateQuestion() {
    // checks if there is any question that is unknown
    if (unknownQuestion.length != 0) {
      // let question = ""

      let qFrom = 0;
      let qTo = unknownQuestion.length - 1;

      question = unknownQuestion[getRandomInt(qFrom, qTo)].front;
      answer = unknownQuestion[getRandomInt(qFrom, qTo)].back;

      return;
      // return question
    }
  }

  function answered(answer, typeAnswered, positionInArray) {
    switch (answer) {
      case "unknown":
        switch (typeAnswered) {
          case "unknown":
            break;
          case "kinda":
            // code block
            break;
          case "known":
            // code block
            break;
          default:
            console.error("How did we get here?, did you type something wrong");
            console.error("error: you wrote the wrong code block");
        }
        break;
      case "kinda":
        // code block
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
      <h4 class="mainQn">{question}</h4>
    </div>
    <div class="putAtBottom">
      <div class="buttonBottom">
        <Button on:click={() => (answerMode = true)} block>Show answer</Button>
      </div>
    </div>
  {/if}

  {#if answerMode == true}
    <div>
      <h4 class="mainQn">{answer}</h4>
      <div
        class="putAtBottom🎶 adabooodo
      "
      >
        <Button>I don't know</Button>
        <Button>kind of know</Button>
        <Button>I know</Button>
        <Button>skip</Button>
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
