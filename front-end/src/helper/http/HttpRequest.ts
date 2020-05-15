export default class HttpRequest {
    static async getData(url: string): Promise<any> {
        try {
            const response: Response = await fetch(url);
            if (response.status === 200) {
                const data = await response.json();
                if (data.error) {
                    throw new Error(data.error.message);
                }
                return data;
            }
            throw new Error('Something unexpected happened. Please try again later.'); 
        } catch (e) {
            throw e;
        }
    }
}