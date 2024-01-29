import { useRef, useState } from "react";
import { Cropper, ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import { ImageCropsDTO } from "types/ImageCrop/imagecrops";
import ImageControlButton from "@components/EditList/Button/ImageControlButton";
import Swal from "sweetalert2";
import useImageCompress from "@hooks/useImageCompress";

const ImageCropper = ({ children, aspectRatio, onCrop }: ImageCropsDTO) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const cropperRef = useRef<ReactCropperElement>(null);
  const [image, setImage] = useState<null | string>(null);

  const handleChildrenClick = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.click();
    }
  };
  const { compressImage } = useImageCompress();
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const files = e.target.files;

    if (!files || files.length === 0) return;

    const file = files.item(0);
    if (!file) return;

    const fileType = file.type;

    if (fileType !== "image/jpeg" && fileType !== "image/png" && fileType !== 'image/webp') {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You can only upload jpg, png files!",
      });
      return;
    }
    if (file) {
      const compressedFile = await compressImage(file as File);
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      if (compressedFile) {
        reader.readAsDataURL(compressedFile);
      }
    }
  };

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      onCrop(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
      setImage(null);
    }
  };
  return (
    <>
      <input
        type="file"
        ref={inputRef}
        accept=".jpg, .jpeg, .png ,.webp"
        className="hidden"
        onChange={handleFileChange}
      />
      <span onClick={handleChildrenClick}>{children}</span>
      {image && (
        <div className="fixed z-50 top-0 left-0 w-full  flex items-center justify-center bg-black">
          <div className="relative text-black w-[390px] h-screen">
            <ImageControlButton
              onCancel={() => setImage(null)}
              onSave={getCropData}
            />
            <div className="flex object-cover items-center justify-center ">
              <div>
                <Cropper
                  ref={cropperRef}
                  aspectRatio={aspectRatio}
                  src={image}
                  viewMode={1}
                  width={300}
                  height={300}
                  background={false}
                  responsive
                  autoCropArea={1}
                  checkOrientation={false}
                  guides
                  className="bg-white overflow-hidden absolute w-[360px] h-[300px] border-2 border-white rounded-2xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 smartPhone:-translate-y-2/3 tablet:-translate-y-2/3"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageCropper;
