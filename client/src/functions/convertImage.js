export const toDataURL = (img, setFile) => {
  const reader = new FileReader();
  reader.onloadend = () => {
    setFile(reader.result);
  };
  reader.readAsDataURL(img);
};
