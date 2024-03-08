import Skeleton from "@components/Skeleton/Skeleton";

interface SkeletonLikesDTO {
  customMargin: number;
}

const SkeletonLikes = ({ customMargin }: SkeletonLikesDTO) => {
  return (
    <div className="inline-block h-[150px] mt-[17px]  relative">
      {Array.from({ length: 9 }, (_, index) => (
        <div
          style={{
            marginLeft: `${customMargin}px`,
            marginRight: `${customMargin}px`,
          }}
          className={"inline-block "}
          key={index}
        >
          <Skeleton
            width="350px"
            height="50px"
            borderRadius="15px"
            marginBottom="5px"
            background="#f1ecec"
          />
        </div>
      ))}
    </div>
  );
};

export default SkeletonLikes;
