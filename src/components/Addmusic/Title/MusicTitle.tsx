import React from "react";

interface AddMusicTitleDTO {
  title: string;
}

const MusicTitle: React.FC<AddMusicTitleDTO> = ({ title }) => {
  return (
    <div className="text-center pt-14 pb-10">
      <h2 className="text-[27px] font-bold mb-4">{title}</h2>
    </div>
  );
};

export default MusicTitle;
