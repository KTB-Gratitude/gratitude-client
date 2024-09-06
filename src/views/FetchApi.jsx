const API_BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const getAuthToken = () => {
    // 토큰을 로컬 스토리지나 쿠키에서 가져오는 로직
    return localStorage.getItem('token');
};

const setAuthToken = (token) => {
    // 토큰을 로컬 스토리지나 쿠키에 저장하는 로직
    localStorage.setItem('token', token);
};

const refreshToken = async () => {
    // 토큰 재발급 요청 로직
    const response = await fetch(`${API_BASE_URL}/api/v1/users/reissue`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken: getAuthToken() }),
    });
    const data = await response.json();
    setAuthToken(data.accessToken);
    return data.accessToken;
};

export const sendDiaryRequest = async (diaryData) => {
    try {
        let response = await fetch(`${API_BASE_URL}/diaries`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getAuthToken()}`,
            },
            body: JSON.stringify(diaryData),
        });

        if (response.status === 401) {
            // 토큰이 만료되었을 때 토큰 재발급 시도
            const newToken = await refreshToken();

            // 재발급된 토큰을 사용해 다시 요청
            response = await fetch(`${API_BASE_URL}/api/v1/diaries`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${newToken}`,
                },
                body: JSON.stringify(diaryData),
            });
        }

        if (!response.ok) {
            throw new Error('Failed to send diary data');
        }

        return await response.json();
    } catch (error) {
        console.error('Error during API request:', error);
        throw error;
    }
};
