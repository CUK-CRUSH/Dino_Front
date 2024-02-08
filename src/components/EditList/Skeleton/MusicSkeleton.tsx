import { musicListState } from "@atoms/Musics/MusicList";
import Skeleton from "@components/Skeleton/Skeleton";
import { useRecoilValue } from "recoil";

interface SkeltonMusicsDTO {
  customMargin: number;
}

const SkeltonMusics = ({ customMargin }: SkeltonMusicsDTO) => {
  const muslicList = useRecoilValue(musicListState);
  const lenght_musicList = muslicList.data?.length;
  return (
    <div className="inline-block h-[150px] mt-[17px]  relative">
      {Array.from({ length: lenght_musicList }, (_, index) => (
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
            background="#2E2E2E"
          />
        </div>
      ))}
    </div>
  );
};

export default SkeltonMusics;
