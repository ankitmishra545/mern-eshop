const cloudanryAPI = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDANARY_KEY}/image/upload`;

const uploadImage = async (imageFile) => {
  const formData = new FormData();

  formData.append("file", imageFile);
  formData.append("upload_preset", "mern_eshop");

  const jsonResponse = await fetch(cloudanryAPI, {
    method: "POST",
    body: formData,
  });

  const data = await jsonResponse.json();

  return data;
};

export default uploadImage;
