import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

exports.imageToData = functions.storage.object().onFinalize((object) => {
  const bucketName = process.env.bucketName || '';
  const filePath = object.name || '';
  const db = admin.firestore();
  const fileUrlComponent = encodeURIComponent(filePath);

  db.collection('images').add({
    filePath,
    downloadUrl: `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${fileUrlComponent}?alt=media`,
  }).then(() => console.log('Done')).catch(err => console.log(err));
});
