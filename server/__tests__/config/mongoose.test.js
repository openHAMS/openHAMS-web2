import configMongoose from '@/config/mongoose';
import mongoose from '../../__mocks__/mongoose.js';

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
