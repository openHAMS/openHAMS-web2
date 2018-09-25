import mockingoose from 'mockingoose';
import passportVerifyFactory from '@/config/passport/utilities/passport-verify-factory';

const jsonClean = o => JSON.parse(JSON.stringify(o));
const strategies = ['google'];

import { testUser, otherUser } from '~testdata/User.data';
import { testProfile } from '~testdata/PassportProfile.data';

describe.each(strategies)('PassportVerifyFactory', strategy => {
    let verify = null;
    beforeEach(() => {
        mockingoose.resetAll();
        verify = passportVerifyFactory({
            strategy,
            familyName: 'testname.family',
            givenName: 'testname.given',
            photo: 'testphoto.url',
        });
    });

    test('calls done with the error provided by db', done => {
        mockingoose.User.toReturn(new Error('test error'), 'findOne');
        verify({/* any req */}, 'accessToken', 'refreshToken', {/* any profile */}, testcb);
        function testcb (err) {
            expect(err).toEqual(new Error('test error'));
            done();
        }
    });


    describe('if user is already logged in', () => {
        const req = {
            user: {
                ...testUser,
                [strategy]: 'testId',
            },
        };

        describe('and ID is already linked to another account', () => {
            beforeEach(() => {
                const otherUserWithStrategyId = {
                    ...otherUser,
                    [strategy]: 'otherId',
                };
                mockingoose.User.toReturn(otherUserWithStrategyId, 'findOne');
            });

            it('calls done with false user', done => {
                verify(req, 'accessToken', 'refreshToken', { id: 'otherId' }, testcb);
                function testcb(err, user) {
                    expect(err).toBeFalsy();
                    expect(user).toBe(false);
                    done();
                }
            });

            it('calls done with error message', done => {
                verify(req, 'accessToken', 'refreshToken', { id: 'otherId' }, testcb);
                function testcb(e, u, message) {
                    expect(message).toEqual({
                        message: expect.any(String),
                    });
                    done();
                }
            });
        });

        describe.skip('and ID is not linked to any account', () => {
            beforeEach(() => {
                mockingoose.User.toReturn(null, 'findOne');
            });

            it('calls done with user', done => {
                verify(req, 'accessToken', 'refreshToken', { id: 'testId' }, testcb);
                function testcb(err, user) {
                    expect(err).toBeFalsy();
                    expect(user).toMatchObject({ ...testUser, [strategy]: 'testId' });
                    done();
                }
            });
        });
    });


    describe('if no user is logged in', () => {
        const req = {};

        describe('and a user with the same ID exists in db', () => {
            const testUserWithStrategyId = {
                ...testUser,
                [strategy]: 'testId',
            };
            beforeEach(() => {
                mockingoose.User.toReturn(testUserWithStrategyId, 'findOne');
            });

            it('calls done with user from db', done => {
                verify(req, 'accessToken', 'refreshToken', { id: 'testId' }, testcb);
                function testcb(err, user) {
                    expect(err).toBeFalsy();
                    expect(user).toMatchObject(testUserWithStrategyId);
                    done();
                }
            });
        });

        describe('and no user with ID exists in db', () => {
            beforeEach(() => {
                mockingoose.User.toReturn(null, 'findOne');
            });

            describe('if user is admin', () => {
                const OLD_ENV = process.env;
                const testProfileWithId = {
                    ...testProfile,
                    id: 'testId',
                };
                beforeEach(() => {
                    jest.resetModules();
                    process.env = { ...OLD_ENV, ADMIN_ID: 'testId' };
                    delete process.env.NODE_ENV;
                });
                afterEach(() => {
                    process.env = OLD_ENV;
                });

                it('calls done with new user', done => {
                    verify(req, 'accessToken', 'refreshToken', testProfileWithId, testcb);
                    function testcb(err, user) {
                        const expectedUser = {
                            ...testUser,
                            [strategy]: 'testId',
                            tokens: [
                                { kind: strategy, accessToken: 'accessToken' },
                            ],
                        };
                        expect(err).toBeFalsy();
                        // jsonClean is the 'official' workaround for fail with no visual diff
                        expect(jsonClean(user)).toMatchObject(expectedUser);
                        done();
                    }
                });

                it('calls done with user returned by save()', done => {
                    const userReturnedBySave = { email: 'random@email' };
                    mockingoose.User.toReturn(userReturnedBySave, 'save');
                    verify(req, 'accessToken', 'refreshToken', testProfileWithId, testcb);
                    function testcb(err, user) {
                        expect(err).toBeFalsy();
                        expect(user).toMatchObject(userReturnedBySave);
                        done();
                    }
                });
            });

            describe('if user is NOT admin', () => {
                const OLD_ENV = process.env;
                const testProfileWithId = {
                    ...testProfile,
                    id: 'testId',
                };
                beforeEach(() => {
                    jest.resetModules();
                    process.env = { ...OLD_ENV, ADMIN_ID: 'otherId' };
                    delete process.env.NODE_ENV;
                });
                afterEach(() => {
                    process.env = OLD_ENV;
                });

                it('calls done with false user', done => {
                    verify(req, 'accessToken', 'refreshToken', testProfileWithId, testcb);
                    function testcb(err, user) {
                        expect(err).toBeNull();
                        expect(user).toBe(false);
                        done();
                    }
                });

                it('calls done with error message', done => {
                    verify(req, 'accessToken', 'refreshToken', testProfileWithId, testcb);
                    function testcb(e, u, message) {
                        expect(message).toEqual({
                            message: expect.any(String),
                        });
                        done();
                    }
                });
            });
        });
    });
});
