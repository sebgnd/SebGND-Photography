import HttpResponse from './HttpResponse';

export default class HttpRequest {
    static async get(url: string): Promise<HttpResponse> {
        try {
            return await this.send(url);
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
            return await this.send(url, options);
        } catch (err) {
            throw err;
        }
    }
 
    private static async send(url: string, options?: RequestInit): Promise<HttpResponse> {
        try {
            const response: Response = await fetch(url, options);
            const data = await response.json();

            if (response.ok) {
                const { status } = response;
                return {
                    status,
                    data
                };
            } else {
                throw new Error(data.error.message);
            }
        } catch (err) {
            throw err;
        }
    }
}