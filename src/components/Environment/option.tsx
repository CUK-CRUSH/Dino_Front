import { getMemberMe } from "@api/member-controller/memberController";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMemberDTO } from "types/Admin";
import NoImage from "@assets/noimage.jpg";
import AdminEditModal from "@pages/Admin/AdminEditModal";
import "@styles/EditList/playList.css";
import { RootState } from "@store/index";
import { useSelector } from "react-redux";
import LinkCopy from "@assets/Environment/LinkCopy.svg";
import Credit from "@assets/Environment/Credit.svg";
import Theme from "@assets/Environment/Theme.svg";
import Footer from "@components/Layout/footer";
import Swal from "sweetalert2";
import { useCookies } from "react-cookie";
import OptionHeader from "@components/Layout/optionHeader";
import ToastComponent from "@components/Toast/Toast";

const OptionComponents = () => {
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
  const getDefaultMember = (): getMemberDTO => ({
    backgroundImageUrl: null,
    id: undefined,
    introduction: "",
    name: undefined,
    oauth2id: undefined,
    profileImageUrl: null,
    username: "",
  });

  const navigate = useNavigate();

  const [cookies, , removeCookie] = useCookies(["accessToken"]);
  // 세션 아이디
  const id = sessionStorage.getItem("id");

  // 토스트
  const { toast } = useSelector((state: RootState) => state.toast);

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "MyList",
          url: window.location.href.replace("/env", ""),
        })
        .then(() => console.log("Successful share"))
        .catch((error) => console.log("Error sharing", error));
    } else {
      console.log("Web Share API is not supported in your browser.");
    }
  };

  const handleUnprepared = () => {
    window.open("https://forms.gle/UjDH44tU8AJEAYNL7");
  };

  const preparedPage = () => {
    navigate("/unprepared");
  };

  const handleLogout = useCallback(() => {
    swalButton
      .fire({
        title: "로그아웃 하시겠습니까?",
        showCancelButton: true,
        confirmButtonColor: "blue",
        cancelButtonColor: "#d33",
        confirmButtonText: "취소",
        cancelButtonText: "로그아웃",
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          // '취소' 버튼을 눌렀을 때 실행할 코드를 여기에 작성합니다.
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          // '로그아웃' 버튼을 눌렀을 때 실행할 코드를 여기에 작성합니다.
          try {
            removeCookie("accessToken", { path: "/" });
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("homeUrl");
            navigate("/");
          } catch (error) {
            console.log(error);
            swalButton.fire({
              title: "노래 삭제에 실패했습니다.",
              width: "250px",
            });
          }
        }
      });
  }, [navigate, removeCookie, swalButton]);

  const handleNotion = () => {
    window.open(
      "https://myist-info.notion.site/My-List-a0198135fd564a7bb73de538f92e8153"
    );
  };

  const handleFavorites = () => {
    navigate("./favorites", {});
  };

  const handleUnsign = useCallback(() => {
    navigate(`./unsign`);
  }, [navigate]);

  const [userData, setUserdata] = useState<getMemberDTO>(getDefaultMember);
  const [isLoading, setIsLoding] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDataResult = await getMemberMe(cookies.accessToken);

        setUserdata(userDataResult.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    const delay = 500;
    const timeoutId = setTimeout(() => {
      setIsLoding(false);
      fetchData();
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [id, navigate, cookies.accessToken]);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const { profileImage, username, introduction } = useSelector(
    (state: RootState) => state.userProfile
  );

  return (
    <div className="h-full min-h-screen w-full scrollbar-hide overflow-scroll flex  flex-col bg-white text-black text-[15px] font-medium leading-[18px]">
      <OptionHeader />
      {/* 프로필 성공 토스트 */}

      {toast === "profile" && (
        <ToastComponent
          background="black"
          text="프로필이 정상적으로 수정되었습니다 !"
        />
      )}

      {/* 프로필 실패 토스트 */}
      {toast === "not_profile" && (
        <ToastComponent
          background="black"
          text="프로필이 수정을 실패했습니다 !"
        />
      )}

      {!isLoading && (
        <div className="flex-crow h-full">
          <main className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <img
                src={
                  profileImage
                    ? profileImage
                    : userData.profileImage
                    ? userData.profileImage
                    : userData.profileImageUrl
                    ? userData.profileImageUrl
                    : NoImage
                }
                alt="프로필 이미지"
                className="w-14 h-14 rounded-full"
              />
              <div className="ml-4">
                <h2 className="text-lg font-bold">
                  {username ? username : userData.username}
                </h2>
                <p className="text-sm text-gray-500">
                  {introduction ? introduction : userData.introduction}
                </p>
              </div>
            </div>
            <button
              onClick={openEditModal} /* 프로필 바로가기 기능 구현 */
              className="px-4 py-2 text-sm bg-black text-white rounded-2xl"
            >
              프로필 수정
            </button>
          </main>
          <div className="h-[14px] bg-[#F8F8F8]" />
          <main className="flex items-center justify-center text-[16px] font-bold flex-row gap-x-9 my-6">
            <div className="flex flex-col items-center">
              <img
                onClick={handleShare}
                src={LinkCopy}
                alt="링크복사"
                className="flex items-center justify-center w-[28px] h-[36px] cursor-pointer"
              />
              <p className="text-center mt-2">내 링크 공유</p>
            </div>
            <div className="border-[1px] h-[36px] border-solid border-[#C8C8C8]" />
            <div className="flex flex-col items-center">
              <img
                onClick={preparedPage}
                src={Credit}
                alt="결제관리"
                className="flex items-center justify-center w-[28px] h-[36px] cursor-pointer"
              />
              <p className="text-center mt-2">결제 관리</p>
            </div>
            <div className="border-[1px] h-[36px] border-solid border-[#C8C8C8]" />
            <div className="flex flex-col items-center">
              <img
                onClick={preparedPage}
                src={Theme}
                alt="테마"
                className="flex items-center justify-center w-[28px] h-[36px] mt-1 cursor-pointer"
              />
              <p className="text-center mt-1">테마</p>
            </div>
          </main>
          <div className="h-[14px] bg-[#F8F8F8]" />
          <main className="ml-3 text-[17px] font-semibold space-y-5 my-5">
            <div>
              <button onClick={handleFavorites}> 좋아요 목록</button>
            </div>
            <div>
              <button onClick={handleLogout}>로그아웃</button>
            </div>
            <div className="text-[#EA4335]">
              <button onClick={handleUnsign}>회원 탈퇴</button>
            </div>
          </main>
          <div className="h-[14px] bg-[#F8F8F8]" />
          <main className="ml-3 text-[17px] font-semibold space-y-5 my-5">
            <div>
              <button onClick={handleNotion}>공지사항</button>
            </div>
            <div>
              <button onClick={handleUnprepared}>신고</button>
            </div>
          </main>
        </div>
      )}
      {!isLoading && <Footer bgColor="white" />}
      {isEditModalOpen && <AdminEditModal onClose={closeEditModal} />}
    </div>
  );
};

export default OptionComponents;
