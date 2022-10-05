import { fetchCall, endpoints, fetchOptions } from "../api.mjs";
const { posts } = endpoints;
const { deletePost } = fetchOptions;
export const deleteOnClick = (buttons) => {
  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      button.value = "deleted";
      button.classList.remove("bg-warning");
      button.classList.add("bg-success");
      button.classList.add("p-0");
      fetchCall(posts + e.currentTarget.dataset.postId, deletePost)
        .then((data) => {
          console.log(data);
        })
        .finally(
          setTimeout(() => {
            window.location.replace("/profile");
          }, 1000)
        );
    });
  });
};
