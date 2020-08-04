import User from '../user/User';

export default interface Message {
    id: number;
    content: string;
    seen: boolean;
    user?: User;
}