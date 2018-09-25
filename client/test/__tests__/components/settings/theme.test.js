import themeSettings from '@client/components/settings/theme';

describe('Theme settings Vuex module', () => {
    test('returns', () => {
        const ts = themeSettings;
        expect(ts).not.toBeUndefined();
    });
});
