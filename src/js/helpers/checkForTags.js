export const checkForTags = (data) => {
  if (data.length === 0) {
    return "<i>0 tags</i>";
  }
  return "tags:" + " " + data.join(", ");
};
