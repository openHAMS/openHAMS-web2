import configMongoose from '@/config/mongoose';
// temporary mock (only for this test)
jest.mock('mongoose', () => ({
    connect: jest.fn(),
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
    it('returns mongoose object', () => {
        const m = configMongoose();
        expect(m).toBe(mongoose);
    });
});
