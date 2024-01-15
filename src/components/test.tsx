import React, { useState, useEffect } from "react";
import {
  postPlayList,
  getPlayList,
} from "@api/playlist-controller/playlistControl";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";

export const Test = () => {
  const { username } = useParams();
  const [cookies] = useCookies(["accessToken"]);
  const [inputValue, setInputValue] = useState("");
  const [playList, setPlayList] = useState(null);

  const handleClick = async () => {
    try {
      const response = await postPlayList(
        inputValue,
        undefined,
        cookies["accessToken"]
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const response = await getPlayList(username || "");
        setPlayList(response);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPlaylist();
  }, []);

  return (
    <div>
      <>
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter playlist name"
        />
        <button className="bg-white w-10 h-10" onClick={handleClick}>
          Test
        </button>
        {playList && <div>{/* 플레이리스트를 여기에 렌더링하세요 */}</div>}
      </>
    </div>
  );
};
