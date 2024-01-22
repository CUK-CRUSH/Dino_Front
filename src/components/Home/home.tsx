import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import {EffectCoverflow, Mousewheel, Navigation} from 'swiper/modules';
const HomeComponent = () => {

  return (
      <div className="w-full h-full">
        <div className={"h-[30px]"}></div>
        <div className={"flex flex-row items-center align-middle"}>
          <div className="w-[91px] h-[34px] ml-1 bg-neutral-700 rounded-[9px] flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none"
                 className={"ml-1"}>
              <g clip-path="url(#clip0_1_10)">
                <path
                    d="M1.91667 11.5C1.91667 16.7929 6.20713 21.0833 11.5 21.0833C16.7929 21.0833 21.0833 16.7929 21.0833 11.5C21.0833 6.20712 16.7929 1.91666 11.5 1.91666C6.20713 1.91666 1.91667 6.20712 1.91667 11.5Z"
                    stroke="white" stroke-width="1.875" stroke-linecap="round" stroke-linejoin="round"/>
                <path
                    d="M12.4583 1.96457C12.4583 1.96457 15.3333 5.74999 15.3333 11.5C15.3333 17.25 12.4583 21.0354 12.4583 21.0354M10.5417 21.0354C10.5417 21.0354 7.66667 17.25 7.66667 11.5C7.66667 5.74999 10.5417 1.96457 10.5417 1.96457M2.52042 14.8542H20.4796M2.52042 8.14582H20.4796"
                    stroke="white" stroke-width="1.875" stroke-linecap="round" stroke-linejoin="round"/>
              </g>
              <defs>
                <clipPath id="clip0_1_10">
                  <rect width="23" height="23" fill="white"/>
                </clipPath>
              </defs>
            </svg>
            <div className={"w-[4px]"}></div>
            <div><p className={"text-amber-50"}>한국어</p></div>
          </div>
          <div className={"grow"}></div>
          <div
              className="flex flex-row w-[100px] h-[35px] bg-neutral-200 rounded-[30px] justify-center items-center">
            <Link to={"/login"}>
              <div className="text-[15px] font-normal font-['Pretendard']">로그인</div>
            </Link>
          </div>
        </div>

        <div className={"h-[38px]"}></div>

        <div className={"divdiv flex flex-col items-center justify-center gap-4"}>
          <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M25 50C38.8071 50 50 38.8071 50 25C50 11.1929 38.8071 0 25 0C11.1929 0 0 11.1929 0 25C0 38.8071 11.1929 50 25 50ZM25 34.7917C30.4078 34.7917 34.7917 30.4078 34.7917 25C34.7917 19.5922 30.4078 15.2083 25 15.2083C19.5922 15.2083 15.2083 19.5922 15.2083 25C15.2083 30.4078 19.5922 34.7917 25 34.7917Z"
                  fill="white"/>
            <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M24.9995 32.396C29.0841 32.396 32.3953 29.0847 32.3953 25.0001C32.3953 20.9155 29.0841 17.6043 24.9995 17.6043C20.9149 17.6043 17.6036 20.9155 17.6036 25.0001C17.6036 29.0847 20.9149 32.396 24.9995 32.396ZM24.9474 29.271C27.2774 29.271 29.1661 27.3822 29.1661 25.0522C29.1661 22.7223 27.2774 20.8335 24.9474 20.8335C22.6174 20.8335 20.7286 22.7223 20.7286 25.0522C20.7286 27.3822 22.6174 29.271 24.9474 29.271Z"
                  fill="white"/>
            <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M24.9995 32.396C29.0841 32.396 32.3953 29.0847 32.3953 25.0001C32.3953 20.9155 29.0841 17.6043 24.9995 17.6043C20.9149 17.6043 17.6036 20.9155 17.6036 25.0001C17.6036 29.0847 20.9149 32.396 24.9995 32.396ZM24.9474 29.271C27.2774 29.271 29.1661 27.3822 29.1661 25.0522C29.1661 22.7223 27.2774 20.8335 24.9474 20.8335C22.6174 20.8335 20.7286 22.7223 20.7286 25.0522C20.7286 27.3822 22.6174 29.271 24.9474 29.271Z"
                  fill="white"/>
            <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M24.9995 32.396C29.0841 32.396 32.3953 29.0847 32.3953 25.0001C32.3953 20.9155 29.0841 17.6043 24.9995 17.6043C20.9149 17.6043 17.6036 20.9155 17.6036 25.0001C17.6036 29.0847 20.9149 32.396 24.9995 32.396ZM24.9474 29.271C27.2774 29.271 29.1661 27.3822 29.1661 25.0522C29.1661 22.7223 27.2774 20.8335 24.9474 20.8335C22.6174 20.8335 20.7286 22.7223 20.7286 25.0522C20.7286 27.3822 22.6174 29.271 24.9474 29.271Z"
                  fill="white"/>
            <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M22.0332 6.00548C22.0956 6.57737 21.6827 7.09164 21.1108 7.15412C13.0941 8.03 8.99884 14.6908 7.97091 17.9149C7.79616 18.463 7.21016 18.7657 6.66205 18.591C6.11393 18.4162 5.81126 17.8302 5.98602 17.2821C7.1489 13.6347 11.7284 6.08348 20.8845 5.08311C21.4564 5.02063 21.9707 5.43358 22.0332 6.00548Z"
                  fill="black"/>
            <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M21.386 11.3016C21.4304 11.8752 21.0013 12.3761 20.4277 12.4205C16.5063 12.7236 14.3368 16.0126 13.7587 17.6455C13.5668 18.1878 12.9715 18.4718 12.4292 18.2799C11.8868 18.0879 11.6028 17.4926 11.7948 16.9503C12.5102 14.9293 15.1798 10.7366 20.2672 10.3433C20.8408 10.299 21.3417 10.7281 21.386 11.3016Z"
                  fill="black"/>
          </svg>

          <svg xmlns="http://www.w3.org/2000/svg" width="204" height="59" viewBox="0 0 204 59" fill="none">
            <path
                d="M201.548 34.0924L201.472 33.216L200.619 33.4294C200.537 33.4498 200.428 33.4641 200.286 33.4641H200.286H200.285H200.284H200.283H200.282H200.281H200.28H200.279H200.278H200.278H200.277H200.276H200.275H200.274H200.273H200.272H200.271H200.27H200.27H200.269H200.268H200.267H200.266H200.265H200.264H200.263H200.263H200.262H200.261H200.26H200.259H200.258H200.257H200.256H200.256H200.255H200.254H200.253H200.252H200.251H200.25H200.249H200.249H200.248H200.247H200.246H200.245H200.244H200.243H200.242H200.242H200.241H200.24H200.239H200.238H200.237H200.236H200.235H200.235H200.234H200.233H200.232H200.231H200.23H200.229H200.229H200.228H200.227H200.226H200.225H200.224H200.223H200.222H200.222H200.221H200.22H200.219H200.218H200.217H200.216H200.216H200.215H200.214H200.213H200.212H200.211H200.21H200.21H200.209H200.208H200.207H200.206H200.205H200.205H200.204H200.203H200.202H200.201H200.2H200.199H200.199H200.198H200.197H200.196H200.195H200.194H200.193H200.193H200.192H200.191H200.19H200.189H200.188H200.188H200.187H200.186H200.185H200.184H200.183H200.183H200.182H200.181H200.18H200.179H200.178H200.177H200.177H200.176H200.175H200.174H200.173H200.172H200.172H200.171H200.17H200.169H200.168H200.167H200.167H200.166H200.165H200.164H200.163H200.162H200.162H200.161H200.16H200.159H200.158H200.158H200.157H200.156H200.155H200.154H200.153H200.153H200.152H200.151H200.15H200.149H200.148H200.148H200.147H200.146H200.145H200.144H200.144H200.143H200.142H200.141H200.14H200.139H200.139H200.138H200.137H200.136H200.135H200.135H200.134H200.133H200.132H200.131H200.13H200.13H200.129H200.128H200.127H200.126H200.126H200.125H200.124H200.123H200.122H200.122H200.121H200.12H200.119H200.118H200.118H200.117H200.116H200.115H200.114H200.113H200.113H200.112H200.111H200.11H200.109H200.109H200.108H200.107H200.106H200.105H200.105H200.104H200.103H200.102H200.101H200.101H200.1H200.099H200.098H200.098H200.097H200.096H200.095H200.094H200.094H200.093H200.092H200.091H200.09H200.09H200.089H200.088H200.087H200.086H200.086H200.085H200.084H200.083H200.082H200.082H200.081H200.08H200.079H200.079H200.078H200.077H200.076H200.075H200.075H200.074H200.073H200.072H200.072H200.071H200.07H200.069H200.068H200.068H200.067H200.066H200.065H200.065H200.064H200.063H200.062H200.061H200.061H200.06H200.059H200.058H200.058H200.057H200.056H200.055H200.054H200.054H200.053H200.052H200.051H200.051H200.05H200.049H200.048H200.048H200.047H200.046H200.045H200.044H200.044H200.043H200.042H200.041H200.041H200.04H200.039H200.038H200.038H200.037H200.036H200.035H200.035H200.034H200.033H200.032H200.032H200.031H200.03H200.029H200.028H200.028H200.027H200.026H200.025H200.025H200.024H200.023H200.022H200.022H200.021H200.02H200.019H200.019H200.018H200.017H200.016H200.016H200.015H200.014H200.013H200.013H200.012H200.011H200.01H200.01H200.009H200.008H200.007H200.007H200.006H200.005H200.005H200.004H200.003H200.002H200.002H200.001H200H199.999H199.999H199.998H199.997H199.996H199.996H199.995H199.994H199.993H199.993H199.992H199.991H199.991H199.99H199.989H199.988H199.988H199.987H199.986H199.985H199.985H199.984H199.983H199.982H199.982H199.981H199.98H199.98H199.979H199.978H199.977H199.977H199.976H199.975H199.974H199.974H199.973H199.972H199.972H199.971H199.97H199.969H199.969H199.968H199.967H199.967H199.966H199.965H199.964H199.964H199.963H199.962H199.961H199.961H199.96H199.959H199.959H199.958H199.957H199.956H199.956H199.955H199.954H199.954H199.953H199.952H199.952H199.951H199.95H199.949H199.949H199.948H199.947H199.947H199.946H199.945H199.944H199.944H199.943H199.942H199.942H199.941H199.94H199.939H199.939H199.938H199.937H199.937H199.936H199.935H199.935H199.934H199.933H199.932H199.932H199.931H199.93H199.93H199.929H199.928H199.928H199.927H199.926H199.926H199.925H199.924H199.923H199.923H199.922H199.921H199.921H199.92H199.919H199.919H199.918H199.917H199.917H199.916H199.915H199.914H199.914H199.913H199.912H199.912H199.911H199.91H199.91H199.909H199.908H199.908H199.907H199.906H199.906H199.905H199.904H199.904H199.903H199.902H199.901H199.901H199.9H199.899H199.899H199.898H199.897H199.897H199.896H199.895H199.895H199.894H199.893H199.893H199.892H199.891H199.891H199.89H199.889H199.889H199.888H199.887H199.887C199.072 33.4641 198.536 33.2567 198.18 32.9319C197.873 32.6157 197.609 31.9101 197.609 30.5586V25.5969H200.972H201.722V24.8469V12.5095V11.7595H200.972H197.609V6.34088V5.51214L196.785 5.5946L181.363 7.13677L180.81 7.19211L180.702 7.73771L179.908 11.7595H177.325H176.575V12.5095V24.8469V25.5969H177.325H179.66V34.2712C179.66 38.1778 180.256 41.3119 181.524 43.6019L181.527 43.6069C182.785 45.8396 184.55 47.4275 186.814 48.333L186.814 48.3331L186.825 48.3373C189.02 49.1755 191.513 49.5861 194.289 49.5861C195.498 49.5861 196.762 49.5083 198.079 49.3538C199.398 49.237 200.752 49.0431 202.143 48.7727L202.805 48.644L202.747 47.9719L201.548 34.0924Z"
                fill="white" stroke="black" stroke-width="1.5"/>
            <path
                d="M177.335 28.7418L178.355 29.3677L178.474 28.1769L179.901 13.8405L179.966 13.1913L179.332 13.0373C176.644 12.3844 173.917 11.8659 171.153 11.4818C168.379 11.0582 165.696 10.8457 163.105 10.8457C160.073 10.8457 157.295 11.2341 154.776 12.0206C152.225 12.7788 150.154 14.048 148.601 15.8462L148.601 15.8461L148.595 15.8537C147.041 17.7009 146.305 20.1555 146.305 23.1334C146.305 25.3234 146.743 27.1873 147.677 28.673L147.684 28.6837L147.691 28.6941C148.638 30.0947 149.877 31.188 151.396 31.9683C152.871 32.7254 154.478 33.2799 156.215 33.6352L156.218 33.6358C157.948 33.9817 159.677 34.27 161.407 34.5006L161.407 34.5007L161.418 34.502C161.959 34.5657 162.331 34.6385 162.563 34.7088C162.511 34.7158 162.445 34.7207 162.363 34.7207H162.362H162.361H162.36H162.359H162.358H162.357H162.356H162.356H162.355H162.354H162.353H162.352H162.351H162.35H162.349H162.348H162.348H162.347H162.346H162.345H162.344H162.343H162.342H162.341H162.34H162.339H162.339H162.338H162.337H162.336H162.335H162.334H162.333H162.332H162.331H162.331H162.33H162.329H162.328H162.327H162.326H162.325H162.324H162.323H162.323H162.322H162.321H162.32H162.319H162.318H162.317H162.316H162.315H162.314H162.314H162.313H162.312H162.311H162.31H162.309H162.308H162.307H162.306H162.306H162.305H162.304H162.303H162.302H162.301H162.3H162.299H162.298H162.298H162.297H162.296H162.295H162.294H162.293H162.292H162.291H162.29H162.29H162.289H162.288H162.287H162.286H162.285H162.284H162.283H162.282H162.281H162.281H162.28H162.279H162.278H162.277H162.276H162.275H162.274H162.273H162.273H162.272H162.271H162.27H162.269H162.268H162.267H162.266H162.265H162.265H162.264H162.263H162.262H162.261H162.26H162.259H162.258H162.257H162.256H162.256H162.255H162.254H162.253H162.252H162.251H162.25H162.249H162.248H162.248H162.247H162.246H162.245H162.244H162.243H162.242H162.241H162.24H162.24H162.239H162.238H162.237H162.236H162.235H162.234H162.233H162.232H162.231H162.231H162.23H162.229H162.228H162.227H162.226H162.225H162.224H162.223H162.223H162.222H162.221H162.22H162.219H162.218H162.217H162.216H162.215H162.215H162.214H162.213H162.212H162.211H162.21H162.209H162.208H162.207H162.207H162.206H162.205H162.204H162.203H162.202H162.201H162.2H162.199H162.198H162.198H162.197H162.196H162.195H162.194H162.193H162.192H162.191H162.19H162.19H162.189H162.188H162.187H162.186H162.185H162.184H162.183H162.182H162.182H162.181H162.18H162.179H162.178H162.177H162.176H162.175H162.174H162.173H162.173H162.172H162.171H162.17H162.169H162.168H162.167H162.166H162.165H162.165H162.164H162.163H162.162H162.161H162.16H162.159H162.158H162.157H162.157H162.156H162.155H162.154H162.153H162.152H162.151H162.15H162.149H162.148H162.148H162.147H162.146H162.145H162.144H162.143H162.142H162.141H162.14H162.14H162.139H162.138H162.137H162.136H162.135H162.134H162.133H162.132H162.132H162.131H162.13H162.129H162.128H162.127H162.126H162.125H162.124H162.124H162.123H162.122H162.121H162.12H162.119H162.118H162.117H162.116H162.115H162.115H162.114H162.113H162.112H162.111H162.11H162.109H162.108H162.107H162.107H162.106H162.105H162.104H162.103H162.102H162.101H162.1H162.099H162.099H162.098H162.097H162.096H162.095H162.094H162.093H162.092H162.091H162.09H162.09H162.089H162.088H162.087H162.086H162.085H162.084H162.083H162.082H162.082H162.081H162.08H162.079H162.078H162.077H162.076H162.075H162.074H162.074H162.073H162.072H162.071H162.07H162.069H162.068H162.067H162.066H162.065H162.065H162.064H162.063H162.062H162.061H162.06H162.059H162.058H162.057H162.057H162.056H162.055H162.054H162.053H162.052H162.051H162.05H162.049H162.049H162.048H162.047H162.046H162.045H162.044H162.043H162.042H162.041H162.041H162.04H162.039H162.038H162.037H162.036H162.035H162.034H162.033H162.032H162.032H162.031H162.03H162.029H162.028H162.027H162.026H162.025H162.024H162.024H162.023H162.022H162.021H162.02H162.019H162.018H162.017H162.016H162.016H162.015H162.014H162.013H162.012H162.011H162.01H162.009H162.008H162.007H162.007H162.006H162.005H162.004H162.003H162.002H162.001H162H161.999H161.999H161.998H161.997H161.996H161.995H161.994H161.993H161.992H161.991H161.991H161.99H161.989H161.988H161.987H161.986H161.985H161.984H161.983H161.982H161.982H161.981H161.98H161.979H161.978H161.977H161.976H161.975H161.974H161.974H161.973H161.972H161.971H161.97H161.969H161.968H161.967H161.966H161.966H161.965H161.964H161.963H161.962H161.961H161.96H161.959H161.958H161.958H161.957H161.956H161.955H161.954H161.953H161.952H161.951H161.95H161.949H161.949H161.948H161.947H161.946H161.945H161.944H161.943H161.942H161.941H161.941H161.94H161.939H161.938H161.937H161.936H161.935H161.934H161.933H161.933H161.932H161.931H161.93H161.929H161.928H161.927H161.926H161.925H161.924H161.924H161.923H161.922H161.921H161.92H161.919H161.918H161.917H161.916H161.916H161.915H161.914H161.913H161.912H161.911H161.91H161.909H161.908H161.908H161.907H161.906C161.871 34.7207 161.801 34.7143 161.688 34.686L161.632 34.672L161.575 34.6667C158.706 34.4025 156.439 34.0089 154.756 33.4966C153.042 32.9751 151.696 32.426 150.697 31.8572C149.68 31.2168 148.817 30.6539 148.107 30.1681L147.046 29.4424L146.936 30.7228L145.566 46.6585L145.509 47.3113L146.149 47.4546C148.379 47.9546 150.949 48.4146 153.855 48.8353C156.823 49.2976 159.773 49.529 162.705 49.529C165.03 49.529 167.262 49.3355 169.402 48.9469C171.554 48.5941 173.489 48.0039 175.2 47.1682L175.201 47.1683L175.207 47.1651C176.986 46.2758 178.403 45.0706 179.434 43.5443C180.487 41.9853 180.99 40.0786 180.99 37.8696C180.99 35.2747 180.501 33.1335 179.441 31.521C178.418 29.9254 177.076 28.7251 175.422 27.9392C173.831 27.1838 172.126 26.6686 170.309 26.3913C168.556 26.0867 166.894 25.8571 165.324 25.7029C164.876 25.6189 164.492 25.5455 164.172 25.4827C164.178 25.4827 164.184 25.4826 164.19 25.4826C164.33 25.4826 164.472 25.4966 164.615 25.5252L164.687 25.5398H164.762H164.763H164.764H164.765H164.766H164.767H164.768H164.769H164.771H164.772H164.773H164.774H164.775H164.776H164.777H164.778H164.78H164.781H164.782H164.783H164.784H164.785H164.786H164.788H164.789H164.79H164.791H164.792H164.793H164.794H164.795H164.797H164.798H164.799H164.8H164.801H164.802H164.803H164.805H164.806H164.807H164.808H164.809H164.81H164.812H164.813H164.814H164.815H164.816H164.817H164.818H164.82H164.821H164.822H164.823H164.824H164.825H164.827H164.828H164.829H164.83H164.831H164.832H164.834H164.835H164.836H164.837H164.838H164.839H164.841H164.842H164.843H164.844H164.845H164.847H164.848H164.849H164.85H164.851H164.852H164.854H164.855H164.856H164.857H164.858H164.86H164.861H164.862H164.863H164.864H164.866H164.867H164.868H164.869H164.87H164.872H164.873H164.874H164.875H164.876H164.878H164.879H164.88H164.881H164.882H164.884H164.885H164.886H164.887H164.888H164.89H164.891H164.892H164.893H164.894H164.896H164.897H164.898H164.899H164.901H164.902H164.903H164.904H164.905H164.907H164.908H164.909H164.91H164.912H164.913H164.914H164.915H164.916H164.918H164.919H164.92H164.921H164.923H164.924H164.925H164.926H164.928H164.929H164.93H164.931H164.933H164.934H164.935H164.936H164.938H164.939H164.94H164.941H164.942H164.944H164.945H164.946H164.947H164.949H164.95H164.951H164.953H164.954H164.955H164.956H164.958H164.959H164.96H164.961H164.963H164.964H164.965H164.966H164.968H164.969H164.97H164.971H164.973H164.974H164.975H164.977H164.978H164.979H164.98H164.982H164.983H164.984H164.985H164.987H164.988H164.989H164.991H164.992H164.993H164.994H164.996H164.997H164.998H165H165.001H165.002H165.003H165.005H165.006H165.007H165.009H165.01H165.011H165.013H165.014H165.015H165.016H165.018H165.019H165.02H165.022H165.023H165.024H165.026H165.027H165.028H165.029H165.031H165.032H165.033H165.035H165.036H165.037H165.039H165.04H165.041H165.043H165.044H165.045H165.047H165.048H165.049H165.05H165.052H165.053H165.054H165.056H165.057H165.058H165.06H165.061H165.062H165.064H165.065H165.066H165.068H165.069H165.07H165.072H165.073H165.074H165.076H165.077H165.078H165.08H165.081H165.082H165.084H165.085H165.086H165.088H165.089H165.091H165.092H165.093H165.095H165.096H165.097H165.099H165.1H165.101H165.103H165.104H165.105H165.107H165.108H165.109H165.111H165.112H165.114H165.115H165.116H165.118H165.119H165.12H165.122H165.123H165.125H165.126H165.127H165.129H165.13H165.131H165.133H165.134H165.136H165.137H165.138H165.14H165.141H165.142H165.144H165.145H165.147H165.148H165.149H165.151H165.152H165.153H165.155H165.156H165.158H165.159H165.16H165.162H165.163H165.165H165.166H165.167H165.169H165.17H165.172H165.173H165.174H165.176H165.177H165.179H165.18H165.181H165.183H165.184H165.186H165.187H165.188H165.19H165.191H165.193H165.194H165.196H165.197H165.198H165.2H165.201H165.203H165.204H165.205H165.207H165.208H165.21H165.211H165.213H165.214H165.215H165.217H165.218H165.22H165.221H165.223H165.224H165.225H165.227H165.228H165.23H165.231H165.233H165.234H165.235H165.237H165.238H165.24H165.241H165.243H165.244H165.246H165.247H165.248H165.25H165.251H165.253H165.254H165.256H165.257H165.259H165.26H165.262H165.263H165.264H165.266H165.267H165.269H165.27H165.272H165.273H165.275H165.276H165.278H165.279H165.28H165.282H165.283H165.285H165.286H165.288H165.289H165.291H165.292H165.294H165.295H165.297H165.298H165.3H165.301H165.303H165.304H165.306H165.307H165.309H165.31H165.311H165.313H165.314H165.316H165.317H165.319H165.32H165.322H165.323H165.325H165.326H165.328H165.329H165.331H165.332H165.334H165.335H165.337H165.338H165.34H165.341H165.343H165.344H165.346H165.347H165.349H165.35H165.352H165.353H165.355H165.356H165.358H165.359H165.361H165.362H165.364H165.365H165.367H165.368H165.37H165.372H165.373H165.375H165.376H165.378H165.379H165.381H165.382H165.384H165.385H165.387H165.388H165.39H165.391H165.393H165.394H165.396H165.397H165.399H165.401H165.402H165.404H165.405H165.407H165.408H165.41H165.411H165.413H165.414H165.416H165.418H165.419H165.42C168.043 25.7283 170.272 26.0651 172.112 26.5437L172.116 26.5446C173.986 27.0214 175.725 27.7539 177.335 28.7418Z"
                fill="white" stroke="black" stroke-width="1.5"/>
            <path
                d="M130.918 10.9674V11.7174H131.668H148.118H148.868V10.9674V2V1.25H148.118H131.668H130.918V2V10.9674ZM148.118 48.6723H148.868V47.9223V12.5096V11.7596H148.118H131.668H130.918V12.5096V47.9223V48.6723H131.668H148.118Z"
                fill="white" stroke="black" stroke-width="1.5"/>
            <path
                d="M115.951 3.94208V3.19208H115.201H97.2086H96.4586V3.94208V47.9224V48.6724H97.2086H132.678H133.428V47.9224V30.4445V29.6945H132.678H115.951V3.94208Z"
                fill="white" stroke="black" stroke-width="1.5"/>
            <path
                d="M73.8207 57.4684H74.3741L74.5374 56.9397L88.1884 12.7309L88.4883 11.7596H87.4718H68.9658H68.218L68.2158 12.5074L68.1776 25.5155L67.1432 12.4504L67.0885 11.7596H66.3955H47.8895H46.825L47.1833 12.7621L57.8239 42.5331L52.0518 56.4307L51.6209 57.4684H52.7445H73.8207Z"
                fill="white" stroke="black" stroke-width="1.5"/>
            <path
                d="M18.9638 48.6724H19.7138V47.9224V30.978L22.335 48.0363L22.4327 48.6724H23.0763H32.3293H32.9704L33.0701 48.0391L35.6917 31.3941V47.9224V48.6724H36.4417H53.4055H54.1733L54.1553 47.9048L53.1272 3.92455L53.1101 3.19208H52.3774H30.4444H29.8062L29.7041 3.82202L27.7884 15.635L25.8728 3.82202L25.7707 3.19208H25.1325H3.02811H2.29544L2.27832 3.92455L1.2502 47.9048L1.23226 48.6724H2H18.9638Z"
                fill="white" stroke="black" stroke-width="1.5"/>
          </svg>

          <p className={"text-amber-50"}>나만의 플레이리스트를 만들어 보세요!</p>
          <div className={"h-[44px]"}></div>
          <div className="w-[234px] h-[52px] bg-violet-400 rounded-[15px] flex justify-center items-center">
            <div>내 리스트 만들기</div>
          </div>

          <div className={"h-[50px]"}></div>

          <div>
            <Swiper
                style={{marginLeft: '75px', marginRight: '75px'}}
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true} // 'true'로 변경
                slidesPerView={'auto'}
                initialSlide={0}
                spaceBetween={-190} // 0 이상의 값으로 변경
                coverflowEffect={{
                  rotate: 20,
                  stretch: 0,
                  depth: 200,
                  modifier: 3,
                  slideShadows: true,
                }}
                navigation={true}
                mousewheel={true}
                modules={[EffectCoverflow, Navigation, Mousewheel]}
                className="mySwiper w-full max-w-screen-md h-auto pt-12 pb-12 mx-auto flex items-center justify-center"
            >
              <SwiperSlide style={{width: '300px'}} className="flex items-center justify-center w-1/4">
                <img className="block w-1/2" src="https://swiperjs.com/demos/images/nature-1.jpg" alt={"1"}/>
              </SwiperSlide>
              <SwiperSlide style={{width: '300px'}} className="flex items-center justify-center w-1/4">
                <img className="block w-1/2" src="https://swiperjs.com/demos/images/nature-2.jpg" alt={"2"}/>
              </SwiperSlide>
              <SwiperSlide style={{width: '300px'}} className="flex items-center justify-center w-1/4">
                <img className="block w-1/2" src="https://swiperjs.com/demos/images/nature-3.jpg" alt={"3"}/>
              </SwiperSlide>
              <SwiperSlide style={{width: '300px'}} className="flex items-center justify-center w-1/4">
                <img className="block w-1/2" src="https://swiperjs.com/demos/images/nature-4.jpg" alt={"4"}/>
              </SwiperSlide>
              <SwiperSlide style={{width: '300px'}} className="flex items-center justify-center w-1/4">
                <img className="block w-1/2" src="https://swiperjs.com/demos/images/nature-6.jpg" alt={"5"}/>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
  );
};

export default HomeComponent;
