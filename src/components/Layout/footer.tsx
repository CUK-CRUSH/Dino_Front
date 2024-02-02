interface FooterProps {
  bgColor: string;
}

const Footer = ({ bgColor }: FooterProps) => {
  return (
    <footer className={`text-[#A1A1AA] text-xs text-center bg-${bgColor} p-4`}>
      <p className="mb-2">ASK</p>
      <p className="mb-2">Instagram : @mylist.official</p>
      <p className="mb-2">Email : mylist.company@gmail.com</p>
      <p>MyList Copyright ⓒ TEAM DINO. All Rights Reserved</p>
    </footer>
  );
};

export default Footer;
