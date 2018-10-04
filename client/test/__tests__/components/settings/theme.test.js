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

        describe.each`
            propName       | propDefault
            ${'darkTheme'} | ${false}
        `('$propName', ({ propName, propDefault }) => {

            it('exists', () => {
                expect(themeSettings.state).toHaveProperty(propName);
            });

            it(`has default value of "${propDefault}"`, () => {
                const property = themeSettings.state[propName];
                expect(property).toBe(propDefault);
            });
        });
    });

    describe('getters', () => {

        describe('.theme', () => {
            const { theme } = themeSettings.getters;

            it.each`
                darkTheme | expected
                ${false}  | ${'light'}
                ${true}   | ${'dark'}
            `('returns $expected if darkTheme is $darkTheme', ({ darkTheme, expected }) => {
                const state = { darkTheme };
                const result = theme(state);
                expect(result).toBe(expected);
            });
        });
    });

    describe('mutations', () => {

        describe('[SET_THEME]', () => {
            const { [mutationTypes.SET_THEME]: setTheme } = themeSettings.mutations;

            describe.each`
                value      | expected
                ${'light'} | ${false}
                ${'dark'}  | ${true}
            `('value of $value sets [darkTheme] to "$expected"', ({ value, expected }) => {
                it.each`
                    darkTheme
                    ${'false'}
                    ${'true'}
                `('if [darkTheme] is $darkTheme', ({ darkTheme }) => {
                    const state = { darkTheme };
                    setTheme(state, value);
                    expect(state).toMatchObject({ darkTheme: expected });
                });
            });

            it('falls back to "light" theme', () => {
                const state = { darkTheme: true };
                setTheme(state, 'random value');
                expect(state).toMatchObject({ darkTheme: false });
            });
        });

    });

    describe('actions', () => {

        describe('[$INIT]', () => {
            const { [actionTypes.$INIT]: $initTheme } = themeSettings.actions;
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

        describe('[TOGGLE_THEME]', () => {
            const { [actionTypes.TOGGLE_THEME]: toggleTheme } = themeSettings.actions;

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
