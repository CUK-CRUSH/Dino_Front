import {
  getVisitor,
  postVisitor,
} from "@api/visitor-controller/visitorControl";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import EditButton from "@assets/Visitor/EditButton.svg";
import TrashCan from "@assets/Visitor/TrashCan.svg";

interface VisitorData {
  id: number;
  username: string;
  content: string;
  modifiedDate: string;
}

const Visitor = () => {
  const [visitorData, setVisitorData] = useState<VisitorData[]>([]);
  const [content, setContent] = useState<string>("");

  const { playlistId } = useParams<{ playlistId: string }>();
  // const playlistId = "30";
  const [cookies] = useCookies(["accessToken"]);
  const token = cookies.accessToken;

  const fetchVisitorData = async () => {
    try {
      const visitor = await getVisitor(Number(playlistId));
      setVisitorData(visitor.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await postVisitor(Number(playlistId), content, token);
      setContent("");
      fetchVisitorData();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchVisitorData();
  }, []);
  return (
    <div
      className={`bg-neutral-900 min-h-[468px] rounded-tl-[30px] rounded-tr-[30px]`}
    >
      <main>
        <div className="flex flex-col items-center justify-center h-full">
          {/* {
            // visitorData가 있을 때만 내용을 렌더링
            visitorData &&
              visitorData.map((visitor: any) => (
                <div className="bg-[#2E2E2E]" key={visitor.id}>
                  <p>{visitor.username}</p>
                  <p>{visitor.content}</p>
                  <p>{visitor.modifiedDate}</p>
                </div>
              ))
          } */}
          <div className="flex flex-col bg-[#2E2E2E] text-white w-11/12 my-6 p-4">
            <div className="flex items-center">
              <p className="font-bold mr-2">jangpang9</p>
              <p className="mr-2">(2024-09-14)</p>
              <img
                src={EditButton}
                alt="edit"
                className="mr-2 cursor-pointer"
              />
              <img src={TrashCan} className="cursor-pointer" alt="delete" />
            </div>

            <div className="flex items-start">
              <div className="w-full break-words whitespace-normal">
                scscaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaadsdsdsdsdsd
              </div>
            </div>
          </div>

          {/* 방명록 작성 */}
          {
            // 방명록 작성 폼
            <form
              onSubmit={handleSubmit}
              className="relative flex items-center justify-center w-full"
            >
              <input
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="방명록을 입력해주세요"
                className="w-11/12 h-10 from-[0deg, #FFFFFF, #FFFFFF]  border-none rounded-[10px] p-2 my-2"
              />
              <button
                className="absolute w-12 h-10 right-4 bg-[#4285F4] text-8px text-white rounded-[10px]"
                type="submit"
              >
                등록
              </button>
            </form>
          }
        </div>
      </main>
    </div>
  );
};

export default Visitor;
