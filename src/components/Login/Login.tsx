// @ts-ignore

import { Link } from "react-router-dom";

import mylist2 from "@assets/Mylist2.png";
import googlelogo from "@assets/Google logo.png";
import facebook from "@assets/facebook-3 logo.png";
import { auth } from "../../firebase";
import { useState } from "react";
import {GoogleAuthProvider, signInWithPopup} from "firebase/auth";



const LoginComponents = () => {

  function handleGoogleLogin() {
    const provider = new GoogleAuthProvider(); // provider 구글 설정
    signInWithPopup(auth, provider) // 팝업창 띄워서 로그인
        .then((result) => {
          // @ts-ignore
          console.log('Success!!!') // user data 설정
          console.log(result.providerId); // console에 UserCredentialImpl 출력
        })
        .catch((err) => {
          console.log(err);
        });
  }

  function handleClick() {
    handleGoogleLogin();
  }


  return (
    <div className="w-full h-full relative bg-white">
      <div
        className={
          "flex flex-col items-center justify-items-center justify-self-center"
        }
      >
        <div className={"w-full h-[150px]"}></div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="64"
          height="64"
          viewBox="0 0 64 64"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M32 41.4667C37.2283 41.4667 41.4667 37.2283 41.4667 32C41.4667 26.7717 37.2283 22.5333 32 22.5333C26.7717 22.5333 22.5333 26.7717 22.5333 32C22.5333 37.2283 26.7717 41.4667 32 41.4667ZM31.9333 37.4667C34.9157 37.4667 37.3333 35.049 37.3333 32.0667C37.3333 29.0843 34.9157 26.6667 31.9333 26.6667C28.951 26.6667 26.5333 29.0843 26.5333 32.0667C26.5333 35.049 28.951 37.4667 31.9333 37.4667Z"
            fill="#121212"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M32 64C49.6731 64 64 49.6731 64 32C64 14.3269 49.6731 0 32 0C14.3269 0 0 14.3269 0 32C0 49.6731 14.3269 64 32 64ZM32 44.5333C38.922 44.5333 44.5333 38.922 44.5333 32C44.5333 25.078 38.922 19.4667 32 19.4667C25.078 19.4667 19.4667 25.078 19.4667 32C19.4667 38.922 25.078 44.5333 32 44.5333ZM28.2033 7.68698C28.2833 8.419 27.7547 9.07726 27.0227 9.15724C16.7614 10.2784 11.5194 18.8042 10.2037 22.9311C9.97998 23.6327 9.2299 24.0201 8.52832 23.7964C7.82673 23.5727 7.43932 22.8226 7.663 22.121C9.15149 17.4524 15.0133 7.78682 26.7331 6.50635C27.4651 6.42637 28.1234 6.95495 28.2033 7.68698ZM26.148 15.8981C26.8822 15.8414 27.4314 15.2002 27.3746 14.466C27.3179 13.7318 26.6767 13.1826 25.9425 13.2394C19.4306 13.7427 16.0136 19.1095 15.0979 21.6963C14.8521 22.3905 15.2156 23.1524 15.9098 23.3981C16.604 23.6439 17.3659 23.2804 17.6117 22.5862C18.3515 20.4961 21.1285 16.2861 26.148 15.8981Z"
            fill="#121212"
          />
        </svg>
        <br></br>
        <img className="w-[179px] h-[55px]" src={mylist2} alt={mylist2} />
        <div className={"h-[100px]"}></div>
        <div className={"flex flex-row"}>
          <div className="w-[284px] h-[49px]">
            <div className="w-[284px] h-[35px] bg-black rounded-[30px] flex flex-row justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="11"
                height="18"
                viewBox="0 0 11 18"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7.07136 0.81856C7.07145 0.638706 7.01462 0.463833 6.90967 0.320993C6.80472 0.178152 6.65749 0.0753055 6.49075 0.0283611C6.32402 -0.0185833 6.14708 -0.00700893 5.98731 0.0612939C5.82753 0.129597 5.69381 0.250821 5.60685 0.406216L0.107085 10.2239C0.0374106 10.3483 0.000473822 10.4896 4.52837e-06 10.6335C-0.000464765 10.7775 0.0355498 10.919 0.104412 11.0438C0.173275 11.1687 0.272547 11.2723 0.392205 11.3444C0.511863 11.4165 0.64767 11.4545 0.785914 11.4544H3.92864V17.1814C3.92855 17.3613 3.98538 17.5362 4.09033 17.679C4.19529 17.8218 4.34252 17.9247 4.50925 17.9716C4.67598 18.0186 4.85292 18.007 5.0127 17.9387C5.17247 17.8704 5.30619 17.7492 5.39315 17.5938L10.8929 7.77606C10.9626 7.65172 10.9995 7.51044 11 7.36649C11.0005 7.22254 10.9644 7.081 10.8956 6.95617C10.8267 6.83135 10.7275 6.72766 10.6078 6.65556C10.4881 6.58347 10.3523 6.54553 10.2141 6.54557H7.07136V0.81856Z"
                  fill="white"
                />
              </svg>
              <div className="w-[10px]"></div>
              <div className=" text-white text-[15px] font-medium font-['Noto Sans']">
                Log in with your social account
              </div>
            </div>
          </div>
        </div>
        <div className={"flex flex-row justify-center"}>
          <button onClick={handleClick}>
            <div className="w-full bg-white">
              <div className="w-[360px] h-[58px] flex flex-row items-center justify-center rounded-[30px] border border-zinc-300">
                <img
                  src={googlelogo}
                  alt={googlelogo}
                  className={"w-[25px] h-[25px] align-middle"}
                />
                <div className={"w-[20px]"}></div>
                <div className="flex flex-col items-center text-[17px] font-semibold font-['Noto Sans']">
                  <button>Sign in with Google</button>
                </div>
              </div>
            </div>
          </button>
        </div>
        <div className={"h-[10px]"}></div>
        <div className={"flex flex-row justify-center"}>
          <Link to={"/login/validation"}>
            <div className="w-full bg-white">
              <div className="w-[360px] h-[58px] flex flex-row items-center justify-center bg-white rounded-[30px] border border-zinc-300">
                <img
                  src={facebook}
                  alt={facebook}
                  className={"w-[25px] h-[25px] align-middle"}
                ></img>
                <div className={"w-[20px]"}></div>
                <div className=" flex flex-col items-center text-center text-[17px] font-semibold font-['Noto Sans']">
                  <div>Continue with Facebook</div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );}
export default LoginComponents;
