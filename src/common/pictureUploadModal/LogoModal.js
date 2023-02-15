import { Button, Modal, ModalHeader } from "reactstrap";
import { useState } from "react";
import ImageCropper from "./ImageCropper";
// import UploadIcon from "@mui/icons-material/Upload";
import { func, string, bool } from "prop-types";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  height: "auto",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function LogoModal(props) {
  const { saveCroppedLogo } = props;
  const [open, setOpen] = useState(false);

  const [updatedImage, setUpdatedImage] = useState(undefined);
  const [imageToCrop, setImageToCrop] = useState(undefined);
  const [croppedImage, setCroppedImage] = useState(undefined);

  // useEffect(() => {
  //   saveCroppedLogo(updatedImage);
  // }, [updatedImage]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleExit = () => {
    setOpen(false);
    setUpdatedImage(undefined);
    setImageToCrop(undefined);
    setCroppedImage(undefined);
  };

  const handleClose = () => {
    setOpen(false);
    saveCroppedLogo(updatedImage);
    setUpdatedImage(undefined);
    setImageToCrop(undefined);
    setCroppedImage(undefined);
  };

  const onUploadFile = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();

      reader.addEventListener("load", () => {
        const image = reader.result;

        setImageToCrop(image);
      });
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  return (
    <div>
      <div className="col-md-12 d-flex">
        <Button
          className="font-weight-bold d-flex"
          style={{ cursor: "pointer" }}
          onClick={handleOpen}
          disabled={props.disabled}
        >
          {/* <UploadIcon color="primary" /> */}
          {props.title ? props.title : "Upload logo"}
        </Button>
        {props.logo ? (
          <div className="ml-3">
            <img
              src={props.logo}
              style={{ width: "40px", height: "40px" }}
              alt=""
            />
          </div>
        ) : null}
      </div>
      <Modal
        isOpen={open}
        toggle={handleExit}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <ModalHeader toggle={handleExit}>
          {props.title ? props.title : "Upload logo"}
        </ModalHeader>
        <div className="logoCropWrapper">
          <div>
            <div className="app">
              <div className="d-flex justify-content-center mt-4 p-4">
                <input type="file" accept="image/*" onChange={onUploadFile} />
              </div>
              <div>
                <ImageCropper
                  imageToCrop={imageToCrop}
                  onImageCropped={(croppedImage) =>
                    setCroppedImage(croppedImage)
                  }
                  onImageUpdate={(updatedImage) =>
                    setUpdatedImage(updatedImage)
                  }
                />
              </div>
              {croppedImage && (
                <div className="croppedImageWrapper d-flex justify-content-center flex-column">
                  <h2 className="d-flex justify-content-center">
                    Cropped Image
                  </h2>
                  <img className="p-3" alt="Cropped Img" src={croppedImage} />
                </div>
              )}
            </div>
          </div>
          <div className="logoSubmitButton">
            {croppedImage ? (
              <Button className="w-100 mt-3" onClick={handleClose}>
                Submit
              </Button>
            ) : (
              false
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
}

LogoModal.propTypes = {
  saveCroppedLogo: func,
  logo: string,
  disabled: bool,
  title: string,
};
