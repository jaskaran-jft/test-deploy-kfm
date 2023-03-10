import { useEffect, useState } from "react";
import { func, any } from "prop-types";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

function ImageCropper(props) {
  const { imageToCrop, onImageCropped, onImageUpdate } = props;
  const [file, setFile] = useState(undefined);

  const [cropConfig, setCropConfig] = useState(
    // default crop config
    {
      unit: "%",
      width: 50,
      height: 50,
      aspect: 4 / 1,
    }
  );

  const [imageRef, setImageRef] = useState();

  async function cropImage(crop) {
    if (imageRef && crop.width && crop.height) {
      const croppedImage = await getCroppedImage(
        imageRef,
        crop,
        "croppedImage.jpeg" // destination filename
      );
      // calling the props function to expose
      // croppedImage to the parent component
      onImageCropped(croppedImage);
    }
  }

  useEffect(() => {
    onImageUpdate(file);
  }, [file]);

  function getCroppedImage(sourceImage, cropConfig, fileName) {
    // creating the cropped image from the source image
    const canvas = document.createElement("canvas");
    const scaleX = sourceImage.naturalWidth / sourceImage.width;
    const scaleY = sourceImage.naturalHeight / sourceImage.height;
    canvas.width = cropConfig.width;
    canvas.height = cropConfig.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      sourceImage,
      cropConfig.x * scaleX,
      cropConfig.y * scaleY,
      cropConfig.width * scaleX,
      cropConfig.height * scaleY,
      0,
      0,
      cropConfig.width,
      cropConfig.height
    );
    var image = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    setFile(image);
    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        // returning an error
        if (!blob) {
          reject(new Error("Canvas is empty"));
          return;
        }
        blob.name = fileName;
        // creating a Object URL representing the Blob object given
        const croppedImageUrl = window.URL.createObjectURL(blob);
        resolve(croppedImageUrl);
      }, "image/jpeg");
    });
  }

  return (
    <div className="imageToCrop p-3">
      <ReactCrop
        style={{ maxWidth: "50%" }}
        src={imageToCrop}
        crop={cropConfig}
        ruleOfThirds
        onComplete={(cropConfig) => cropImage(cropConfig)}
        onChange={(cropConfig) => setCropConfig(cropConfig)}
        crossorigin="anonymous" // to avoid CORS-related problems
        locked
      >
        {imageToCrop ? (
          <img
            src={imageToCrop}
            onLoad={(e) => setImageRef(e.target)}
            alt="selectedImage"
          />
        ) : null}
      </ReactCrop>
    </div>
  );
}

ImageCropper.defaultProps = {
  onImageCropped: () => {},
};

ImageCropper.propTypes = {
  onImageCropped: func,
  onImageUpdate: func,
  imageToCrop: any,
};

export default ImageCropper;
