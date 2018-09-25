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

    // describe.each`
    //     childName      | properties
    //     ${'state'}     | ${[
    //                            ['darkTheme', Boolean],
    //                        ]}
    //     ${'mutations'} | ${[
    //                            ['setTheme', Function],
    //                            ['toggleTheme', Function],
    //                        ]}
    //     ${'actions'}   | ${[
    //                            ['$initTheme', Function],
    //                            ['toggleTheme', Function],
    //                        ]}
    // `('returned object\'s',
    // ({ childName, properties }) => {
    //     const childObject = themeSettings[childName];
    //     describe(`.${childName}`, () => {
    //         it.each(properties)(`has .%s`, (property, type) => {
    //             expect(childObject).toHaveProperty(property, expect.any(type));
    //         });
    //     });
    // });

    describe('.state', () => {
        const { state } = themeSettings;

        describe.each`
            propName       | propType    | propDefault
            ${'darkTheme'} | ${Boolean}  | ${false}
        `('.$propName', ({ propName, propType, propDefault }) => {
            const property = state[propName];

            it(`has type of '${propType.name}'`, () => {
                expect(property).toEqual(expect.any(propType));
            });

            it(`has default value of '${propDefault}'`, () => {
                expect(property).toEqual(propDefault);
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
            `('fn($value): [state.darkTheme] $darkTheme -> $expected', ({ darkTheme, value, expected }) => {
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
});
