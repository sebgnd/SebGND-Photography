import { Action, AnyAction } from '@reduxjs/toolkit';

export const isActionPending = <(action: AnyAction) => action is Action<string>>((action: AnyAction) => {
    const { type } = action as Action<string>;
    return type.endsWith('pending');
})


export const isActionRejected = <(action: AnyAction) => action is Action<string>>((action: AnyAction) => {
    const { type } = action as Action<string>;
    return type.endsWith('rejected');
})


export const isActionFulfilled = (action: AnyAction): action is Action<string> => {
    const { type } = action as Action<string>;
    return type.endsWith('fulfilled');
}