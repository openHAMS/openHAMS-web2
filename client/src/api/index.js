const tokenHeader = {
    headers: {},
};
const http = {
    authGet: (input, init = {}) => fetch(input, { ...init, ...tokenHeader }),
    get: (input, init = {}) => fetch(input, { ...init }),
};

export function storeApiPlugin (store) {
    store.watch(
        state => state.settings.jwt.value,
        jwt => {
            // set proper auth header on jwt state change, else remove it
            if (jwt) {
                tokenHeader.headers['Authorization'] = `Bearer ${jwt}`;
            } else {
                delete tokenHeader.headers['Authorization'];
            }
        },
    );
}

import UserApi from './userApi.js';
export const userApi = UserApi(http);
