import Skeleton from "@components/Skeleton/Skeleton";
import { RootState } from "@store/index";
import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { UserProfileInfoDTO } from "types/Admin";

const UserProfileInfo = ({ username, introText }: UserProfileInfoDTO) => {
  const [isLoading, setIsLoding] = useState<boolean>(true);

  useEffect(() => {

    const delay = 500;
    const timeoutId = setTimeout(() => {
      setIsLoding(false);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [isLoading]);

  const { introduction } = useSelector(
    (state: RootState) => state.userProfile
  );

  return (
    <div className="w-full ">
      <div className="w-full text-center text-white text-[25px] font-bold font-['Noto Sans'] leading-[18px] mx-auto mt-[19px]">
        {isLoading ?
          <div className="flex items-center justify-center">
            <Skeleton width="120px" height="20px" background="#2E2E2E" />
          </div>
          :
          <React.Fragment>
            {username}
          </React.Fragment>
        }
      </div>
      <div className="text-center text-white text-[15px] font-medium font-['Noto Sans'] mx-auto leading-[18px] mt-[19px]">
        {isLoading ? (
          <div className="flex items-center justify-center">
            <Skeleton width="200px" height="20px" background="#2E2E2E" />
          </div>
        ) : (
          <React.Fragment>
            {introduction || introText}
          </React.Fragment>
        )}

      </div>
    </div>
  );
};

export default UserProfileInfo;
