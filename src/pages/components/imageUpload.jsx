import React, { useRef, useState } from "react";
import {
  getStorage,
  ref as storageRefrence,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { useSelector } from "react-redux";
import { update, ref as databaseRefrence } from "firebase/database";
import { db } from "../../Firebaseconfig";

const ImageUpload = () => {
  const state = useSelector((state) => state?.userData);
  const [previewUrl, setPreviewUrl] = useState(state?.Profilepicture);
  const filePickerRef = useRef();

  const submitFunction = async () => {
    try {
      const storage = getStorage();
      if (previewUrl && state.uid) {
        const path = `profilePictures/${state.uid}`;
        const storageRef = storageRefrence(storage, path);
        const uploadPic = await uploadBytes(storageRef, previewUrl);
        if (uploadPic) {
          const getURL = await getDownloadURL(storageRefrence(storage, path));
          await update(databaseRefrence(db, `Accounts/${state.uid}`), {
            Profilepicture: getURL,
          });
        }
      }
    } catch (error) {
      console.error(error, "pic not saved");
    }
  };

  const pickedHandler = (e) => {
    const acceptTypes = ["jpg", "png", "jpeg"];
    let pickedfile;
    if (e.target.files) {
      pickedfile = e.target.files[0];
      console.log(pickedfile);
      let typCheck = acceptTypes.includes(pickedfile.type.split("/")[1]);
      typCheck ? setPreviewUrl(pickedfile) : alert("File type not supported");
    }
  };

  return (
    <div>
      <input
        style={{ display: "none" }}
        type="file"
        accept=".jpg,.png,.jpeg"
        ref={filePickerRef}
        onChange={(e) => pickedHandler(e)}
      />
      <div className="imageUploadPreview">
        {previewUrl ? (
          <img
            src={
              typeof previewUrl == "object"
                ? URL.createObjectURL(previewUrl)
                : previewUrl
            }
            alt="imageProfile"
            style={{
              height: "100%",
              width: "100%",
              objectFit: "cover",
              borderRadius: "360px",
            }}
          />
        ) : (
          "Add your Dp"
        )}
      </div>
      <div>
        <button type="button" onClick={() => filePickerRef.current.click()}>
          {!previewUrl ? "+" : "edit"}
        </button>
        {previewUrl && <button onClick={submitFunction}>Save</button>}
      </div>
    </div>
  );
};

export default ImageUpload;
