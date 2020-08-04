import HttpRequest from '../http/HttpRequest';
import HttpResponse from '../http/HttpResponse';
import MessageService from './MessageService';

export default class MessageApi {
    static async sendMessage(message: string, name: string) {
        try {
            const body = {
                message,
                name
            }
            const response: HttpResponse = await HttpRequest.post('http://localhost:8000/messages', body);
            return MessageService.format(response.data);

        } catch (err) {
            throw err;
        }
    }
}