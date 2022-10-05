import { checkForAvatar } from "../helpers/checkForAvatar.js";
import { checkForTags } from "../helpers/checkForTags.js";
import { timeAgo } from "../helpers/checkTimeAgo.js";
import { checkForMedia } from "../helpers/checkForMedia.js";
import { deleteOnClick } from "../afterRendered/deletePostButton.mjs";
import { editButtonClick } from "../afterRendered/editPostButton.mjs";
export const loggedInPosts = (inputDiv, apiData) => {
  apiData.forEach(
    ({ author, created, title, tags, body, id, comments, _count, media }) => {
      inputDiv.insertAdjacentHTML(
        "beforeend",
        `<div class="d-flex flex-column flex-sm-row align-items-center text-muted mt-5 m-lg-5 pt-3 pb-3 border-top bg-primary">
            ${checkForAvatar(author)}
            <strong class="d-block text-gray-dark col">${author.name}</strong>
            <p class="text-muted col-sm-3 fs-6"style="font-size: 0.7em">${timeAgo(
              created
            )}</p>
          </div>
          <div class="m-2 post-elements m-lg-5">
            <h5 id="title">${title}</h5>
            <p> ${checkForTags(tags)}</p><br>
            <p>${body}</p>
            ${checkForMedia(media)}
          </div>
          <div class="d-flex m-lg-5">
          <small class="container-fluid text-end mx-auto">
          <a href="#" class="text-dark comment-button" data-comment-button="${id}">Comments &darr; (<span id="comment-counter${id}">${
          comments.length
        }</span>)</a>
          <input type="submit" value="delete" class="btn bg-warning p-1 ms-2 delete-button" data-post-id="${id}">
          <input type="button" value="edit" class="btn bg-primary p-1 ms-2 edit-button" data-post-id="${id}" data-bs-toggle="modal" data-bs-target="#exampleModal">
          </small>
        </div>
        <div class="m-2 collapse comment-section text-center" id="${id}">
        </div>
        `
      );
    }
  );
  const deleteButton = document.querySelectorAll(".delete-button");
  const editButton = document.querySelectorAll(".edit-button");
  deleteOnClick(deleteButton);
  editButtonClick(editButton);
};
