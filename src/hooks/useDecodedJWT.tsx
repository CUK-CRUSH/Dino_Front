import base64 from 'base-64';

export default function useDecodedJWT(token: any) {

  if (!token) {
    // Handle the case where the token is empty or not available
    return null;
  }

  const payload = token.substring(token.indexOf('.') + 1, token.lastIndexOf('.'));
  try {
    const decodedPayload = JSON.parse(base64.decode(payload));
    return decodedPayload;
  } catch (error) {
    // Handle the case where decoding the payload fails
    console.error('Error decoding JWT token payload:', error);
    return null;
  }

}
