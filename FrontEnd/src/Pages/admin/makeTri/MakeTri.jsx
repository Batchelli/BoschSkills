import React from "react";
import Navbar from "../../../components/navbar/Navbar";
import styles from "./MakeTri.module.css";

import CorpoTri from "../../../components/corpoTri/CorpoTri";
import CriarTri from "../../../components/criarTri/CriarTri";

import { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { storage } from "../../../firebase";

const MakeTri = () => {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const uploadFile = () => {
    if (imageUpload == null) return;

    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);

    uploadBytes(imageRef, imageUpload)
      .then((snapshot) => getDownloadURL(snapshot.ref))
      .then((url) => {
        // Set the latest image URL and clear the previous URLs
        setImageUrl(url);
        console.log(url)
      })
      .catch((error) => {
        console.log("Error uploading file: ", error);
      });


  };

  return (
    <div className={styles.container}>
      <Navbar />
      
      {/* <div>
        <input
          type="file"
          onChange={(event) => {
            setImageUpload(event.target.files[0]);
          }}
        />
      </div> */}
      <CriarTri/>
     
      {/* <button onClick={uploadFile}>Mandar imagem</button>
      {imageUrl && <img src={imageUrl} alt="Uploaded" />} */}
     
    </div>
  );
};

export default MakeTri;
