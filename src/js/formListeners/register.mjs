import { endpoints, fetchOptions, fetchCall } from "../api.mjs";
import { loginRequest } from "./loginHandler.mjs";
const { registerLogin } = fetchOptions;
const { register } = endpoints;
const registerForm = document.querySelector("#register-form");
const errorMessage = document.querySelector("#password-mail-alert");
const succes = document.querySelector(".register-succes");

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const form = new FormData(e.currentTarget);
  const inputs = Object.fromEntries(form.entries());
  const { email, password, name } = inputs;
  registerLogin.body = JSON.stringify(inputs);
  fetchCall(register, registerLogin)
    .then((data) => {
      if (data.name === name) {
        console.log(data);
        succes.classList.remove("collapse");
        setTimeout(() => {
          loginRequest(email, password);
        }, 2000);
      } else if (data.error === "Bad Request") {
        errorMessage.classList.remove("collapse");
        errorMessage.textContent = data.message;
      }
    })
    .catch((error) => {
      console.log(error);
      errorMessage.textContent = error;
      errorMessage.classList.remove("collapse");
    });
});
