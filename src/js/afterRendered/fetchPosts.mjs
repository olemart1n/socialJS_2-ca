import { fetchCall, endpoints, fetchOptions } from "../api.mjs";
import { filterPictures } from "../searchAndFilter/filterPictures.mjs";
const { postswithac } = endpoints;
const { getWithJwt } = fetchOptions;
const postContainer = document.querySelector(".index-post-box");
export const fetchPosts = (endpoint, option) => {
  fetchCall(endpoint, option).then((data) => {
    filterPictures(data, postContainer);
  });
};
