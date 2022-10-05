const logOutButton = document.querySelector("#logout-button");

export const logOutClick = (e) => {
  logOutButton.addEventListener("click", () => {
    localStorage.clear();
    document.location.replace("../index.html");
  });
};
