import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { Box } from "@mui/system";

function UploadFileBtn(props) {
  return (
    <IconButton
      color="primary"
      aria-label="upload picture"
      component="label"
      onChange={(event) => {
        console.log(event.target.files[0]);
        props.setSelectedImage(event.target.files[0]);
      }}
    >
      <input hidden accept="image/*" type="file" />
      <PhotoCamera />
    </IconButton>
  )
}

const styles = {
  deleteBtn: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  }
}


const UploadAndDisplayImage = (props) => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div>
      <div>
        {selectedImage ?
          <Box style={{position: 'relative'}}>
            <img
            alt="not found"
            width={props.size}
            height={props.height}
            style={{borderRadius: 20}}
            src={URL.createObjectURL(selectedImage)}
          /> 
            <button onClick={() => setSelectedImage(null)}
            style={styles.deleteBtn}>
              Remove
            </button>
          </Box>
        : 
        <Box style={
          {
            width: props.size, 
            height: props.height,
            backgroundColor: '#D9D9D9',
            borderRadius: 20,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }
          }>
          <UploadFileBtn setSelectedImage={setSelectedImage}/>
        </Box>
        }

      </div>
    </div>
  );
};

export default UploadAndDisplayImage;
