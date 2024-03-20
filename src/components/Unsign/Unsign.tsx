import React, { useState } from "react";
import Footer from "@components/Layout/footer";
import { useCookies } from "react-cookie";
import { deleteAccount } from "@api/member-controller/memberController";
import Swal from "sweetalert2";
import "@styles/EditList/playList.css";
import emailjs from "emailjs-com";
import OptionHeader from "@components/Layout/optionHeader";
import useDecodedJWT from "@hooks/useDecodedJWT";
import getItemWithExpiry from "@utils/getItemWithExpiry/getItemWithExpiry";

const Unsign = () => {
  const [cookies, , removeCookie] = useCookies(["accessToken"]);
  const [input, setInput] = useState("");
  const [buttonColor, setButtonColor] = useState("#D9D9D9");

  // id값
  let token = getItemWithExpiry("refreshToken");
  let decodedToken = useDecodedJWT(token);
  let userId: string;
  if (decodedToken) {
    userId = decodedToken.sub;
  } else {
    // decodedToken이 null이면 적절한 기본값을 설정합니다.
    userId = 'defaultUserId';
  }


  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
    setButtonColor(event.target.value ? "#F4675B" : "#D9D9D9");
  };

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

  const handleSubmit = async (event: React.FormEvent,tokenId : string) => {
    event.preventDefault();

    const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
    const userId = process.env.REACT_APP_EMAILJS_USER_ID;

    if (!serviceId || !templateId || !userId) {
      throw new Error("EmailJS environment variables are not set");
    }

    // Show the swalButton before deleting the account
    swalButton
      .fire({
        title: "계정을 삭제하시겠습니까?",
        html: "계정 삭제 시 모든 데이터 복구가 불가능 합니다",
        showCancelButton: true,
        confirmButtonColor: "blue",
        cancelButtonColor: "#000",
        confirmButtonText: "취소",
        cancelButtonText: "삭제",
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          // 'Cancel' button was pressed
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          // 'Delete' button was pressed
          await deleteAccount(cookies.accessToken);

          emailjs.send(
            serviceId,
            templateId,
            {
              message: input,
              // Add any other form data here
            },
            userId
          );
          localStorage.removeItem(`searchTerms_${tokenId}`)
          localStorage.removeItem("homeUrl");
          removeCookie("accessToken", { path: "/" });
          localStorage.removeItem('refreshToken');
          window.location.replace(`/login`)
        }
      });
  };

  return (
    <div className="h-full min-h-screen w-full scrollbar-hide overflow-scroll flex  flex-col bg-white text-black text-[15px] font-medium leading-[18px]">
      <OptionHeader />
      <main className="h-full mt-2 p-4">
      <form onSubmit={(e) => handleSubmit(e, userId)}>
          <h2 className="text-2xl font-bold mb-4">계정 삭제</h2>
          <p className="mb-2">계정이 삭제될 경우</p>
          <p className="mb-2">기존 계정 정보는 즉시 삭제되어</p>
          <p className="mb-4">복구할 수 없습니다</p>
          <p className="mb-4">계정 삭제하려는 이유를 알려주세요</p>
          <textarea
            onChange={handleInputChange}
            value={input}
            required
            className="border rounded p-2 w-full mb-4"
          />
          <button
            style={{
              backgroundColor: buttonColor,
              borderRadius: "0.5rem",
              height: "6vh",
              width: "100%",
            }}
            type="submit"
            className="px-4 py-2 rounded text-white"
          >
            계정 삭제
          </button>
        </form>
      </main>
      <Footer bgColor="bg-gray-100" />
    </div>
  );
};

export default Unsign;
