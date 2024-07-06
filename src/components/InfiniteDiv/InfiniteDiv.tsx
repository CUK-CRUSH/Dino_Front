import React from "react";

interface RefInterface {
  view: (node?: Element | null | undefined) => void;
}

const InfiniteDiv: React.FC<RefInterface> = ({ view }) => {
  return (
    <React.Fragment>
      
      <div className="" ref={view} ></div>
    </React.Fragment>
  );
};

export default InfiniteDiv;
