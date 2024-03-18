import {useNavigate} from 'react-router';
import four from '@assets/Forbidden/404.svg';
import Footer from '@components/Layout/footer';

const NotFound = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/');
  }

  return (
    <div className="flex flex-col h-screen bg-no-repeat bg-right-bottom bg-[#171717] bg-charactor" >
      <div className="p-[3%]">
        <img src={four} alt='x' className='mt-[30%]'  />
        <div className="text-xl text-[#f9f9f9] mt-[7%]">
          <h2 className="font-bold">페이지를 찾을 수 없습니다.</h2>
          <p className="mt-2 text-[#f9f9f9]">
            요청하신 페이지가 <br /> 존재하지 않거나 이동되었습니다.
          </p>
        </div>
      </div>

      <div className="w-[50%] mx-auto mt-[25%]">
        <button 
          onClick={handleClick}
          className="w-full bg-white rounded-[43px] h-[50px] text-black font-PretendardBold">
          MyList로 돌아가기
        </button>
      </div>
      <div className="absolute -bottom-[0px] w-full bg-transparent">
          <Footer bgColor="transparents" />
        </div>
    </div>
  );
};

export default NotFound;