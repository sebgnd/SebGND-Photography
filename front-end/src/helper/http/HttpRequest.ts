import HttpResponse from './HttpResponse';

export default class HttpRequest {
    static async get(url: string): Promise<HttpResponse> {
        try {
            const response: Response = await fetch(url);
            const data = await response.json();
            const { status } = response;

            return {
                status,
                data
            };
        } catch (err) {
            throw err;
        }
    }

    static async post(url: string, body: any): Promise<HttpResponse> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options: RequestInit = {
            method: 'POST',
            body: JSON.stringify(body),
            headers
        };

        try {
            const response: Response = await fetch(url, options);
            const data = await response.json();
            const { status } = response;
    
            return {
                status,
                data
            }; 
        } catch (err) {
            throw err;
        }
    }
}