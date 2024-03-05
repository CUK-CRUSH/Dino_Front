interface FooterProps {
  bgColor: string;
}

const Footer = ({ bgColor }: FooterProps) => {
  return (
    <footer className={`text-[#A1A1AA] text-xs text-center bg-${bgColor} p-4`}>
      <p>
        Instagram :{" "}
        <a
          target="_blank"
          href="https://www.instagram.com/mylist.official/"
          rel="noreferrer"
        >
          @mylist.official
        </a>
      </p>
      <p>
        Email :{" "}
        <a target="_blank" href="mailto:mylist.company@gmail.com">
          mylist.company@gmail.com
        </a>
      </p>
      <p>MyList Copyright ⓒ TEAM DINO. All Rights Reserved</p>
    </footer>
  );
};

export default Footer;
