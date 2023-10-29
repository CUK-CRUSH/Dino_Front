import { Link } from 'react-router-dom';
import sloagan from '../../../src/assets/slogan2.png';
import mylist1 from '../../../src/assets/Mylist 1.png';
import cd from '../../../src/assets/Group 31.png';
import elipse from '../../../src/assets/Ellipse 1.png';
import Layout from "@components/Layout/layout";

const Home = () => {
    return (
        <Layout>
            <div className="w-96 h-96 relative">
                <div className="w-36 h-9 left-[223px] top-[47px] absolute bg-neutral-200 rounded-3xl" />
                <div className="origin-top-left rotate-[-150deg] w-64 h-64 left-[383.97px] top-[481px] absolute">
                    <div className="w-64 h-64 left-0 top-0 absolute origin-top-left rotate-[-150deg] bg-white rounded-full" />
                    <div className="w-12 h-12 left-[-38.20px] top-[-139.83px] absolute origin-top-left rotate-[-150deg] bg-black rounded-full" />
                </div>
                <div className="w-20 h-9 left-[299px] top-[47px] absolute bg-white rounded-3xl shadow" />
                <div className="w-12 h-12 left-[10px] top-[40px] absolute">
                </div>
                <img className="left-[10px] top-[40px] absolute" src={cd}/>
                <img className="w-24 h-7 left-[57px] top-[52px] absolute" src={mylist1}/>
                <div className="left-[317px] top-[54px] absolute text-neutral-900 text-sm font-semibold font-['Noto Sans']"><Link to={"/login"}>Login</Link></div>
                <div className="left-[239px] top-[54px] absolute text-neutral-900 text-sm font-semibold font-['Noto Sans']">Sign up</div>
                <img className="w-64 h-80 left-[15px] top-[179px] absolute" src={sloagan}/>
                <img src={elipse} className=" left-[15px] top-[730px] absolute" />
                <div className="left-[68.3px] top-[737px] absolute origin-top-left rotate-[14.83deg] text-center text-black text-xl font-semibold font-['Noto Sans']">Share your playlist</div>

                <div className="w-64 h-64 px-5 py-5 left-[206px] top-[524px] absolute justify-center items-center inline-flex">
                    <div className="animate-rotate w-56 h-56 relative">
                        <div className="w-2.5 h-11 left-[30.98px] top-[34.92px] absolute origin-top-left rotate-[-43.96deg] text-black text-xl font-semibold font-['Noto Sans']">!</div>
                        <div className="w-px h-11 left-[21.88px] top-[45.73px] absolute origin-top-left rotate-[-50.70deg] text-black text-xl font-semibold font-['Noto Sans']"> </div>
                        <div className="w-4 h-11 left-[14.18px] top-[57.80px] absolute origin-top-left rotate-[-58.14deg] text-black text-xl font-semibold font-['Noto Sans']">t</div>
                        <div className="w-4 h-11 left-[6.75px] top-[74.08px] absolute origin-top-left rotate-[-66.59deg] text-black text-xl font-semibold font-['Noto Sans']">s</div>
                        <div className="w-2.5 h-11 left-[3.75px] top-[84.54px] absolute origin-top-left rotate-[-73.82deg] text-black text-xl font-semibold font-['Noto Sans']">i</div>
                        <div className="w-2.5 h-11 left-[1.85px] top-[93.82px] absolute origin-top-left rotate-[-78.71deg] text-black text-xl font-semibold font-['Noto Sans']">l</div>
                        <div className="w-5 h-11 left-[0.21px] top-[113.36px] absolute origin-top-left rotate-[-86.67deg] text-black text-xl font-semibold font-['Noto Sans']">y</div>
                        <div className="w-5 h-11 left-[2.84px] top-[135.79px] absolute origin-top-left rotate-[-98.07deg] text-black text-xl font-semibold font-['Noto Sans']">a</div>
                        <div className="w-2.5 h-11 left-[6.19px] top-[146.83px] absolute origin-top-left rotate-[-106.38deg] text-black text-xl font-semibold font-['Noto Sans']">l</div>
                        <div className="w-5 h-11 left-[15.89px] top-[168.83px] absolute origin-top-left rotate-[-115.70deg] text-black text-xl font-semibold font-['Noto Sans']">p</div>
                        <div className="w-px h-11 left-[25.63px] top-[182.14px] absolute origin-top-left rotate-[-126.34deg] text-black text-xl font-semibold font-['Noto Sans']"> </div>
                        <div className="w-4 h-11 left-[35.67px] top-[192.84px] absolute origin-top-left rotate-[-133.89deg] text-black text-xl font-semibold font-['Noto Sans']">r</div>
                        <div className="w-5 h-11 left-[54.64px] top-[207.41px] absolute origin-top-left rotate-[-144.27deg] text-black text-xl font-semibold font-['Noto Sans']">u</div>
                        <div className="w-5 h-11 left-[78.84px] top-[218.17px] absolute origin-top-left rotate-[-157.73deg] text-black text-xl font-semibold font-['Noto Sans']">o</div>
                        <div className="w-5 h-11 left-[100.72px] top-[222.41px] absolute origin-top-left rotate-[-170.12deg] text-black text-xl font-semibold font-['Noto Sans']">y</div>
                        <div className="w-px h-11 left-[116.38px] top-[222.69px] absolute origin-top-left rotate-[-179.40deg] text-black text-xl font-semibold font-['Noto Sans']"> </div>
                        <div className="w-5 h-11 left-[138.31px] top-[219.76px] absolute origin-top-left rotate-[170.78deg] text-black text-xl font-semibold font-['Noto Sans']">e</div>
                        <div className="w-4 h-11 left-[153.53px] top-[214.60px] absolute origin-top-left rotate-[160.94deg] text-black text-xl font-semibold font-['Noto Sans']">r</div>
                        <div className="w-5 h-11 left-[172.68px] top-[204.76px] absolute origin-top-left rotate-[151.28deg] text-black text-xl font-semibold font-['Noto Sans']">a</div>
                        <div className="w-5 h-11 left-[192.12px] top-[188.73px] absolute origin-top-left rotate-[138.81deg] text-black text-xl font-semibold font-['Noto Sans']">h</div>
                        <div className="w-5 h-11 left-[206.83px] top-[169.53px] absolute origin-top-left rotate-[126.05deg] text-black text-xl font-semibold font-['Noto Sans']">S</div>
                        <div className="w-px h-11 left-[213.98px] top-[155.16px] absolute origin-top-left rotate-[116.14deg] text-black text-xl font-semibold font-['Noto Sans']"> </div>
                        <div className="w-5 h-11 left-[221.41px] top-[131.41px] absolute origin-top-left rotate-[105.48deg] text-black text-xl font-semibold font-['Noto Sans']">d</div>
                        <div className="w-5 h-11 left-[223px] top-[105.64px] absolute origin-top-left rotate-[91.98deg] text-black text-xl font-semibold font-['Noto Sans']">n</div>
                        <div className="w-5 h-11 left-[219.28px] top-[82.70px] absolute origin-top-left rotate-[79.52deg] text-black text-xl font-semibold font-['Noto Sans']">a</div>
                        <div className="w-px h-11 left-[213.92px] top-[67.76px] absolute origin-top-left rotate-[69.89deg] text-black text-xl font-semibold font-['Noto Sans']"> </div>
                        <div className="w-5 h-11 left-[203.42px] top-[48.28px] absolute origin-top-left rotate-[60.07deg] text-black text-xl font-semibold font-['Noto Sans']">e</div>
                        <div className="w-4 h-11 left-[193.45px] top-[36.14px] absolute origin-top-left rotate-[50.34deg] text-black text-xl font-semibold font-['Noto Sans']">t</div>
                        <div className="w-5 h-11 left-[177.59px] top-[21.69px] absolute origin-top-left rotate-[40.79deg] text-black text-xl font-semibold font-['Noto Sans']">a</div>
                        <div className="w-5 h-11 left-[157.37px] top-[9.87px] absolute origin-top-left rotate-[28.87deg] text-black text-xl font-semibold font-['Noto Sans']">e</div>
                        <div className="w-4 h-11 left-[142.21px] top-[4.54px] absolute origin-top-left rotate-[19.03deg] text-black text-xl font-semibold font-['Noto Sans']">r</div>
                        <div className="w-5 h-11 left-[116.37px] top-0 absolute origin-top-left rotate-[7.93deg] text-black text-xl font-semibold font-['Noto Sans']">C</div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Home;



