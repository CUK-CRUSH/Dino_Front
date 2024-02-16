import React from 'react';

type SkeletonProps = {
  width?: string;
  height?: string;
  borderRadius?: string;
  background? : string;
  className?: string;
  marginLeft? : string;
  marginRight? : string;
  marginTop? : string;
  marginBottom? : string;
  display? : string;
};

const Skeleton: React.FC<SkeletonProps> = ({width, height, borderRadius, background, className, marginLeft, marginRight, marginBottom, marginTop, display} : SkeletonProps) => {
  return (
    <div
      className={`animate-pulse ${className}`}
      style={{ width, height, borderRadius, background, display,marginLeft,marginTop,marginRight,marginBottom }}
    ></div>
  );
};

export default Skeleton;