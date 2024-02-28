import {
  deleteVisitor,
  getVisitor,
  patchVisitor,
  postVisitor,
} from "@api/visitor-controller/visitorControl";
import "@styles/EditList/playList.css";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";
import SendChat from "@assets/Visitor/SendChat.svg";
import SettingButton from "@assets/Visitor/Setting.svg";
import "@styles/Admin/style.css";
import useWindowSizeCustom from "@hooks/useCustomMargin/useWindowSizeCustom";
import { useRecoilState } from "recoil";
import { visitorUpdateState } from "@atoms/Visit/visitUpdate";
import Swal from "sweetalert2";
import useDecodedJWT from "@hooks/useDecodedJWT";

interface VisitorData {
  id: number;
  username: string;
  content: string;
  modifiedDate: string;
}
interface VisitorDTO {
  onClose: () => void;
}

const Visitor = ({ onClose }: VisitorDTO) => {
  const swalButton = Swal.mixin({
    customClass: {
      popup: "popup", // 전체
      confirmButton: "confirmButton", // 취소
      cancelButton: "cancelButton", // 삭제
      title: "title", // 타이틀
      htmlContainer: "htmlContainer", // 내용
    },
    buttonsStyling: false,
  });

  const navigate = useNavigate();
  const [visitorData, setVisitorData] = useState<VisitorData[]>([]);
  const [content, setContent] = useState<string>("");
  // 열고닫기
  const [isOpen, setIsOpen] = useState(true);
  const [buttonOpen, setButtonOpen] = useState<{ [key: string]: boolean }>({});

  // 수정
  const [editMode, setEditMode] = useState<{ [key: string]: boolean }>({});
  const [editContent, setEditContent] = useState<{ [key: string]: string }>({});

  const toggleEditMode = (id: any, content: string) => {
    setEditMode((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));

    if (!editMode[id]) {
      setEditContent((prevState) => ({
        ...prevState,
        [id]: content,
      }));
    }
  };

  const handleEditContent = (id: any, content: string) => {
    setEditContent((prevState) => ({
      ...prevState,
      [id]: content,
    }));
  };

  const handleSave = async (id: any) => {
    try {
      // 수정된 내용으로 PATCH 요청
      await patchVisitor(Number(playlistId), id, editContent[id], token);

      // 데이터 새로 가져오기
      await fetchVisitorData();

      // 수정 모드 해제
      setEditMode((prevState) => ({
        ...prevState,
        [id]: false,
      }));
    } catch (error) {
      console.error(error);
    }
  };
  //
  // 삭제
  const handleDelete = async (id: any) => {
    try {
      // 삭제 요청
      await deleteVisitor(Number(playlistId), id, token);

      // 데이터 새로 가져오기
      await fetchVisitorData();
    } catch (error) {
      console.error(error);
    }
  };

  //

  const toggleDropdown = (id: any) => {
    setButtonOpen((prevState) => ({
      ...prevState,
      [id]: !prevState[id], // 클릭한 visitor의 상태만 변경
    }));
  };

  const [visitorUpdate, setVisitorUpdate] = useRecoilState(visitorUpdateState);
  //
  const { windowSize } = useWindowSizeCustom();
  // 사이즈 390 보다 크면 모달창 크기 고정
  const [size, setSize] = useState<boolean>(false);

  const { playlistId } = useParams<{ playlistId: string }>();

  const [cookies] = useCookies(["accessToken"]);
  const token = cookies.accessToken;

  const close = () => {
    onClose(); // Close the modal without saving changes
  };

  const cancel = () => {
    setIsOpen(!isOpen);
    // 애니메이션 용 타이머
    setTimeout(() => {
      close();
    }, 900);
  };

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
    if (!token) {
      swalButton
        .fire({
          title: "로그인 필요한 서비스입니다.",
          text: "로그인이 하시겠습니까?",
          showCancelButton: true,
          confirmButtonColor: "blue",
          cancelButtonColor: "#d33",
          confirmButtonText: "취소",
          cancelButtonText: "로그인",
        })
        .then((result) => {
          if (result.dismiss === Swal.DismissReason.cancel) {
            localStorage.setItem("prevUrl", window.location.href);
            navigate("/login");
          }
        });
      return;
    }
    try {
      await postVisitor(Number(playlistId), content, token);
      setContent("");
      await fetchVisitorData();
      setVisitorUpdate(!visitorUpdate);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (windowSize.width > 390) {
      setSize(true);
    } else {
      setSize(false);
    }
  }, [windowSize.width]);

  useEffect(() => {
    fetchVisitorData();
    /* eslint-disable react-hooks/exhaustive-deps */
  }, []);

  const refreshToken = localStorage.getItem("refreshToken");

  // 토큰 해독
  const decodedRefeshToken = useDecodedJWT(refreshToken);

  return (
    <div
      onClick={cancel}
      className="fixed top-14 left-0 w-full h-[calc(100%-56px)] flex items-center justify-center z-50"
    >
      <div className="absolute -inset-14 bg-gray-800 opacity-75 "></div>

      <div
        className={`relative ${
          size ? "w-[390px]" : "w-full"
        } h-full bg-[#F7F8FA] flex flex-col pointer-events-auto  rounded-t-3xl shadow-lg
    animate-slide-edit-${isOpen ? "in" : "out"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="py-5 h-[60px]">
          <p className="text-[20px] font-bold text-black my-5 text-center h-full">
            방명록
          </p>
        </header>
        <main className="overflow-y-scroll h-[calc(100%-150px)] scrollbar-hide">
          <div className="flex flex-col items-center justify-center h-full">
            {visitorData &&
              visitorData.map((visitor: any) => (
                <div className="flex flex-col bg-[#ffffff] text-black text-[14px] w-11/12 my-2 p-4">
                  {editMode[visitor.id] ? (
                    <>
                      <input
                        className="font-bold w-full h-10 from-[0deg, #FFFFFF, #FFFFFF]  border-none rounded-[10px] p-2 my-2"
                        type="text"
                        value={editContent[visitor.id] || ""}
                        onChange={(e) =>
                          handleEditContent(visitor.id, e.target.value)
                        }
                      />
                      <div className="flex flex-row justify-end">
                        <button
                          className="p-2 border-[1px] mr-1 rounded-lg"
                          onClick={() =>
                            toggleEditMode(visitor.id, visitor.content)
                          }
                        >
                          취소
                        </button>
                        <button
                          className="p-2 border-[1px] rounded-lg text-white bg-black"
                          onClick={() => handleSave(visitor.id)}
                        >
                          저장
                        </button>
                      </div>
                    </>
                  ) : (
                    <div>
                      <div className="flex justify-between items-start">
                        <div className="flex items-center">
                          <p className="font-bold">{visitor.member.username}</p>
                        </div>
                        <button
                          onClick={() => toggleDropdown(visitor.id)}
                          className="relative cursor-pointer"
                        >
                          {decodedRefeshToken &&
                            visitor.member.id ===
                              Number(decodedRefeshToken.sub) && (
                              <img
                                src={SettingButton}
                                alt="edit"
                                className="cursor-pointer"
                              />
                            )}

                          {buttonOpen[visitor.id] && (
                            <ul className="absolute text-12px right-0 top-full mt-2 w-24 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5">
                              <li
                                className="cursor-pointer py-1 border-[1px] border-[#F2F2F2] text-[#2E2E2E]"
                                onClick={() =>
                                  toggleEditMode(visitor.id, visitor.content)
                                }
                              >
                                수정
                              </li>
                              <li
                                onClick={() => handleDelete(visitor.id)}
                                className="cursor-pointer py-1 border-[1px] border-[#F2F2F2] text-[#2E2E2E]"
                              >
                                삭제
                              </li>
                            </ul>
                          )}
                        </button>
                      </div>
                      <div className="flex items-start">
                        <div className="w-full font-bold break-words whitespace-normal">
                          {visitor.content}
                        </div>
                      </div>
                      <p className="text-[10px] text-[#C8C8C8] mr-2">
                        {visitor.modifiedDate}
                      </p>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </main>
        <footer className="w-[390px] h-[60px] mt-auto">
          <form
            onSubmit={handleSubmit}
            className="h-full flex items-center justify-center w-full text-black mt-auto"
          >
            <input
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="방명록을 입력해주세요"
              className="relative w-11/12 h-10 from-[0deg, #FFFFFF, #FFFFFF]  border-none rounded-[10px] p-2 my-2"
            />
            <button
              className="absolute w-9 h-9 rounded-full right-4 bg-black text-8px "
              type="submit"
            >
              <img className="ml-[6px]" src={SendChat} alt="send" />
            </button>
          </form>
        </footer>
      </div>
    </div>
  );
};

export default Visitor;
