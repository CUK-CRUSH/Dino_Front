import ChatIcon from "@assets/Visitor/Chat.svg";
import "@styles/EditList/playList.css";
import { useEffect, useState } from "react";
import { getVisitor } from "@api/visitor-controller/visitorControl";
import { useParams } from "react-router";
import VisitModal from "@pages/Visit/VisitEditModal";
import { visitorUpdateState } from "@atoms/Visit/visitUpdate";
import { useRecoilValue } from "recoil";

interface VisitorData {
  id: number;
  username: string;
  content: string;
  modifiedDate: string;
}

const VisitorButton = ({ id }: any) => {
  const [visitorData, setVisitorData] = useState<VisitorData[]>([]);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const visitorUpdate = useRecoilValue(visitorUpdateState);

  const { playlistId: ParamsPlaylistId } = useParams<{ playlistId: string }>();

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = async () => {
    setIsEditModalOpen(false);
    await fetchVisitorData();
  };

  const fetchVisitorData = async () => {
    try {
      // 0.3초 지연
      await new Promise((resolve) => setTimeout(resolve, 300));
      const visitor = await getVisitor(Number(ParamsPlaylistId));
      setVisitorData(visitor.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchVisitorData();
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [visitorUpdate]);

  return (
    <div className="bg-black inline-flex px-1  rounded-[30px] mx-4">
      <div className="p-1 rounded-full">
        <img
          onClick={openEditModal}
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

      {isEditModalOpen && <VisitModal onClose={closeEditModal} />}
    </div>
  );
};

export default VisitorButton;
