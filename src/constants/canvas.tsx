const bannerHeight = () => {
  if (window.innerWidth > 1280) {
    return 66;
  }
  return 35;
};

export const canvasHeight = window.innerHeight - bannerHeight();
export const canvasWidth = window.innerWidth;
