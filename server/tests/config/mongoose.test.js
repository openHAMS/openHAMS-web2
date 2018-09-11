import configMongoose from '@server/config/mongoose';
import mongoose from 'mongoose';
jest.mock('mongoose', () => jest.fn());

describe('Test mongoose setup', () => {
    beforeEach(() => {
        mongoose.mockClear();
    });
    it('It should call connect()', () => {
        configMongoose();
        expect(mongoose).toHaveBeenCalledTimes(1);
    });
});
