import { useState, useEffect } from "react";

const useSearchTerms = (userId: string) => {
  const [searchTerms, setSearchTerms] = useState<any[]>([]);

  // 로컬 스토리지에서 검색어를 불러오는 함수
  const loadSearchTerms = () => {
    let storedTerms = localStorage.getItem(`searchTerms_${userId}`);
    if (!storedTerms) {
      storedTerms = '[]';
    }
    setSearchTerms(JSON.parse(storedTerms));
  }

  // 검색어를 로컬 스토리지에 저장하는 함수
  const addSearchTerm = (term: string | undefined) => {
    const date = new Date().toISOString();
    const terms = [...searchTerms];

    const existingIndex = terms.findIndex((item: any) => item.term === term);
    if (existingIndex > -1) {
      terms.splice(existingIndex, 1);
    }

    terms.unshift({ term, date });

    if (terms.length > 10) {
      terms.pop();
    }

    localStorage.setItem(`searchTerms_${userId}`, JSON.stringify(terms));
    setSearchTerms(terms);
  }

  // 컴포넌트가 마운트되거나 userId가 변경될 때마다 검색어를 불러옴
  useEffect(() => {
    loadSearchTerms();
  }, [userId]);

  return { searchTerms, addSearchTerm };
}

export default useSearchTerms;