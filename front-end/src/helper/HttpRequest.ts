export default class HttpRequest {
    static async getData(url: string): Promise<any | null> {
        try {
            const response: Response = await fetch(url);
            if (response.status === 200) {
                return await response.json();
            }
            return null; 
        } catch (e) {
            throw e;
        }
    }
}