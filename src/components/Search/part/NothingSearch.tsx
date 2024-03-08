interface NothingSearchDTO {
  text: string;
  type : string;
}

const NothingSearch: React.FC<NothingSearchDTO> = ({ text,type }) => {

  return (
    <div className={`font-PretendardLight text-[15px] text-slate-400 mx-auto p-4 text-center`} >
    `{text}` 에 대한 {type} 검색 결과 없습니다

    </div>
  )
}

export default NothingSearch;