import { AUTHORIZED } from './actionTypes';

export const authorized = (auth) => {
    return {
        type: AUTHORIZED,
        authorized: auth
    }
}