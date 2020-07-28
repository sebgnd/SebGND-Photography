import HttpRequest from '../http/HttpRequest';
import HttpResponse from '../http/HttpResponse';

export default class MessageService {
    static async sendMessage(message: string, name: string) {
        try {
            const body = {
                message,
                name
            }
            const response: HttpResponse = await HttpRequest.post('http://localhost:8000/messages', body);
            return response.data;

        } catch (err) {
            throw err;
        }
    }
}