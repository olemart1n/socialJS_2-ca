import { htmlToRender } from "./feed/html.mjs";
import { fetchCall, endpoints, fetchOptions } from "./api.mjs";
const { postswithac } = endpoints;
const { getWithJwt } = fetchOptions;
const postContainer = document.querySelector(".index-post-box");
const searchInput = document.querySelector("#search-input");
export const searchForPictures = () => {
  postContainer.textContent = "";
  fetchCall(postswithac, getWithJwt).then((data) => {
    const filteredPictures = data.filter((element) => {
      return element.media.substring(5, 0) === "https";
    });
    filteredPictures.forEach((element) => {
      htmlToRender(postContainer, element);
    });
    postContainer.insertAdjacentHTML(
      "afterbegin",
      "<p>Results " + filteredPictures.length + " posts with pictures</p>"
    );
    //   commentList();
    //   likeClick();
  });
};

export const searchForTags = () => {
  postContainer.innerHTML = "";
  fetchCall(postswithac, getWithJwt).then((data) => {
    const filtered = data.filter((data) => {
      return data.tags.length > 0;
    });
    filtered.forEach((element) => {
      htmlToRender(postContainer, element);
    });
    postContainer.insertAdjacentHTML(
      "afterbegin",
      `<p>${filtered.length} posts with tags</p>`
    );
    //   commentList();
    //   likeClick();
  });
};

export const searchForComments = () => {
  postContainer.innerHTML = "";
  fetchCall(postswithac, getWithJwt).then((data) => {
    const filtered = data.filter((data) => {
      return data.comments.length > 0;
    });
    filtered.forEach((element) => {
      htmlToRender(postContainer, element);
    });
    postContainer.insertAdjacentHTML(
      "afterbegin",
      `<p>${filtered.length} posts with comments</p>`
    );
    // commentList();
    // likeClick();
  });
};

export const searchForTitle = () => {
  postContainer.textContent = "";
  fetchCall(postswithac, getWithJwt).then((data) => {
    const filtered = data.filter((data) =>
      data.title.startsWith(searchInput.value)
    );
    filtered.forEach((element) => {
      htmlToRender(postContainer, element);
    });
    postContainer.insertAdjacentHTML(
      "afterbegin",
      `
          <p>Results (${filtered.length})</p>
          `
    );
    // commentList();
    // likeClick();
  });
};

export const searchForId = () => {
  postContainer.textContent = "";
  fetchCall(postswithac, getWithJwt).then((data) => {
    const filtered = data.find((id) => {
      return id.id === +searchInput.value;
    });
    filtered.forEach((element) => {
      htmlToRender(postContainer, element);
    });
    postContainer.insertAdjacentHTML(
      "afterbegin",
      `
            <p>Results (${filteredTitles.length})</p>
            `
    );
    // commentList();
    // likeClick();
  });
};
