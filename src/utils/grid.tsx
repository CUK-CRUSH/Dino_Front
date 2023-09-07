import React from "react";

interface GridComponentProps {
  inputValue: string;
  currentIndex: number;
}

const GridComponent: React.FC<GridComponentProps> = ({
  inputValue,
  currentIndex,
}) => {
  const gridItems = Array.from({ length: 9 }, (_, index) => ({
    id: index + 1,
    data: index === currentIndex ? inputValue : "", // Display inputValue only in the current index
  }));

  return (
    <div>
      <div className="grid grid-cols-3 grid-rows-3 gap-4 p-4 text-black">
        {gridItems.map((item) => (
          <div key={item.id} className="w-full h-24 bg-gray-200 rounded-lg">
            {item.data}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GridComponent;
