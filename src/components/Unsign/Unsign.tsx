import React, { useState } from 'react';
import Footer from "@components/Layout/footer";

const Unsign = () => {
    const [input, setInput] = useState('');
    const [buttonColor, setButtonColor] = useState('#D9D9D9');

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput(event.target.value);
        setButtonColor(event.target.value ? '#F4675B' : '#D9D9D9');
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Send the input data to an email or another service
        console.log(input);
    };

    return (
        <div className="bg-gray-100 font-pretendard">
            <form onSubmit={handleSubmit} className="bg-gray-100 p-4">
                <h2 className="text-2xl font-bold mb-4">계정 삭제</h2>
                <p className="mb-2">계정이 삭제될 경우</p>
                <p className="mb-2">기존 계정 정보는 즉시 삭제되어</p>
                <p className="mb-4">복구할 수 없습니다</p>
                <p className="mb-4">계정 삭제하려는 이유를 알려주세요</p>
                <textarea onChange={handleInputChange} value={input} required
                          className="border rounded p-2 w-full mb-4"/>
                <button style={{backgroundColor: buttonColor}} type="submit" className="px-4 py-2 rounded text-white">
                    계정 삭제
                </button>
            </form>
            <Footer bgColor="bg-gray-100"/>
        </div>
    );
};

export default Unsign;