import { fetchCall, endpoints, fetchOptions } from "../api.mjs";
import { searchForId, searchForTitle } from "../filters.mjs";
import { logOutClick } from "../helpers/logout.js";
import { profileButtons } from "../helpers/profilePageBtns.js";
import { profileDetails } from "./loggedInDetails.mjs";
import { loggedInPosts } from "./renderPosts.mjs";
import { updatePost } from "../formListeners/updateform.mjs";
import { commentList } from "../afterRendered/comments.mjs";
const { postswithac, loggedInUser } = endpoints;
const { getWithJwt } = fetchOptions;
const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const wallButton = document.querySelector("#wall");
const followingButton = document.querySelector("#following");
const posts = document.querySelector("#posts");
const followingList = document.querySelector("#contacts");

logOutClick();
profileButtons(followingButton, posts, followingList);
profileButtons(wallButton, followingList, posts);
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (/\d/.test(searchInput.value)) {
    searchForId();
  } else {
    searchForTitle();
  }
});

fetchCall(loggedInUser, getWithJwt).then((data) => {
  profileDetails(data);
});

fetchCall(postswithac, getWithJwt).then((data) => {
  const checkForPosts = data.filter((data) => {
    return data.author.name === localStorage.getItem("socialName");
  });
  if (checkForPosts.length === 0) {
    const noPosts = document.querySelector("#no-posts-yet");
    noPosts.classList.remove("collapse");
  }
  loggedInPosts(posts, checkForPosts);
  commentList();
});

updatePost();
