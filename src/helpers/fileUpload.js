export const fileUpload = async (file) => {
  if (!file) throw new Error('No tenemos ningun archivo a subir');

  const cloudUrl = 'https://api.cloudinary.com/v1_1/dftk9b379/upload';

  const formData = new FormData();
  formData.append('upload_preset', 'react-app-journal');
  formData.append('file', file);

  try {
    const resp = await fetch(cloudUrl, {
      method: 'POST',
      body: formData
    });
    console.log('fetch resp', resp);
    if (!resp.ok) throw new Error('No se pudo subir imagen');

    const cloudResp = await resp.json();
    console.log(cloudResp.secure_url);
    return cloudResp.secure_url;
  } catch (err) {
    console.log('ERROR fetching', err);
    throw new Error(err.message);
  }
};
