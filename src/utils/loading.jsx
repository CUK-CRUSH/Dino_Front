import Spinner from "@assets/Loading.gif";

const LoadingPage = () => {
  return (
    <div className=" min-h-screen z-[999] flex justify-center items-center">
      <img src={Spinner} alt="loading" />
    </div>
  );
};

export default LoadingPage;
