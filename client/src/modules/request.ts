export const requestToApi = async (url, method = 'GET', body = null, headers = {}) => {
    try {
        if (body) {
            body = JSON.stringify(body);
            headers['Content-Type'] = 'application/json';
            headers['Accept'] = 'application/json';
        }
        const response = await fetch(url, {method, body, headers});
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong')
        }
        return data;
    } catch (e) {
        throw e;
    }
};
