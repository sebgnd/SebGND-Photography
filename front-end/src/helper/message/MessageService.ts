import Message from './Message';

export default class MessageService {
    static format(json: any): Message {
        return {
            id: json.id,
            seen: json.seen,
            content: json.content
        }
    }
}