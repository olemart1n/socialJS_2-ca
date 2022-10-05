export const checkForMedia = (data) => {
  if (data.substring(5, 0) !== "https") {
    return "";
  }
  return `<img src="${data}" class="index-post-img rounded" >` ?? "";
};
