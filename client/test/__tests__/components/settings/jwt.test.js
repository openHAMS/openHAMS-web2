import jwtSettings, { __types } from '@/components/settings/jwt';
const {
    constants: jsConsts,
    mutations: mutationTypes,
    actions: actionTypes,
} = __types;

jest.mock('js-cookie', () => ({
    get: jest.fn(),
    remove: jest.fn(),
}));
import Cookies from 'js-cookie';

jest.mock('jwt-decode', () => jest.fn());
import jwtDecode from 'jwt-decode';

describe('JWT settings Vuex Module', () => {
    it('returns vuex module ibject', () => {
        const js = jwtSettings;
        expect(js).toEqual(expect.objectContaining({
            state: expect.any(Object),
            getters: expect.any(Object),
            mutations: expect.any(Object),
            actions: expect.any(Object),
        }));
    });

    describe('state', () => {
        describe.each`
            propName       | propDefault
            ${'token'}     | ${null}
        `('$propName', ({ propName, propDefault }) => {
            it('exists', () => {
                expect(jwtSettings.state).toHaveProperty(propName);
            });

            it(`has default value of "${propDefault}"`, () => {
                const property = jwtSettings.state[propName];
                expect(property).toBe(propDefault);
            });
        });
    });

    describe('getters', () => {
        describe('.jwt', () => {
            it('returns [token]', () => {
                const state = {
                    token: new Object(),
                };
                const result = jwtSettings.getters.jwt(state);
                expect(result).toBe(state.token);
            });
        });

        describe('.jwtPayload', () => {
            it('returns decoded jwt token if token is truthy', () => {
                const state = {
                    token: 'any truthy',
                };
                const decodedJwt = new Object();
                jwtDecode.mockImplementationOnce(() => decodedJwt);
                const result = jwtSettings.getters.jwtPayload(state);
                expect(result).toBe(decodedJwt);
            });

            it.each`
                token
                ${false}
                ${null}
            `('returns falsy if token is $token', ({ token }) => {
                const state = {
                    token,
                };
                const result = jwtSettings.getters.jwtPayload(state);
                expect(result).toBeFalsy();
            });
        });
    });

    describe('mutations', () => {
        describe('[CLEAR_JWT]', () => {
            const { [mutationTypes.CLEAR_JWT]: clearJwt } = jwtSettings.mutations;

            it('sets [token] to null', () => {
                const state = { token: 'anything' };
                clearJwt(state);
                expect(state).toMatchObject({ token: null });
            });

            it('calls localStorage.removeItem', () => {
                const state = { token: 'anything' };
                clearJwt(state);
                expect(localStorage.removeItem).toHaveBeenCalledWith(jsConsts.JWT_LOCALSTORAGE);
            });
        });

        describe('[SET_JWT]', () => {
            const { [mutationTypes.SET_JWT]: setJwt } = jwtSettings.mutations;

            it('sets [token] to specified value', () => {
                const state = { token: null };
                const newToken = 'any token';
                setJwt(state, newToken);
                expect(state).toMatchObject({ token: newToken });
            });

            it('calls localStorage.setItem', () => {
                const state = { token: null };
                const newToken = 'any token';
                setJwt(state, newToken);
                expect(localStorage.setItem).toHaveBeenCalledWith(jsConsts.JWT_LOCALSTORAGE, newToken);
                localStorage.clear();
            });
        });
    });

    describe('actions', () => {
        describe('CLEAR_JWT', () => {
            const { [actionTypes.CLEAR_JWT]: clearJwt } = jwtSettings.actions;

            it('commits [CLEAR_JWT]', () => {
                const context = {
                    commit: jest.fn(),
                };
                clearJwt(context);
                expect(context.commit).toHaveBeenCalledTimes(1);
            });
        });

        describe('LOAD_JWT', () => {
            const { [actionTypes.LOAD_JWT]: loadJwt } = jwtSettings.actions;
            const context = {
                commit: jest.fn(),
            };

            it(`calls Cookies.get with "${jsConsts.JWT_COOKIE}"`, () => {
                loadJwt(context);
                expect(Cookies.get).toHaveBeenCalledTimes(1);
                expect(Cookies.get).toHaveBeenCalledWith(jsConsts.JWT_COOKIE);
            });

            it(`commits [SET_JWT] with token from cookie if there is any cookie named "${jsConsts.JWT_COOKIE}"`, () => {
                const cookieToken = 'any cookie token';
                Cookies.get.mockImplementationOnce(() => cookieToken);
                loadJwt(context);
                expect(context.commit).toHaveBeenCalledTimes(1);
                expect(context.commit).toHaveBeenCalledWith(mutationTypes.SET_JWT, cookieToken);
            });

            it(`calls Cookies.remove with "${jsConsts.JWT_COOKIE}"`, () => {
                Cookies.get.mockImplementationOnce(() => 'any cookie token');
                loadJwt(context);
                expect(Cookies.remove).toHaveBeenCalledTimes(1);
                expect(Cookies.remove).toHaveBeenCalledWith(jsConsts.JWT_COOKIE);
            });

            it(`calls localStorage.getItem with "${jsConsts.JWT_LOCALSTORAGE}" if no cookie named "${jsConsts.JWT_COOKIE}"`, () => {
                Cookies.get.mockImplementationOnce(() => null);
                loadJwt(context);
                expect(localStorage.getItem).toHaveBeenCalledTimes(1);
                expect(localStorage.getItem).toHaveBeenCalledWith(jsConsts.JWT_LOCALSTORAGE);
            });

            it(`commits [SET_JWT] with token from localstorage if there is no cookie named "${jsConsts.JWT_COOKIE}"`, () => {
                Cookies.get.mockImplementationOnce(() => null);
                const storageToken = 'any storage token';
                localStorage.setItem(jsConsts.JWT_LOCALSTORAGE, storageToken);
                loadJwt(context);
                expect(context.commit).toHaveBeenCalledTimes(1);
                expect(context.commit).toHaveBeenCalledWith(mutationTypes.SET_JWT, storageToken);
                localStorage.clear();
            });

            it('commits [CLEAR_JWT] if there are no available cookie or localstorage values', () => {
                Cookies.get.mockImplementationOnce(() => null);
                localStorage.clear();
                loadJwt(context);
                expect(context.commit).toHaveBeenCalledTimes(1);
                expect(context.commit).toHaveBeenCalledWith(mutationTypes.CLEAR_JWT);
            });
        });
    });
});
