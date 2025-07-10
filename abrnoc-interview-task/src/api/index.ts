const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


const apiRequest = async (url: string, options: RequestInit = {}) => {
  const response = await fetch(`${API_BASE_URL}${url}`, options);

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  return await response.json();
}

export default apiRequest;
