import { useState } from "react";

const useSearchTerms = (userId?: string) => {
  const [searchTerms, setSearchTerms] = useState<any[]>([]);

  // 검색어를 로컬 스토리지에 저장하고 상태를 업데이트하는 함수
  const addSearchTerm = (term: string | undefined) => {
    // 로컬 스토리지에서 검색어 목록을 불러옴
    let storedTerms = localStorage.getItem(`searchTerms_${userId}`);
    if (!storedTerms) {
      storedTerms = '[]';
    }
    let terms = JSON.parse(storedTerms);

    // 새로운 검색어를 목록에 추가하는 로직
    const date = new Date().toISOString();
    const existingIndex = terms.findIndex((item: any) => item.term === term);
    if (existingIndex > -1) {
      terms.splice(existingIndex, 1);
    }

    terms.unshift({ term, date });

    if (terms.length > 10) {
      terms.pop();
    }

    // 변경된 검색어 목록을 로컬 스토리지와 상태에 반영
    localStorage.setItem(`searchTerms_${userId}`, JSON.stringify(terms));
    setSearchTerms(terms);
  }
  
 
  return { searchTerms, addSearchTerm };
}

export default useSearchTerms;