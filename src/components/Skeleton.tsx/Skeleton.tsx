import React from 'react';

type SkeletonProps = {
  width?: string;
  height?: string;
  borderRadius?: string;
  background? : string;
  className?: string;
};

const Skeleton: React.FC<SkeletonProps> = ({width, height, borderRadius, background, className} : SkeletonProps) => {
  return (
    <div
      className={`animate-pulse ${className}`}
      style={{ width, height, borderRadius, background }}
    ></div>
  );
};

export default Skeleton;