import { useEffect } from 'react';
import { UpdateMemberParams } from 'types/AdminEdit';

interface useMemberDataUpdateDTO {
    setUpdateMemberData : React.Dispatch<React.SetStateAction<UpdateMemberParams>>;
    deleteProfileImage : boolean;
    deleteBackgroundImage : boolean;
}

export const useMemberDataUpdate = ({setUpdateMemberData, deleteProfileImage, deleteBackgroundImage} : useMemberDataUpdateDTO) => {
  useEffect(() => {

    const setMemberData = (deleteImage : boolean, type1: string, type2 : string) => {
      setUpdateMemberData((prevData : any) => ({
        ...prevData,
        [`delete${type1}`]: deleteImage,
        [type2]: deleteImage ? null : prevData[type2],
      }));
    };

    setMemberData(deleteProfileImage, 'ProfileImage','profileImage');
    setMemberData(deleteBackgroundImage, 'BackgroundImage','backgroundImage');

  }, [setUpdateMemberData, deleteProfileImage, deleteBackgroundImage]);
};