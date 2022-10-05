import { fetchCall, fetchOptions, endpoints } from "../api.mjs";
const { login } = endpoints;
const { registerLogin } = fetchOptions;
export const loginRequest = (email, password) => {
  const loginBody = JSON.stringify({ email: email, password: password });
  registerLogin.body = loginBody;
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
      } else {
        window.location.replace("/feed");
      }
    });
};
