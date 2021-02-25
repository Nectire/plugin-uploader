import firebase  from 'firebase/app'
import 'firebase/storage'
import   {upload} from './upload.js'

var firebaseConfig = {
   apiKey: "AIzaSyAeBRl5xgE38y73PVccmbhNPyGdBj-GRik",
   authDomain: "fe-upload-6c2f9.firebaseapp.com",
   projectId: "fe-upload-6c2f9",
   storageBucket: "fe-upload-6c2f9.appspot.com",
   messagingSenderId: "1032354531852",
   appId: "1:1032354531852:web:b9143101c45a27cce23c29"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage()

upload('#file', {
   multi: true,
   accept: ['.png', '.jpg', '.jpeg', '.gif'],
   onUpload(files, blocks){
      files.forEach((file, index) => {
        const ref = storage.ref(`images/${file.name}`)
        const task = ref.put(file)

        task.on('state_changed', snapshot => {
           const percentage = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0) + '%';
           const block = blocks[index].querySelector('.preview-info-progress');
           block.textContent = percentage;
           block.style.width = percentage ;
        }, error =>{

        }, () => {
           task.snapshot.ref.getDownloadURL().then(url => {
              console.log('download URL', url);
           })
           console.log('Complete');
        })
         
      });
      console.log('Files:', files);
   }
});