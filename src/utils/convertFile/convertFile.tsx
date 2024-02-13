async function convertUrlToBlobFile(url: string) {
	// 주어진 URL에서 Blob 객체를 가져옵니다.
	const response = await fetch(url);
	const blob = await response.blob();

	// Blob 객체를 File 객체로 변환합니다.
	const file = new File([blob], url, { type: "image/png" });

	return file;
}

export default convertUrlToBlobFile;