import merge from 'lodash-es/merge';

const authOpts = {
    headers: {},
};
const http = {
    authGet: (input, init = {}) => fetch(input, merge(init, authOpts)),
    get: (input, init = {}) => fetch(input, init),
};

export function storeApiPlugin (store) {
    store.watch(
        state => state.settings.jwt.token,
        jwt => {
            // set proper auth header on jwt state change, else remove it
            if (jwt) {
                authOpts.headers['Authorization'] = `Bearer ${jwt}`;
            } else {
                delete authOpts.headers['Authorization'];
            }
        },
    );
}

import UserApi from './userApi';
export const userApi = UserApi(http);
