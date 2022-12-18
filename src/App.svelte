<script>
  import Router from "svelte-spa-router";
  import { Navbar } from "spaper";
  import Home from "./routes/Home.svelte";
  import Learning from "./routes/Learning.svelte";
  import Set from "./routes/set.svelte";
  import NotFound from "./routes/NotFound.svelte";
  import { isAuthenticated } from "./lib/Auth.svelte";
  import Auth from "./lib/Auth.svelte";
  const routes = {
    // Exact path
    "/": Home,

    // Using named parameters, with last being optional
    "/learnSet/:userId/:setId": Learning,

    // Wildcard parameter
    "/Set/:userId/:setId": Set,

    // Catch-all
    // This is optional, but if present it must be the last
    "*": NotFound,
  };
</script>

<main>
  {#if $isAuthenticated}
    <Router {routes} />
  {/if}
  {#if !$isAuthenticated}
    <Auth />
  {/if}
</main>
