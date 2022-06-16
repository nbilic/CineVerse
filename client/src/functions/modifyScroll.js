export const enableScroll = () => {
  document.body.style.overflowY = "scroll";
  document.body.style.overflowX = "auto";
  document.body.style.paddingRight = "0px";
};

export const disableScroll = () => {
  document.body.style.overflowY = "hidden";
  document.body.style.overflowX = "hidden";
  document.body.style.paddingRight = "17px";
};
