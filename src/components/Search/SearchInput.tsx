import React, { useState } from 'react';
import search from '@assets/Search/search.svg';
import { useNavigate } from 'react-router-dom';

const SearchInput: React.FC = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    navigate(`?query=${searchTerm}`);
  };

  return (
    <form onSubmit={handleSubmit} >
      <div className="w-full mb-4 flex flex-col items-center relative focus:border-slate-300">
        <input
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder="검색어를 입력하세요"
          className="w-[360px] h-[50px] bg-[#D9D9D9] bg-opacity-20"
        />
        <img onClick={handleSubmit} src={search} alt="이미지 설명" className="absolute right-10 top-4 cursor-pointer" />
      </div>
    </form>
  );
};

export default SearchInput;