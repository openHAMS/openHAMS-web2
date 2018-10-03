import themeSettings, { __types } from '@/components/settings/theme';
const {
    mutations: mutationTypes,
    actions: actionTypes,
} = __types;

describe('Theme settings Vuex module', () => {

    it('returns vuex module object', () => {
        const ts = themeSettings;
        expect(ts).toEqual(expect.objectContaining({
            state: expect.any(Object),
            getters: expect.any(Object),
            mutations: expect.any(Object),
            actions: expect.any(Object),
        }));
    });

    describe('state', () => {
        const { state } = themeSettings;

        describe.each`
            propName       | propDefault
            ${'darkTheme'} | ${false}
        `('$propName', ({ propName, propDefault }) => {

            it('exists', () => {
                expect(state).toHaveProperty(propName);
            });

            it(`has default value of "${propDefault}"`, () => {
                const property = state[propName];
                expect(property).toEqual(propDefault);
            });
        });
    });

    describe('getters', () => {
        const { getters } = themeSettings;

        describe('theme', () => {
            const { theme } = getters;

            it.each`
                darkTheme | expected
                ${false}  | ${'light'}
                ${true}   | ${'dark'}
            `('returns $expected if darkTheme is $darkTheme', ({ darkTheme, expected }) => {
                const state = { darkTheme };
                const result = theme(state);
                expect(result).toEqual(expected);
            });
        });
    });

    describe('mutations', () => {
        const { mutations } = themeSettings;

        describe('SET_THEME', () => {
            const { [mutationTypes.SET_THEME]: setTheme } = mutations;

            it.each`
                darkTheme | value      | expected
                ${false}  | ${'light'} | ${false}
                ${false}  | ${'dark'}  | ${true}
                ${true}   | ${'light'} | ${false}
                ${true}   | ${'dark'}  | ${true}
            `('fn($value) | [state.darkTheme]: $darkTheme -> $expected', ({ darkTheme, value, expected }) => {
                const state = { darkTheme };
                setTheme(state, value);
                expect(state).toEqual({ darkTheme: expected });
            });

            it('falls back to light theme', () => {
                const state = { darkTheme: true };
                setTheme(state, 'ranom value');
                expect(state).toEqual({ darkTheme: false });
            });
        });

    });

    describe('actions', () => {
        const { actions } = themeSettings;

        describe('$INIT', () => {
            const { [actionTypes.$INIT]: $initTheme } = actions;
            const context = {
                commit: jest.fn(),
            };

            it('calls commit exactly once', () => {
                $initTheme(context);
                expect(context.commit).toHaveBeenCalledTimes(1);
            });

            it('commits [SET_THEME] with "light"', () => {
                $initTheme(context);
                expect(context.commit).toHaveBeenCalledWith(mutationTypes.SET_THEME, 'light');
            });
        });

        describe('.toggleTheme', () => {
            const { toggleTheme } = actions;

            it('calls commit exactly once', () => {
                const context = {
                    commit: jest.fn(),
                    state: {
                        darkTheme: false,
                    },
                };
                toggleTheme(context);
                expect(context.commit).toHaveBeenCalledTimes(1);
            });

            it.each`
                darkTheme | expected
                ${false}  | ${'dark'}
                ${true}   | ${'light'}
            `('commits [SET_THEME] with $expected', ({ darkTheme, expected }) => {
                const context = {
                    commit: jest.fn(),
                    state: {
                        darkTheme,
                    },
                };
                toggleTheme(context);
                expect(context.commit).toHaveBeenCalledWith(mutationTypes.SET_THEME, expected);
            });
        });
    });
});
