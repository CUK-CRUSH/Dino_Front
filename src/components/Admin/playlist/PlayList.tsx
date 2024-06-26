import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPlaylistDTO } from "types/Admin";
import { useCustomPlaylistMargin } from "@hooks/useCustomMargin/useCustomPlaylistMargin";
import defaultImage from "@assets/PlayListImage/default.svg";

export const PlayList = ({
  playlist,
  fontColor,
  visible,
}: {
  playlist: getPlaylistDTO;
  fontColor?: string;
  visible?: boolean;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  useEffect(() => {
    const delay = 500;
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, []);

  const customMargin = useCustomPlaylistMargin();

  const handleOnClick = (
    username: string | undefined,
    id: number | undefined
  ) => {
    navigate(`/user/${username}/${id}`);
  };

  const playlistStyle = {
    marginLeft: `${customMargin}px`,
    marginRight: `${customMargin}px`,
  };

  return (
    <>
      {isLoading ? (
        <></>
      ) : (
        <div
          style={playlistStyle}
          className=" relative inline-block min-h-[200px] mt-[15px]"
          onClick={() => handleOnClick(playlist.username, playlist.id)}
        >
          <div className="w-[150px] h-[150px] rounded-[13px] font-light text-zinc-300 text-4xl cursor-pointer">
            {playlist.thumbnailUrl ? (
              <img
                className="mx-auto  w-[150px] h-full rounded-[13px]"
                src={playlist.thumbnailUrl}
                alt="x"
              />
            ) : (
              <img
                className="mx-auto w-[150px] bg-white h-full rounded-[13px]"
                src={defaultImage}
                alt="x"
              />
            )}
            <div className="w-full min-h-[50px] text-left text-zinc-300 font-medium absolute leading-6 whitespace-normal break-words">
              <span className={`text-[15px] text-[${fontColor}] align-top`}>
                {playlist.playlistName}
              </span>
              <span className={`text-[3px] text-[${fontColor}] align-top ml-1`}>
                ●
              </span>
              <span className={`text-[12px] text-[${fontColor}] align-top`}>
                {" "}
                {playlist.numberOfMusics}곡{" "}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
