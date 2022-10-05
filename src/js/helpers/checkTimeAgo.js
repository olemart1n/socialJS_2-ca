export const timeAgo = (data) => {
  const posted = data.substring(10, 0);
  const atLogin = new Date().toJSON().slice(0, 10);
  if (posted === atLogin) {
    return "Posted today";
  } else if (atLogin.substring(10, 8) - posted.substring(10, 8) === 1) {
    return "Posted yesterday";
  } else {
    return posted;
  }
};
