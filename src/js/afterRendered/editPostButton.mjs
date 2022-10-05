import { fetchCall, endpoints, fetchOptions } from "../api.mjs";
const { posts } = endpoints;
const { getWithJwt } = fetchOptions;
const updateForm = document.querySelector("#update-form");
const updateTitle = document.querySelector("#update-title");
const updateTags = document.querySelector("#update-tags");
const updateBody = document.querySelector(".update-body");
const updateImage = document.querySelector("#update-image");

export const editButtonClick = (buttons) => {
  buttons.forEach((edit) => {
    edit.addEventListener("click", () => {
      fetchCall(posts + edit.dataset.postId, getWithJwt).then((data) => {
        updateTitle.value = data.title;
        updateTags.value = data.tags;
        updateBody.value = data.body;
        updateImage.value = data.media;
        updateForm.setAttribute("postId", edit.dataset.postId);
      });
    });
  });
};
