interface QueryTextDTO {
  query: string;
}

const QueryText: React.FC<QueryTextDTO> = ({ query }) => {

  return (
    <div>
      <div className='text-[18px] font-PretendardSemiBold text-center'>'{query}' 검색 결과</div>

    </div>
  )
}

export default QueryText;