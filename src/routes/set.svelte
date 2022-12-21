<script>
  import { Navbar, Button, Card } from "spaper";
  import { _ } from "svelte-i18n";

  export const perms = {};

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
    <div class="padding border border-3">
      <div class="padding border-down">test</div>
      <div class="padding">test</div>
    </div>
    <div class="padding border border-3">
      <div class="padding border-down">test</div>
      <div class="padding">test</div>
    </div>
    <div class="padding border border-3">
      <div class="padding border-down">test</div>
      <div class="padding">test</div>
    </div>
  </div>

  {perms}
</main>

<style>
  .center-text {
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
