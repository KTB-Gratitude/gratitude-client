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
        method: 'GET',
    });

    if (!response.ok) {
        throw new Error('Failed to refresh token');
    }

    const data = await response.json();
    setAuthToken(data.accessToken);
    return data.accessToken;
};

// GET 요청 처리 함수
export const fetchGet = async (endpoint) => {
    try {
        let response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${getAuthToken()}`,
            },
        });

        // 401 Unauthorized 응답 처리
        if (response.status === 401) {
            const responseData = await response.json();

            // 서버에서 ACCESS_TOKEN_EXPIRED Enum의 코드가 detailCode 4013일 경우에만 재발급 시도
            if (responseData.detailCode === 4013) {
                const newToken = await refreshToken();

                // 새로 발급받은 토큰으로 다시 요청
                response = await fetch(`${API_BASE_URL}${endpoint}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${newToken}`,
                    },
                });
            }
        }

        // 응답이 정상적인 경우
        if (response.ok) {
            const responseText = await response.text();
            if (responseText) {
                return JSON.parse(responseText);
            } else {
                return { message: 'Request successful with no content' };
            }
        }

        throw new Error('Failed to fetch data');
    } catch (error) {
        console.error('Error during GET request:', error);
        throw error;
    }
};

// POST 요청 처리 함수
export const fetchPost = async (data, endpoint) => {
    try {
        let response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getAuthToken()}`,
            },
            body: JSON.stringify(data),
        });

        // 401 Unauthorized 응답 처리
        if (response.status === 401) {
            const responseData = await response.json();

            // 서버에서 ACCESS_TOKEN_EXPIRED Enum의 코드가 detailCode 4013일 경우에만 재발급 시도
            if (responseData.detailCode === 4013) {
                const newToken = await refreshToken();

                // 새로 발급받은 토큰으로 다시 요청
                response = await fetch(`${API_BASE_URL}${endpoint}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${newToken}`,
                    },
                    body: JSON.stringify(data),
                });
            }
        }

        // 응답이 정상적인 경우
        if (response.ok) {
            const responseText = await response.text();
            if (responseText) {
                return JSON.parse(responseText);
            } else {
                return { message: 'Request successful with no content' };
            }
        }

        throw new Error('Failed to send data');
    } catch (error) {
        console.error('Error during POST request:', error);
        throw error;
    }
};
