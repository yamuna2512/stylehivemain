import API, { LOGIN_USER_KEY } from '../../API';
import { signInAction, signInError, signUpAction, signUpError, signUserStoreAction } from './actions';

const api = new API();

export const fetchUserFromLocalStorage = () => {
    return (dispatch) => {
        const userJSON = localStorage.getItem(LOGIN_USER_KEY);

        if (userJSON) {
            const user = JSON.parse(userJSON);
            if (user.token !== "") {
                dispatch(signUserStoreAction(user));
            }
        }
    };
};

export const signUp = (data = {}, onSuccess = null) => {
    return async (dispatch) => {
        return api.signUp(data)
            .then((response) => {
                localStorage.setItem(LOGIN_USER_KEY, JSON.stringify(response));
                dispatch(signUpAction(response));
                if (onSuccess) onSuccess();
            })
            .catch((error) => {
                const errorData = error.response?.data || { message: 'Sign-up failed. Please try again.' };
                dispatch(signUpError(errorData));
            });
    };
};

export const signIn = (data = {}, onSuccess = null) => {
    return async (dispatch) => {
        return api.signIn(data)
            .then((response) => {
                localStorage.setItem(LOGIN_USER_KEY, JSON.stringify(response));
                dispatch(signInAction(response));
                if (onSuccess) onSuccess();
            })
            .catch((error) => {
                const errorData = error.response?.data || { message: 'Sign-in failed. Please try again.' };
                dispatch(signInError(errorData));
            });
    };
};
