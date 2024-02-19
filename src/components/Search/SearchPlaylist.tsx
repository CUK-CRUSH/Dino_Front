
import React from "react";
import { Playlist } from "types/Search/Search";

interface SearchPlaylistProps {
  searchResults: Playlist[] | undefined;
}

const SearchPlaylist: React.FC<SearchPlaylistProps> = ({ searchResults }) => {
  return (
    <div>
      <ul>
        {searchResults && searchResults.map((playlist) => (
          <li key={playlist.id}>
            <p>이름: {playlist.name}</p>
            {playlist.thumbnailUrl && (
              <img src={playlist.thumbnailUrl} alt="" />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchPlaylist;