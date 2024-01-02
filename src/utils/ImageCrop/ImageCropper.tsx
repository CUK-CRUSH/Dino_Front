import { useRef, useState } from "react";
import { Cropper, ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import { ImageCropsDTO } from "types/ImageCrop/imagecrops";

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const files = e.target.files;

    if (!files || files.length === 0) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(files[0]);
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
        className="hidden"
        onChange={handleFileChange}
      />
      <span onClick={handleChildrenClick}>{children}</span>
      {image && (
        <div className="fixed z-50 top-0 left-0 w-full h-screen flex items-center justify-center bg-[rgba(0,0,0,0)] backdrop-blur-md">
          <div className="relative text-black w-[390px] h-[800px]">
            <div className="z-50 bg-[#ffffff] overflow-hidden flex flex-col max-w-[desired value] mx-auto"></div>
            <h3 className="text-[22px] text-white leading-5 px-[20px] py-[16px] m-0 font-semibold">
              이미지 편집하기
            </h3>
            <div className="flex-1 flex items-center justify-center bg-[#ffffff]">
              <div className="rounded-b-3xl object-cover">
                <Cropper
                  ref={cropperRef}
                  aspectRatio={aspectRatio}
                  src={image}
                  viewMode={1}
                  width={500}
                  height={300}
                  background={false}
                  responsive
                  autoCropArea={1}
                  checkOrientation={false}
                  guides
                />
              </div>
            </div>
            <div className="flex justify-end items-center px-[20px] py-[16px] bg-white gap-3">
              <button
                className="bg-white border-[1px] border-black p-2 rounded-xl"
                onClick={() => setImage(null)}
              >
                취소
              </button>
              <button
                className="bg-[#7b73df] border-[1px] border-black p-2 rounded-xl"
                onClick={getCropData}
              >
                적용하기
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageCropper;
