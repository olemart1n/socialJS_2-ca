import { fetchCall, fetchOptions } from "../api.mjs";
const { react } = fetchOptions;
export const likeClick = () => {
  const likeButtons = document.querySelectorAll(".like-button");
  likeButtons.forEach((btn) => {
    btn.style.cursor = "pointer";
    btn.addEventListener(
      "click",
      (e) => {
        fetchCall(
          `posts/${e.currentTarget.dataset.postId}/react/❤️`,
          react
        ).then((data) => console.log(data));
        btn.nextElementSibling.textContent = `${
          Number.parseInt(
            btn.nextElementSibling.textContent.substring(1, 0),
            10
          ) + 1
        } likes`;
        btn.classList.remove("opacity-75");
      },
      { once: true }
    );
  });
};
