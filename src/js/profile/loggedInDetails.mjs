const loggedInAvatar = document.querySelector("#logged-in-avatar");
const loggedInName = document.querySelector("#logged-in-name");
const loggedInBanner = document.querySelector("#logged-in-banner");
const followingButton = document.querySelector("#following");
export const profileDetails = (data) => {
  loggedInName.textContent = data.name;
  if (data.banner.length === 0) {
    loggedInBanner.insertAdjacentHTML("afterbegin", `no more info`);
  } else {
    loggedInBanner.insertAdjacentHTML("afterbegin", data.banner);
  }
  loggedInAvatar.style.backgroundImage = `url(${data.avatar})`;
  if (data._count.following > 0) {
    followingButton.value = `People you follow ${data._count.following}`;
  }
};
