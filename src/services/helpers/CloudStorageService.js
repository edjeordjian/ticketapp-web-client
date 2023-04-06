import {firebaseStorage} from './FirebaseService';

import {getDownloadURL, ref, uploadBytes} from 'firebase/storage';

const uploadFile = async (file, name) => {
  const fileRef = ref(firebaseStorage, name);

  return uploadBytes(fileRef, file)
    .then(async () => {
      const url = await getDownloadURL(fileRef);
      console.log(`Uploaded to firebase: ${url}`);
      return url;
    });
}

export {
    uploadFile
};
