import themeSettings from '@client/components/settings/theme';

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

    describe('.state', () => {
        const { state } = themeSettings;

        describe.each`
            propName       | propType    | propDefault
            ${'darkTheme'} | ${Boolean}  | ${false}
        `('.$propName', ({ propName, propType, propDefault }) => {
            const property = state[propName];

            it(`has type of "${propType.name}"`, () => {
                expect(property).toEqual(expect.any(propType));
            });

            it(`has default value of "${propDefault}"`, () => {
                expect(property).toEqual(propDefault);
            });
        });
    });

    describe('.getters', () => {
        const { getters } = themeSettings;

        describe('.isDarkTheme', () => {
            const { isDarkTheme } = getters;

            it.each([false, true])('returns darkTheme', (darkTheme) => {
                const state = { darkTheme };
                const result = isDarkTheme(state);
                expect(result).toEqual(darkTheme);
            });
        });

        describe('.theme', () => {
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

    describe('.mutations', () => {
        const { mutations } = themeSettings;

        describe('.setTheme', () => {
            const { setTheme } = mutations;

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

        describe('.toggleTheme', () => {
            const { toggleTheme } = mutations;

            it.each`
                darkTheme | expected
                ${false}  | ${true}
                ${true}   | ${false}
            `('fn($darkTheme): [state.darkTheme] $darkTheme -> $expected', ({ darkTheme, expected }) => {
                const state = { darkTheme };
                toggleTheme(state);
                expect(state).toEqual({ darkTheme: expected });
            });
        });
    });

    describe('.actions', () => {
        const { actions } = themeSettings;

        describe('.$initTheme', () => {
            const { $initTheme } = actions;
            const context = {
                commit: jest.fn(),
            };

            it('calls commit exactly once', () => {
                $initTheme(context);
                expect(context.commit).toHaveBeenCalledTimes(1);
            });

            it('commits "setTheme" with "light"', () => {
                $initTheme(context);
                expect(context.commit).toHaveBeenCalledWith('setTheme', 'light');
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
            `('commits "setTheme" with $expected', ({ darkTheme, expected }) => {
                const context = {
                    commit: jest.fn(),
                    state: {
                        darkTheme,
                    },
                };
                toggleTheme(context);
                expect(context.commit).toHaveBeenCalledWith('setTheme', expected);
            });
        });
    });
});
