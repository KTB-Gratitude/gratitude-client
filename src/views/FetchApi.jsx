const API_BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const getAuthToken = () => {
    // 토큰을 로컬 스토리지에서 가져오는 로직
    return localStorage.getItem('accessToken');
};

const setAuthToken = (token) => {
    // 토큰을 로컬 스토리지에 저장하는 로직
    localStorage.setItem('accessToken', token);
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

    if (!response.ok) {
        throw new Error('Failed to refresh token');
    }

    const data = await response.json();
    setAuthToken(data.accessToken);
    return data.accessToken;
};

export const sendDiaryRequest = async (diaryData) => {
    try {
        let response = await fetch(`${API_BASE_URL}/api/v1/diaries`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getAuthToken()}`,
            },
            body: JSON.stringify(diaryData),
        });

        // 401 Unauthorized 응답 처리
        if (response.status === 401) {
            const responseData = await response.json();

            // 서버에서 ACCESS_TOKEN_EXPIRED Enum의 코드가 detailCode 4013일 경우에만 재발급 시도
            if (responseData.detailCode === 4013) {
                const newToken = await refreshToken();

                // 새로 발급받은 토큰으로 다시 요청
                response = await fetch(`${API_BASE_URL}/api/v1/diaries`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${newToken}`,
                    },
                    body: JSON.stringify(diaryData),
                });
            }
        }

        // 정상적인 응답(200-299 상태 코드)은 본문이 없을 수 있으므로 바로 리턴
        if (response.ok) {
            return { message: 'Request successful' };
        }

        // 에러 응답일 때만 본문 파싱 시도
        const responseText = await response.text();
        if (responseText) {
            return JSON.parse(responseText);
        } else {
            throw new Error('Request failed and no response body returned');
        }

    } catch (error) {
        console.error('Error during API request:', error);
        throw error;
    }
};
