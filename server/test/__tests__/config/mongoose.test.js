import configMongoose from '@/config/mongoose';
// temporary mock (only for this test)
jest.mock('mongoose', () => ({
    /* eslint-disable-next-line require-await */
    connect: jest.fn(async function () {
        // return mongoose as a promise
        return this;
    }),
}));
import mongoose from 'mongoose';

describe('ConfigMongoose', () => {
    beforeEach(() => {
        mongoose.connect.mockClear();
    });
    it('calls connect()', () => {
        configMongoose();
        expect(mongoose.connect).toHaveBeenCalledTimes(1);
    });
    it('returns', () => {
        const m = configMongoose();
        expect(m).not.toBeUndefined();
    });
    it('returns mongoose object', async () => {
        const m = await configMongoose();
        expect(m).toBe(mongoose);
    });
});
