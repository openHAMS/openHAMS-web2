import mockingoose from 'mockingoose';
import passportVerifyFactory from '@/config/passport/utilities/passport-verify-factory';

describe('PassportVerifyFactory', () => {
    beforeEach(() => {
        mockingoose.resetAll();
    });
    test('asd', done => {
        const adapter = {
            strategy: 'google',
            familyName: 'name.familyName',
            givenName: 'name.givenName',
            photo: '_json.image.url',
        };
        mockingoose.User.toReturn(new Error('my err'), 'findOne');
        const verify = passportVerifyFactory(adapter);
        function cb (err, user) {
            expect(user).toBeUndefined();
            done();
        }
        verify({}, '', '', { }, cb);
    });
});
