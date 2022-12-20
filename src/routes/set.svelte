<script>
  import { Navbar, Button } from "spaper";
  import { _ } from "svelte-i18n";

  export const perms = {};

  let nothingToStudy = true;
</script>

<main>
  <Navbar>
    <h3 slot="brand">
      <a href="#/">{$_("langCards")}</a>
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
  {perms}
</main>

<style>
  .center-text {
    text-align: center;
  }
</style>
