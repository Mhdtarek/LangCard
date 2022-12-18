<script context="module">
  import { writable } from "svelte/store";

  export let isAuthenticated = writable(false);

  export let userId = writable("");
  export let userEmail = writable("");
  export let userName = writable("");
  export let userPhoto = writable("");
  export let userLanguage = writable("");
</script>

<script>
  isAuthenticated.set(false);
  import { Button, Select, Alert } from "spaper";
  import { firebaseConfig } from "../lib/firebaseConfig.svelte";
  import { initializeApp, getApps, getApp } from "firebase/app";
  import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
  import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
  import { locale } from "svelte-i18n";

  let hasSignedUp = false;
  let Language = "";
  let error = false;
  let errorTxt = "";

  const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  const provider = new GoogleAuthProvider();
  const auth = getAuth(app);
  const db = getFirestore(app);

  // sign up section
  async function signUp() {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        const user = result.user;

        userId.set(user.uid);
        userName.set(user.displayName);
        userPhoto.set(user.photoURL);
        userEmail.set(user.email);

        hasSignedUp = true;
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        console.error(errorCode, errorMessage, credential);
      });
  }

  async function addAccount() {
    let docRef = await setDoc(doc(db, "users", $userId), {
      userName: $userName,
      userId: $userId,
      userPhoto: $userPhoto,
      userEmail: $userEmail,
      userLanguage: Language,
    });

    userLanguage.set(Language);
    locale.set(Language);

    isAuthenticated.set(true);
  }

  // login section
  async function logIn() {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        const user = result.user;

        userId.set(user.uid);
        userName.set(user.displayName);
        userPhoto.set(user.photoURL);
        userEmail.set(user.email);

        console.log(user);
        getAccount();
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        console.error(errorCode, errorMessage, credential);
      });
  }
  async function getAccount() {
    const docRef = await getDoc(doc(db, "users", $userId));
    if (docRef.exists()) {
      userLanguage.set(docRef.data().userLanguage);
      locale.set(docRef.data().userLanguage);

      $isAuthenticated = true;
    } else {
      error = true;
      errorTxt = "User not found! Sign up First!";
    }
  }
</script>

<main>
  {#if error}
    <Alert type="warning" dismissible>{errorTxt}</Alert>
  {/if}
  {#if !hasSignedUp}
    <div class="center">
      <div>
        <Button on:click={logIn}>Login</Button>
        <Button on:click={signUp}>Sign up</Button>
      </div>
    </div>
  {/if}
  {#if hasSignedUp}
    <div class="center">
      <div>
        <Select label="Language" bind:value={Language}>
          <option value="fr">Français</option>
          <option value="ar">عربي</option>
          <option value="sv">Svenska</option>
          <option value="en">English</option>
        </Select>
        <div style="margin-top: 10px;">
          <Button on:click={addAccount}>Sign up</Button>
        </div>
      </div>
    </div>
  {/if}
</main>

<style>
  .center {
    height: 100vh;
    display: grid;
    place-items: center;
  }
</style>
