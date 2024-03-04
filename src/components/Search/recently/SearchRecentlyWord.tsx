import useDecodedJWT from '@hooks/useDecodedJWT';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Data {
  term: string;
  date: string;
}

interface setOpenSearchRecentlyDTO{
  setOpenSearchRecently : React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchRecentlyWord: React.FC<setOpenSearchRecentlyDTO> = ({setOpenSearchRecently}) => {
  const [searchTerms, setSearchTerms] = useState<Data[]>([]);

  // id값
  let token = localStorage.getItem('refreshToken');
  let decodedToken = useDecodedJWT(token);
  let userId: string ;
  if (decodedToken) {
    userId = decodedToken.sub;
  } else {
    // decodedToken이 null이면 적절한 기본값을 설정합니다.
    userId = 'defaultUserId';
  }

  const localSearchTerms = localStorage.getItem(`searchTerms_${userId}`);

  const navigate = useNavigate();

  useEffect(() => {
    const storedTerms = localSearchTerms;
    if (storedTerms) {
      setSearchTerms(JSON.parse(storedTerms));
    }
  }, [localSearchTerms]);

  // 날짜변환
  function formatDate(dateString: string) {
    const date = new Date(dateString);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const formattedDate = `${month}. ${day}`;
    return formattedDate;
  }

  // 각각 삭제
  function deleteSearchWord(index : number){
    let search = JSON.parse(localStorage.getItem(`searchTerms_${userId}`) || '[]');
    if(index < search.length){
      search.splice(index,1)
    }
    localStorage.setItem(`searchTerms_${userId}`,JSON.stringify(search));
    setSearchTerms(search)
  }

  // 검색어이동
  const searchQuery = (query : string) => {
    navigate(`?query=${query}`);
  }

  return (
    <div className="w-full h-full relative flex flex-col justify-start scrollbar-hide overflow-scroll font-PretendardMedium">
      
      <p className={`p-4 font-PretendardBold underline underline-offset-4	`}>최근검색어</p>
      {searchTerms.map((item, index) => (
        <div className={`flex justify-between p-2`} key={index}>
         <div onClick={() => {
  searchQuery(item.term);
  setOpenSearchRecently(false);
}}>
  <span className='ml-4'>
    {item.term} 
  </span>
</div>
          <div>
            <span className='mr-4'>
              {formatDate(item.date)}
            </span>
            <span className='mr-4' onClick={()=>{deleteSearchWord(index)}}>
              x
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchRecentlyWord;