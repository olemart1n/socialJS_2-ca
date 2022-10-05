export const profileButtons = (btn, wall, follows) => {
  btn.addEventListener("click", () => {
    if (follows.classList.contains("collapse")) {
      follows.classList.remove("collapse");
      wall.classList.add("collapse");
    }
  });
};
