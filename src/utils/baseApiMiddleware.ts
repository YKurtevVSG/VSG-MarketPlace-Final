import { AnyAction, Dispatch, isRejectedWithValue } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import { toastifyCustomStyles } from "./toastifyCustomStyles";

export const baseApiMiddleware = () => (next: Dispatch<AnyAction>) => (action: AnyAction) => {
    if (isRejectedWithValue(action as AnyAction)) {
        if (action.payload.status === 401) {
            toast.error('Your session has expired! Please logout and login again!', {
                toastId: 'expired-session',
                ...toastifyCustomStyles
            });
        } else {
            toast.error(`Oops! ${action.payload.data[0]['Message']} 🙁`, toastifyCustomStyles);
        }
    }

    return next(action);
}