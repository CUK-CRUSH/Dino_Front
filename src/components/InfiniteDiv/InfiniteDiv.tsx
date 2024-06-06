import React from "react";

interface RefInterface {
  view: (node?: Element | null | undefined) => void;
}

const InfiniteDiv: React.FC<RefInterface> = ({ view }) => {
  return (
    <React.Fragment>
      
      <div className="bg-yellow h-1" ref={view} >무한스크롤</div>
    </React.Fragment>
  );
};

export default InfiniteDiv;
