import React from "react";
import { TextDTO } from "types/SetProfile/setProfile";

const Text = ({ step }: TextDTO) => {
  const content = [
    "프로필 사진을 설정해보세요!",
    "배경 사진을 설정해보세요!",
    `나를 표현할 한 줄 소개를 <br/> 작성해보세요!`,
  ];

  return (
    <div className="absolute top-48 p-4 ">
      <p className="font-bold text-center" dangerouslySetInnerHTML={{ __html: content[step - 1] }} />

    </div>
  );
};

export default Text;