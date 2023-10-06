import GridComponent from "@utils/grid";

const AdminPage = () => {
  return (
    <main>
      <div className="h-screen flex flex-col text-white bg-white relative">
        <div className="h-1/5">
          <p>사진 데이터를 담은 img태그가 들어옴</p>
        </div>

        <div className="bg-black h-4/5 rounded-t-3xl relative">
          <img className="w-20 h-20 rounded-full bg-red-700 absolute  left-1/2 transform -translate-x-1/2 -translate-y-6"></img>
          <GridComponent />
        </div>
      </div>
    </main>
  );
};

export default AdminPage;
