import merge from 'lodash-es/merge';

const postOpts = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
};
const authOpts = {
    headers: {},
};
const http = {
    authGet: (input, init = {}) => fetch(input, merge(init, authOpts)),
    authPostJson: (input, data, init = {}) => fetch(input, merge(postOpts, init, authOpts, { body: JSON.stringify(data) })),
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

import SettingsApi from './settingsApi';
export const settingsApi = SettingsApi(http);
