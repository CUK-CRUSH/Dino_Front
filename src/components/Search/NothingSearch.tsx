interface NothingSearchDTO {
  text: string;
}

const NothingSearch: React.FC<NothingSearchDTO> = ({ text }) => {

  return (
    <div>
      {text} 가 없습니다.

    </div>
  )
}

export default NothingSearch;