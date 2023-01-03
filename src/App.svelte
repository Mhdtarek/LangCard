<script>
  import { isAuthenticated } from "./lib/Auth.svelte";
  import Router from "svelte-spa-router";
  import { Navbar } from "spaper";
  import Home from "./routes/Home.svelte";
  import Learning from "./routes/Learning.svelte";
  import Set from "./routes/set.svelte";
  import NotFound from "./routes/NotFound.svelte";
  import Auth from "./lib/Auth.svelte";
  import createCards from "./routes/createCards.svelte";
  import { _ } from "svelte-i18n";
  const routes = {
    // Exact path
    "/": Home,

    // Using named parameters, with last being optional
    "/learnSet/:userId/:setId": Learning,

    // Wildcard parameter
    "/Set/:userId/:setId": Set,

    "/createCards/:userId/:setId": createCards,
    // Catch-all
    // This is optional, but if present it must be the last
    "*": NotFound,
  };
</script>

<main>
  {#if $isAuthenticated}
    <div dir={$_("dir")}>
      <Router {routes} />
    </div>
  {/if}
  {#if !$isAuthenticated}
    <Auth />
  {/if}
</main>
