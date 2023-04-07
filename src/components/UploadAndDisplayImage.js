import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { Box } from "@mui/system";

const MIN_FILE_SIZE = 1024; // 1MB
const MAX_FILE_SIZE = 5120; // 5MB

function UploadFileBtn(props) {
  return (
    <IconButton
      color="primary"
      aria-label="upload picture"
      component="label"
      onChange={(event) => {
        props.setSelectedImage(event.target.files[0]);
      }}
    >
      <input hidden accept="image/*" type="file" />
      <PhotoCamera />
    </IconButton>
  );
}

const styles = {
  deleteBtn: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
};

const UploadAndDisplayImage = (props) => {
  const [selectedImage, setSelectedImage] = useState(null);
  let scala = props.scala;
  const handleImageChange = (imageFile) => {
    if (props.scala === undefined) {
      scala = 1;
    }
    console.log(imageFile.size / 1024);
    console.log(imageFile.size / 1024 / scala);
    console.log(imageFile.size / 1024 / scala);
    if (
      imageFile.size / 1024 / scala > MIN_FILE_SIZE &&
      imageFile.size / 1024 / scala < MAX_FILE_SIZE
    ) {
      setSelectedImage(imageFile);
      props.setSelectedImage(imageFile);
    } else {
      alert(
        `El archivo no posee el tamaño correcto (Minimo 1 MB, Maximo 5 MB)`
      );
    }
  };

  return (
    <div>
      <div>
        {selectedImage ? (
          <Box style={{ position: "relative" }}>
            <img
              alt="not found"
              width={props.size}
              height={props.height}
              style={{ borderRadius: 20 }}
              src={URL.createObjectURL(selectedImage)}
            />
            <button
              onClick={() => setSelectedImage(null)}
              style={styles.deleteBtn}
            >
              Remove
            </button>
          </Box>
        ) : (
          <Box
            style={{
              width: props.size,
              height: props.height,
              backgroundColor: "#D9D9D9",
              borderRadius: 20,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="label"
              onChange={(event) => {
                handleImageChange(event.target.files[0]);
              }}
            >
              <input hidden accept="image/*" type="file" />
              <PhotoCamera />
            </IconButton>
          </Box>
        )}
      </div>
    </div>
  );
};

export default UploadAndDisplayImage;
