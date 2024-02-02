import Skeleton from "@components/Skeleton/Skeleton"

interface SkeltonPlaylistDTO {
  customMargin : number;
}

const SkeltonPlaylist = ({customMargin} : SkeltonPlaylistDTO) => {
  return (
    <div className="inline-block h-[150px] mt-[42px] relative">

    {
      Array.from({ length: 4 }, (_, index) => (
        <div style={{ marginLeft: `${customMargin}px`, marginRight: `${customMargin}px` }} className={"inline-block"} key={index}>
          <Skeleton width="150px" height="150px" background="#2E2E2E" />
          <Skeleton width="100px" height="15px" marginTop="5px" marginRight="5px" display="inline-block" background="#2E2E2E" />
          <Skeleton width="45px" height="15px" marginTop="5px" display="inline-block" background="#2E2E2E" /> 
        </div>
      ))
    }
    </div>
  )
}

export default SkeltonPlaylist