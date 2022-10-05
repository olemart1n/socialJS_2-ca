const loginForm = document.querySelector("#login-form");
const errorMessage = document.querySelector("#password-mail-alert");
import { endpoints, fetchOptions, fetchCall } from "../api.mjs";
const { registerLogin } = fetchOptions;
const { login } = endpoints;

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const form = new FormData(e.currentTarget);
  const inputs = Object.fromEntries(form.entries());
  registerLogin.body = JSON.stringify(inputs);
  fetchCall(login, registerLogin)
    .then((data) => {
      const { accessToken, name } = data;
      localStorage.setItem("socialToken", accessToken);
      localStorage.setItem("socialName", name);
      console.log(data);
    })
    .finally(() => {
      if (
        localStorage.getItem("socialToken") === "undefined" ||
        localStorage.getItem("socialToken") === null
      ) {
        console.log("error email or password");
        errorMessage.classList.remove("collapse");
      } else {
        window.location.replace("/feed");
      }
    });
});
