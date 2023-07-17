 export const uploadCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file",file)
    formData.append("upload_preset", "o9mmsygk");
 }