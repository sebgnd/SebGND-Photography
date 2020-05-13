export default class HttpRequest {
    async getData(url: string): Promise<any | null> {
        const response: Response = await fetch(url);
        if (response.status === 200) {
            return await response.json();
        }
        return null;
    }
}