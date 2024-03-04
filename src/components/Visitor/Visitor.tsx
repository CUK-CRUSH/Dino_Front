import {
  deleteVisitor,
  getVisitor,
  patchVisitor,
  postVisitor,
} from "@api/visitor-controller/visitorControl";
import "@styles/EditList/playList.css";
import { useCallback, useEffect, useState } from "react";
import { getMemberDTO } from "types/Admin";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";
import SendChat from "@assets/Visitor/SendChat.svg";
import SettingButton from "@assets/Visitor/Setting.svg";
import "@styles/Admin/style.css";
import Swal from "sweetalert2";
import useDecodedJWT from "@hooks/useDecodedJWT";
import OptionHeader from "@components/Layout/optionHeader";
import { useInView } from "react-intersection-observer";
import InfiniteDiv from "@components/InfiniteDiv/InfiniteDiv";
import { getMemberUsername } from "@api/member-controller/memberController";
import useCompareToken from "@hooks/useCompareToken/useCompareToken";
import { FaCirclePlus } from "react-icons/fa6";

interface VisitorData {
  id: number;
  username: string;
  content: string;
  modifiedDate: string;
}

const Visitor = () => {
  const getDefaultMember = (): getMemberDTO => ({
    backgroundImageUrl: null,
    id: undefined,
    introduction: "",
    name: undefined,
    oauth2id: undefined,
    profileImageUrl: null,
    username: "",
  });
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

  const [buttonOpen, setButtonOpen] = useState<{ [key: string]: boolean }>({});

  //무한 스크롤
  const [view] = useInView();

  const [isLast, setLast] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);

  const { playlistId } = useParams<{ playlistId: string }>();
  const { username } = useParams<{ username: string }>();
  const [userData, setUserData] = useState<getMemberDTO>(getDefaultMember);

  const [cookies] = useCookies(["accessToken"]);
  const token = cookies.accessToken;
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
      const updatedVisitor = await patchVisitor(
        Number(playlistId),
        id,
        editContent[id],
        token
      );
      setVisitorData((prevData) =>
        prevData.map((visitor) =>
          visitor.id === id ? updatedVisitor.data : visitor
        )
      );

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

      setVisitorData((prevData) =>
        prevData.filter((visitor) => visitor.id !== id)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = useCallback(
    async (event: React.FormEvent) => {
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
        const newVisitor = await postVisitor(
          Number(playlistId),
          content,
          token
        );
        setContent("");
        setVisitorData((prevData) => [newVisitor.data, ...prevData]);
      } catch (error) {
        if (error instanceof Error) {
          swalButton.fire("오류가 발생했습니다.", error.message, "error");
        }
      }
    },
    [content, playlistId, swalButton, token, navigate]
  );

  const toggleDropdown = (id: any) => {
    setButtonOpen((prevState) => ({
      ...prevState,
      [id]: !prevState[id], // 클릭한 visitor의 상태만 변경
    }));
  };

  const fetchVisitorData = async (pageNum: number) => {
    try {
      const visitor = await getVisitor(Number(playlistId), pageNum);
      setVisitorData((prevUsers) => [...prevUsers, ...visitor.data]);

      if (visitor.data.length < 15) {
        setLast(true);
      } else {
        setLast(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchVisitorData(0);
    /* eslint-disable react-hooks/exhaustive-deps */
  }, []);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getMemberUsername(username);
        setUserData(data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, [username]);

  const handleLoadMore = () => {
    const newPage = page + 1;
    setPage(newPage); // 페이지 번호를 증가시키고
    fetchVisitorData(newPage); // 새 페이지 번호를 fetchVisitorData에 전달합니다.
  };

  const refreshToken = localStorage.getItem("refreshToken");
  // console.log(visitorUpdate);

  // 토큰 해독
  const decodedRefeshToken = useDecodedJWT(refreshToken);

  const authority = useCompareToken(userData && userData?.id);

  return (
    <div className="h-full w-full scrollbar-hide overflow-scroll flex flex-col bg-white text-black font-medium leading-[18px]">
      <div
        className={`relative h-full bg-[#F7F8FA] flex flex-col`}
        onClick={(e) => e.stopPropagation()}
      >
        <OptionHeader text="방명록" />
        <main>
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
                      <div className="flex justify-between items-start ">
                        <div className="flex items-center mb-1">
                          <img
                            src={visitor.member.profileImageUrl}
                            className="w-[20px] h-[20px] rounded-full mr-1"
                            alt="profile"
                          />

                          <p className="font-bold">{visitor.member.username}</p>
                        </div>
                        <button
                          onClick={() => toggleDropdown(visitor.id)}
                          className="relative cursor-pointer"
                        >
                          {decodedRefeshToken &&
                            (authority ||
                              visitor.member.id ===
                                Number(decodedRefeshToken.sub)) && (
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
                        <div className="w-full text-[16px] font-bold break-words whitespace-normal">
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
        {!isLast && (
          <button onClick={handleLoadMore} className="flex justify-center">
            <FaCirclePlus size={28} color="" />
          </button>
        )}
        <div>
          <InfiniteDiv view={view} />
        </div>
        <footer className="w-full ">
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
