export const downloadPfp = async (
  uri: string | undefined,
  name = "pfp.png"
) => {
  if (!uri) return "";
  const imageName = !name.includes(".png") ? `${name}.png` : name;
  const response = await fetch(uri);
  const data = await response.blob();
  const imageUri = window.URL.createObjectURL(data);
  const link = document.createElement("a");
  link.href = imageUri;
  link.setAttribute("download", imageName);
  document.body.appendChild(link);
  link.click();
  return "";
};
