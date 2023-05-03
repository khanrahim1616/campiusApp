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
import LocalSeeIcon from "@mui/icons-material/LocalSee";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import profilePic from "../../Assets/profile.png";
import "./imageUpload.css";
import Input from "../Input";
import SuccessAlert from "../SuccessAlert";
import ErrorAlert from "../ErrorAlert";

const ImageUpload = () => {
  const [alert, setAlert] = useState(false);
  const state = useSelector((state) => state?.userData);
  const [previewUrl, setPreviewUrl] = useState(
    state?.profilePicture || profilePic
  );
  const [temp, setTemp] = useState(false);
  const filePickerRef = useRef();

  const savePic = async () => {
    try {
      const storage = getStorage();
      if (previewUrl && state?.uid) {
        setTemp(false);
        const path = `profilePictures/${state?.uid}`;
        const storageRef = storageRefrence(storage, path);
        const uploadPic = await uploadBytes(storageRef, previewUrl);
        if (uploadPic) {
          const getURL = await getDownloadURL(storageRefrence(storage, path));
          await update(databaseRefrence(db, `Accounts/${state?.uid}`), {
            profilePicture: getURL,
          })
            .then(() => {
              setAlert({ isSuccess: true, msg: "Profile saved successfully" });
            })
            .catch(() => {
              setAlert({ isNotSuccess: true, msg: "something went wrong" });
            });
        }
      }
      setTemp(false);
    } catch (error) {
      setAlert({ isNotSuccess: true, msg: "pic not saved" });
    }
  };

  const cancel = () => {
    setPreviewUrl(state?.profilePicture || profilePic);
    setTemp(false);
  };

  const pickedHandler = (e) => {
    const acceptTypes = ["jpg", "png", "jpeg"];
    let pickedfile = e?.target?.files[0];
    if (pickedfile) {
      let typCheck = acceptTypes?.includes(pickedfile?.type?.split("/")[1]);
      if (typCheck) {
        setPreviewUrl(pickedfile);
        setTemp(pickedfile);
      } else {
        setAlert({ isNotSuccess: true, msg: "File type not supported" });
      }
    }
    if (filePickerRef?.current?.value) {
      filePickerRef.current.value = null;
    }
  };

  return (
    <div>
      <Input
        style={{ display: "none" }}
        type="file"
        accept=".jpg,.png,.jpeg"
        ref={filePickerRef}
        onChange={(e) => pickedHandler(e)}
      />
      <div className="imageUploadPreview">
        {previewUrl && (
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
        )}
        {!temp ? (
          <LocalSeeIcon
            className="addBtnDiv"
            onClick={() => filePickerRef?.current?.click()}
          />
        ) : (
          <div className="save-cancel-BtnDiv">
            <CheckIcon className="saveBtn opacity" onClick={savePic} />
            <ClearIcon className="opacity" onClick={cancel} />
          </div>
        )}
        {!!alert?.isSuccess && (
          <SuccessAlert
            message={alert?.msg}
            open={!!alert?.isSuccess}
            onClose={() => {
              setAlert(false);
            }}
          />
        )}
        {!!alert?.isNotSuccess && (
          <ErrorAlert
            message={alert?.msg}
            open={!!alert?.isNotSuccess}
            onClose={() => {
              setAlert(false);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
