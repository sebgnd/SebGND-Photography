import User from '../user/User';

export default interface Message {
    content: string;
    seen: boolean;
    user: User;
}