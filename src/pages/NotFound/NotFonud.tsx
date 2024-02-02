const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <h1 className="text-6xl font-bold text-gray-900">404</h1>
      <span className="mx-4 text-xl text-gray-600">|</span>
      <div className="text-xl text-gray-600">
        <h2 className="font-bold">페이지를 찾을 수 없습니다.</h2>
        <p className="mt-2">
          요청하신 페이지가 존재하지 않거나 이동되었습니다.
        </p>
      </div>
    </div>
  );
};

export default NotFound;
