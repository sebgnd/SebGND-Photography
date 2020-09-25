import { createAsyncThunk } from '@reduxjs/toolkit';
import Message from '../../../helper/message/Message';
import MessageApi from '../../../helper/message/MessageApi';
import { PostMessageParams } from './types';

export const postContactMessage = createAsyncThunk(
    'contact/postContactMessage',
    async ({ name, message }: PostMessageParams): Promise<Message> => {
        const messageSent = await MessageApi.sendMessage(message, name);
        return messageSent;
    }
)
