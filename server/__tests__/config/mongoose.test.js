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
    test('calls connect()', () => {
        configMongoose();
        expect(mongoose.connect).toHaveBeenCalledTimes(1);
    });
    test('returns', () => {
        const m = configMongoose();
        expect(m).not.toBeUndefined();
    });
    test('returns mongoose object', () => {
        const m = configMongoose();
        expect(m).toBe(mongoose);
    });
});
