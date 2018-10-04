import profileSettings, { __types } from '@/components/settings/profile';
const {
    mutations: mutationTypes,
    actions: actionTypes,
} = __types;

describe('Profile settings Vuex module', () => {

    it('returns vuex module object', () => {
        const ps = profileSettings;
        expect(ps).toEqual(expect.objectContaining({
            state: expect.any(Object),
            getters: expect.any(Object),
            mutations: expect.any(Object),
            actions: expect.any(Object),
        }));
    });

    describe('getters', () => {

        describe('.profile', () => {
            const { profile } = profileSettings.getters;

            it.each`
                isLoggedIn
                ${false}
                ${null}
            `('returns "$isLoggedIn" if [isLoggedIn] is "$isLoggedIn"', ({ isLoggedIn }) => {
                const state = {
                    isLoggedIn,
                };
                const result = profile(state);
                expect(result).toBe(isLoggedIn);
            });

            it('returns profile object if [isLoggedIn] is "true"', () => {
                const state = {
                    isLoggedIn: true,
                    name: 'any name',
                    photoUrl: 'any url',
                };
                const result = profile(state);
                const expected = {
                    name: expect.any(String),
                    photoUrl: expect.any(String),
                };
                expect(result).toEqual(expected);
            });
        });
    });

    describe('mutations', () => {

        describe('[LOGGED_IN]', () => {
            const { [mutationTypes.LOGGED_IN]: loggedIn } = profileSettings.mutations;

            it('sets [isLoggedIn] to "true"', () => {
                const state = { isLoggedIn: false };
                const profile = {
                    name: 'any name',
                    photo: 'any photo url',
                };
                loggedIn(state, profile);
                expect(state).toMatchObject({ isLoggedIn: true });
            });

            it.each`
                profilePropName | profilePropValue   | statePropName | expectedType
                ${'name'}       | ${'any name'}      | ${'name'}     | ${String}
                ${'photo'}      | ${'any photo url'} | ${'photoUrl'} | ${String}
            `('sets $statePropName to $expectedType.name', ({ profilePropName, profilePropValue, statePropName, expectedType }) => {
                const state = {};
                const profile = {
                    [profilePropName]: profilePropValue,
                };
                loggedIn(state, profile);
                const expected = { [statePropName]: expect.any(expectedType) };
                expect(state).toMatchObject(expected);
            });
        });

        describe('[NOT_LOGGED_IN]', () => {
            const { [mutationTypes.NOT_LOGGED_IN]: notLoggedIn } = profileSettings.mutations;

            it('sets [isLoggedIn] to "false"', () => {
                const state = { isLoggedIn: true };
                const profile = {
                    name: 'any name',
                    photo: 'any photo url',
                };
                notLoggedIn(state, profile);
                expect(state).toMatchObject({ isLoggedIn: false });
            });

            it.each`
                profilePropName | statePropName
                ${'name'}       | ${'name'}
                ${'photo'}      | ${'photoUrl'}
            `('sets $statePropName to "null"', ({ profilePropName, statePropName }) => {
                const state = {};
                const profile = {
                    [profilePropName]: 'any value',
                };
                notLoggedIn(state, profile);
                const expected = { [statePropName]: null };
                expect(state).toMatchObject(expected);
            });
        });
    });

    // TODO: more profile tests
});
