function getItemWithExpiry(key: string) {
    const itemStr = localStorage.getItem(key);
    // 저장된 항목이 없으면 null을 반환합니다.
    if (!itemStr) {
        return null;
    }
    const item = JSON.parse(itemStr);
    const now = new Date();
    // 현재 시간이 저장된 만료 시간보다 크면, 만료된 것으로 간주하고 항목을 삭제한 후 null을 반환합니다.
    if (now.getTime() > item.expiry) {
        localStorage.removeItem(key);
        return null;
    }
    return item.value; // 만료되지 않았다면, 저장된 값을 반환합니다.
}
export default getItemWithExpiry;