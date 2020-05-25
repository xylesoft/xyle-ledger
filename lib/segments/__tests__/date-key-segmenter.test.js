"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
const date_key_segmenter_1 = __importDefault(require("../date-key-segmenter"));
describe('Make sure date key segmenter works as expected', () => {
    it('should product a YYYY-MM format by default', () => {
        const transaction = {
            timestamp: Number(moment_1.default.utc('2020-05-04').format('x')),
            value: 10,
            reference: 'Test'
        };
        expect(date_key_segmenter_1.default(transaction)).toEqual('2020-05');
    });
});
