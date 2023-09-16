import React, { useState, useEffect } from "react";
import { apiUrl } from "@api/api";

const UnsplashImage: React.FC = () => {
  const [img, setImg] = useState<string>("");
  const [res, setRes] = useState<any[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>("");

  const Access_Key = process.env.REACT_APP_ACCESS_KEY;

  const url = `${apiUrl}?page=1&query=${img}&client_id=${Access_Key}&orientation=landscape&per_page=20`;

  const fetchRequest = async () => {
    try {
      const response = await fetch(url);
      const responseJson = await response.json();
      const result = responseJson.results;
      console.log(result);
      setRes(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setRes([]);
  };

  const submit = () => {
    fetchRequest();
    setImg("");
  };

  return (
    <div>
      <div>
        <div className="search">
          <input
            type="text"
            value={img}
            onChange={(e) => setImg(e.target.value)}
            placeholder="Searching Anything..."
          />
          <button type="submit" onClick={submit}>
            Search
          </button>
        </div>
        <div className="grid grid-cols-3">
          {res.map((val) => {
            return (
              <img
                key={val.id}
                src={val.urls.thumb}
                alt={val.alt_description}
                onClick={() => handleImageClick(val.urls.thumb)}
              />
            );
          })}
        </div>
      </div>

      {selectedImage && (
        <div>
          <img src={selectedImage} alt="Selected" />
        </div>
      )}
    </div>
  );
};

export default UnsplashImage;
