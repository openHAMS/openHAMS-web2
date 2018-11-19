import profileSettings, { __types } from '@/components/settings/profile';
const {
    mutations: mutationTypes,
} = __types;

describe('Profile settings Vuex module', () => {
    it('returns vuex module object', () => {
        const ps = profileSettings;
        expect(ps).toEqual(expect.objectContaining({
            state: expect.any(Object),
            getters: expect.any(Object),
            mutations: expect.any(Object),
        }));
    });

    describe('getters', () => {
        describe('.profile', () => {
            const state = {
                name: 'any name',
                photoUrl: 'any url',
            };
            it.each`
                isLoggedIn
                ${false}
                ${null}
            `('returns "$isLoggedIn" if [rootState.settings.isLoggedIn] is "$isLoggedIn"', ({ isLoggedIn }) => {
                const rootState = {
                    settings: {
                        isLoggedIn,
                    },
                };
                const result = profileSettings.getters.profile(state, {/* getters */}, rootState);
                expect(result).toBe(isLoggedIn);
            });

            it('returns profile object if [rootState.settings.isLoggedIn] is "true"', () => {
                const rootState = {
                    settings: {
                        isLoggedIn: true,
                    },
                };
                const result = profileSettings.getters.profile(state, {/* getters */}, rootState);
                const expected = {
                    name: expect.any(String),
                    photoUrl: expect.any(String),
                };
                expect(result).toEqual(expected);
            });
        });
    });

    describe('mutations', () => {
        describe('[SET_PROFILE]', () => {
            const { [mutationTypes.SET_PROFILE]: setProfileAuthenticated } = profileSettings.mutations;

            it.each`
                profilePropName | profilePropValue   | statePropName | expectedType
                ${'name'}       | ${'any name'}      | ${'name'}     | ${String}
                ${'photo'}      | ${'any photo url'} | ${'photoUrl'} | ${String}
            `('sets $statePropName to $expectedType.name', ({ profilePropName, profilePropValue, statePropName, expectedType }) => {
                const state = {};
                const profile = {
                    [profilePropName]: profilePropValue,
                };
                setProfileAuthenticated(state, profile);
                const expected = {
                    [statePropName]: expect.any(expectedType),
                };
                expect(state).toMatchObject(expected);
            });
        });

        describe('[CLEAR_PROFILE]', () => {
            const { [mutationTypes.CLEAR_PROFILE]: setProfileUnauthenticated } = profileSettings.mutations;

            it.each`
                profilePropName | statePropName
                ${'name'}       | ${'name'}
                ${'photo'}      | ${'photoUrl'}
            `('sets $statePropName to "null"', ({ profilePropName, statePropName }) => {
                const state = {};
                const profile = {
                    [profilePropName]: 'any value',
                };
                setProfileUnauthenticated(state, profile);
                const expected = { [statePropName]: null };
                expect(state).toMatchObject(expected);
            });
        });
    });
});
