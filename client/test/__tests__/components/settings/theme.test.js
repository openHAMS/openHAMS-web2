import themeSettings, {
    mutationTypes,
    actionTypes,
} from '@/components/settings/theme';

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
        describe('.darkTheme', () => {
            it.each`
                darkTheme
                ${false}
                ${true}
            `('returns $darkTheme if darkTheme is $darkTheme', ({ darkTheme }) => {
                const state = { darkTheme };
                const result = themeSettings.getters.darkTheme(state);
                expect(result).toBe(darkTheme);
            });
        });
    });

    describe('mutations', () => {
        describe('[SET_DARK_THEME]', () => {
            const { [mutationTypes.SET_DARK_THEME]: setDarkTheme } = themeSettings.mutations;

            describe.each`
                value      | expected
                ${false} | ${false}
                ${true}  | ${true}
            `('value of $value sets [darkTheme] to "$expected"', ({ value, expected }) => {
                it.each`
                    darkTheme
                    ${'false'}
                    ${'true'}
                `('if [darkTheme] is $darkTheme', ({ darkTheme }) => {
                    const state = { darkTheme };
                    setDarkTheme(state, value);
                    expect(state).toMatchObject({ darkTheme: expected });
                });
            });

            it('falls back to "light" theme', () => {
                const state = { darkTheme: true };
                setDarkTheme(state, 'random value');
                expect(state).toMatchObject({ darkTheme: false });
            });
        });

    });

    describe('actions', () => {
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
                ${false}  | ${true}
                ${true}   | ${false}
            `('commits [SET_DARK_THEME] with $expected', ({ darkTheme, expected }) => {
                const context = {
                    commit: jest.fn(),
                    state: {
                        darkTheme,
                    },
                };
                toggleTheme(context);
                expect(context.commit).toHaveBeenCalledWith(mutationTypes.SET_DARK_THEME, expected);
            });
        });
    });
});
