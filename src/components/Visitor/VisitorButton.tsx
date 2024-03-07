import ChatIcon from "@assets/Visitor/Chat.svg";
import "@styles/EditList/playList.css";
import { useEffect, useState } from "react";
import { getVisitor } from "@api/visitor-controller/visitorControl";
import { useParams, useNavigate } from "react-router";
import { visitorUpdateState } from "@atoms/Visit/visitUpdate";
import { useRecoilValue } from "recoil";
import { RootState } from "@store/index";
import { useSelector } from "react-redux";

interface VisitorData {
  id: number;
  username: string;
  content: string;
  modifiedDate: string;
}

const VisitorButton = ({ id }: any) => {
  const isEditing = useSelector(
    (state: RootState) => state.editPlaylistToggle.isEditing
  );

  const [visitorData, setVisitorData] = useState<VisitorData[]>([]);
  const navigate = useNavigate();

  const { username: paramUsername } = useParams<{
    username: string | undefined;
  }>();
  const { playlistId: ParamsPlaylistId } = useParams<{ playlistId: string }>();

  const handleMoveVisitor = () => {
    navigate(`/user/${paramUsername}/${ParamsPlaylistId}/visitor`);
  };

  const visitorUpdate = useRecoilValue(visitorUpdateState);

  const fetchVisitorData = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      let page = 0;
      let totalData: VisitorData[] = [];
      while (true) {
        const response = await getVisitor(Number(ParamsPlaylistId), page);
        if (response.data.length === 0) {
          // 데이터가 없으면 반복 중지
          break;
        }
        totalData = [...totalData, ...response.data];
        page++;
      }
      setVisitorData(totalData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchVisitorData();
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [visitorUpdate, ParamsPlaylistId]);

  return (
    <div className="bg-black inline-flex px-1  rounded-[30px] mx-4">
      <div className="p-1 rounded-full">
        <img
          onClick={!isEditing ? handleMoveVisitor : undefined}
          className="w-6 h-6"
          src={ChatIcon}
          alt="chat button"
        />
      </div>
      {id === undefined ? null : (
        <div className="mx-2 mt-2">
          <span className="text-center font-semibold">
            {visitorData.length < 1000 ? visitorData.length : "999+"}
          </span>
        </div>
      )}
    </div>
  );
};

export default VisitorButton;
