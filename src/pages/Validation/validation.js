import { Link } from 'react-router-dom';
import Layout from "@components/Layout/layout";

const Validation = () => {
    return (
        <Layout>
            <div className="w-[390px] h-[844px] relative bg-white">
                <div className="left-[58px] top-[278px] absolute text-center text-black text-xl font-semibold font-['Noto Sans']">Welcome to My List!<br/>Please write your username</div>
                <div className="w-[360px] h-[58px] left-[15px] top-[393px] absolute bg-white rounded-[30px] border border-zinc-300" />
                <input placeholder={"user name"} className=" left-[57px] w-[275px] top-[409px] absolute text-center text-zinc-300 text-xl font-medium font-['Noto Sans'] border-none outline-none ">
                </input>
                <div className="w-[22px] h-[22px] left-[336px] top-[411px] absolute">
                    <div className="w-[22px] h-[22px] left-0 top-0 absolute bg-green-600 rounded-full" />
                </div>
                <div className="w-[131px] h-[58px] left-[129px] top-[471px] absolute">
                    <div className="w-[131px] h-[58px] left-0 top-0 absolute bg-black rounded-[30px]" />
                </div>
            </div>
        </Layout>
    );
};

export default Validation;



