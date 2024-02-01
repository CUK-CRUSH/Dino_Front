interface MusicTitleProps {
  musicList: any;
}

export const MusicLength: React.FC<MusicTitleProps> = ({ musicList }) => {
  return (
    <span className="flex justify-center my-4 text-[15px] font-bold leading-5">
      {musicList.data?.length}곡
    </span>
  );
};
