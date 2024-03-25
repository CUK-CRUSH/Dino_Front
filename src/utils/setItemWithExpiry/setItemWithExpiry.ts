function setItemWithExpiry(key : string, value : string | null, ttl :number) {
    const now = new Date();
    // 객체에 value와 만료 시간(expiry)을 저장합니다. ttl은 밀리초로 계산합니다.
    const item = {
        value: value,
        expiry: now.getTime() + ttl,
    };
    localStorage.setItem(key, JSON.stringify(item)); // 객체를 문자열로 변환하여 저장합니다.
}
export default setItemWithExpiry;