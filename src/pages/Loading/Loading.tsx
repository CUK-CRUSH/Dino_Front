import { useNavigate } from 'react-router';
import logo from "@assets/Loading/Logo.svg";
import title from "@assets/Loading/Title.svg";
import { useEffect, useState } from 'react';
import useDecodedJWT from '@hooks/useDecodedJWT';
import { useDispatch } from 'react-redux';
import { getMember } from '@api/member-controller/memberController';
import Spinner from '@assets/Spinner/Spinner.svg';

const Loading = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 관리를 위한 상태 변수
  const refreshToken = localStorage.getItem('refreshToken');
  const decodedToken = useDecodedJWT(refreshToken);
  const id = decodedToken?.sub;

  useEffect(() => {
    const redirectAfterFetch = async () => {
      if (decodedToken) {
        setIsLoading(true); // 데이터를 가져오기 시작할 때 로딩 상태를 true로 설정
        try {
          const getUserData = await getMember(id);
          localStorage.setItem("homeUrl", getUserData.data.username); // Set refreshToken in local storage
          navigate(`/user/${getUserData.data.username}`);
          setIsLoading(false); // 데이터를 가져온 후 또는 오류 발생 시 로딩 상태를 false로 설정

        } catch (error) {
          console.error("Error fetching member:", error);
        } finally {
          setIsLoading(false); // 데이터를 가져온 후 또는 오류 발생 시 로딩 상태를 false로 설정
        }
      } else {
        navigate('/welcome')
        console.error("Decoded token is not present");
      }
    }; 
    redirectAfterFetch();
  }, [navigate, decodedToken, dispatch, id]);

  return (
    <div className="flex flex-col h-screen  bg-no-repeat bg-right-bottom bg-[#fff] bg-charactor">
      <div className="flex flex-col items-center">
        <img src={logo} alt='logo ' className='mt-[40%]' />
        <img src={title} alt='title' className='mt-[5%]' />
        {isLoading && <img className='w-[100px] mt-[20%]' src={Spinner} alt='x' /> }
      </div>
    </div>
  );
};

export default Loading;