import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { Box } from "@mui/system";
import {getFileSizeAndWidth} from "../services/helpers/CloudStorageService";
import {IMAGE_TOO_SMALL_ERR_LBL, MIN_HEIGHT, MIN_WIDTH} from "../constants/EventConstants";
import SweetAlert2 from "sweetalert2";

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

  const handleImageChange = (imageValue) => {
      getFileSizeAndWidth(imageValue).then(({ width, height }) => {
          if (width < MIN_WIDTH || height < MIN_HEIGHT) {
              SweetAlert2.fire({
                  title: IMAGE_TOO_SMALL_ERR_LBL,
                  icon: "error"
              }).then();

              return null;
          }

          setSelectedImage(imageValue);

          props.setSelectedImage(imageValue);
      });
  }

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
            style={styles.deleteBtn}>Quitar
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
        }

      </div>
    </div>
  );
};

export default UploadAndDisplayImage;
