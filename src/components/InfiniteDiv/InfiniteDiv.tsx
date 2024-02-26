import React from "react";

interface RefInterface {
  view: (node?: Element | null | undefined) => void;
}

const InfiniteDiv: React.FC<RefInterface> = ({ view }) => {
  return (
    <React.Fragment>
      <div className="bg-transparent h-1" ref={view} />
    </React.Fragment>
  );
};