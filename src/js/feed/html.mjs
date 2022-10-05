import { checkForMedia } from "../helpers/checkForMedia.js";
import { checkForTags } from "../helpers/checkForTags.js";
import { checkForAvatar } from "../helpers/checkForAvatar.js";
import { timeAgo } from "../helpers/checkTimeAgo.js";

export const htmlToRender = (
  div,
  { author, created, title, tags, body, id, comments, _count, media }
) => {
  div.insertAdjacentHTML(
    "beforeend",
    `<div class="m-0 p-0">
          <div class="d-flex flex-column flex-sm-row align-items-center text-muted mb-5 mt-1 pt-3 pb-3 border-top bg-primary">
          ${checkForAvatar(author)}
          <strong class="d-block text-gray-dark col">${author.name}</strong>
          <p class="text-muted col-sm-3 fs-6"style="font-size: 0.7em">${timeAgo(
            created
          )}</p>
        </div>
        <div class="m-2 ">
          <h5>${title}</h5>
          <p> ${checkForTags(tags)}</p><br>
          <p>${body}</p>
          ${checkForMedia(media)}
        </div>
        <div class="d-flex">
        <button class="text-grey-ish btn p-2 flex-grow-1 comment-button" data-comment-button="${id}">Comments &darr; (<span id="comment-counter${id}">${
      comments.length
    }</span>)
      </button>
        <div>
        <p style="font-size:20px" class="p-0 m-0 opacity-75 like-button" data-post-id="${id}">🚜</p>
        <p style="font-size:15px" class="p-0 m-0 like-count">${
          _count.reactions
        } likes</p>
        </div>
        </div>
          </div>
          <!-- comment section. collapsed by default -->
          <div class="m-2 collapse comment-section text-center" id="${id}">
          </div>
        `
  );
};

export const renderHtml = (div, apiData) => {
  apiData.forEach((element) => {
    htmlToRender(div, element);
  });
};
