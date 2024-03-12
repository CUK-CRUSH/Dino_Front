import {useNavigate} from 'react-router';

const NotFound = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/');
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <div className="flex items-center justify-center p-4">
        <h1 className="text-6xl font-bold text-gray-900">404</h1>
        <span className="mx-4 text-[15px] text-gray-600">|</span>
        <div className="text-xl text-gray-600">
          <h2 className="font-bold">페이지를 찾을 수 없습니다.</h2>
          <p className="mt-2">
            요청하신 페이지가 <br /> 존재하지 않거나 <br /> 이동되었습니다.
          </p>
        </div>
      </div>

      <div className="mt-8 w-full px-4">
        <button 
          onClick={handleClick}
          className="w-full bg-black p-4 rounded-[35px] h-[60px] text-white">
          MyList로 돌아가기
        </button>
      </div>
    </div>
  );
};

export default NotFound;