import App from './App.svelte'
import {addMessages, init} from "svelte-i18n"
import en from "./lib/locale/en.json"
import ar from "./lib/locale/ar.json"
import fr from "./lib/locale/fr.json"
import sv from "./lib/locale/sv.json"

addMessages("en", en)
addMessages("ar", ar)
addMessages("fr", fr)
addMessages("sv", sv)

init({
  initialLocale: "en",
  fallbackLocale: "en"
})

const app = new App({
  target: document.getElementById("app"),
})

export default app
