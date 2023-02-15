import Cropper from "react-easy-crop";
import { useState } from "react";
import { Button, Modal } from "reactstrap";
import getCroppedImg from "./utils/cropImage";

const CropEasy = ({ imgUpload, openModal, setOpenModal, setImgUpload }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);

  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const cropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const dogImg =
    "https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=1910_1000";

  const cropImage = async () => {
    try {
      const response = await getCroppedImg(
        imgUpload,
        croppedAreaPixels,
        rotation
      );

      setImgUpload(response);

      setOpenModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal isOpen={openModal} toggle={setOpenModal}>
        <div
          style={{
            position: "relative",
            width: "100%",
            height: 400,
            background: "#333",
          }}
        >
          <Cropper
            image={imgUpload}
            crop={crop}
            zoom={zoom}
            rotation={rotation}
            aspect={55 / 15}
            onZoomChange={setZoom}
            onRotationChange={setRotation}
            onCropChange={setCrop}
            onCropComplete={cropComplete}
          />
        </div>
        <div className="d-flex">
          <Button
            className="w-100 m-1"
            onClick={() => {
              setOpenModal(false);
              setImgUpload("");
            }}
          >
            Cancel
          </Button>
          <Button className="w-100 m-1" onClick={cropImage}>
            Crop
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default CropEasy;
