import React, { useState } from "react";

interface EditPlsyListProps {}

const EditPlsyList: React.FC<EditPlsyListProps> = ({}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 text-white">
      <div className="h-full w-full flex flex-col bg-black">
        <div className="h-1/3 rounded-b-3xl bg-white">
          <p>사진 데이터를 담은 img태그가 들어옴</p>
        </div>

        <div className="h-2/3">
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default EditPlsyList;
