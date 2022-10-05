import { fetchCall, endpoints, fetchOptions } from "../api.mjs";
import { commentList } from "../afterRendered/comments.mjs";
import { likeClick } from "../afterRendered/likeClick.mjs";
import { renderHtml } from "../feed/html.mjs";
const { posts, postswithac } = endpoints;
const { entry, getWithJwt } = fetchOptions;
const formEntry = document.querySelector("#entry-form");
const postContainer = document.querySelector(".index-post-box");

export const sharePost = () => {
  formEntry.addEventListener("submit", (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const inputs = Object.fromEntries(form.entries());
    const { title, tags, body, media } = inputs;
    const tagArray = tags.split(",");
    if (media.length === 0) {
      entry.body = JSON.stringify({
        title,
        tags,
        body,
      });
    } else {
      entry.body = JSON.stringify({
        title,
        tagArray,
        body,
        media,
      });
    }
    fetchCall(posts, entry).then((data) => {
      console.log(data);
      setTimeout(() => {
        formEntry.reset();
        postContainer.innerHTML = "";
        fetchCall(postswithac, getWithJwt).then((data) => {
          renderHtml(postContainer, data);
          commentList();
          likeClick();
        });
      }, 1500);
    });
  });
};
