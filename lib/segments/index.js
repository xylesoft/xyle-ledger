"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.XyleLedgerSegments = void 0;
const date_key_segmenter_1 = __importDefault(require("./date-key-segmenter"));
const sign_segment_1 = __importDefault(require("./sign-segment"));
var XyleLedgerSegments;
(function (XyleLedgerSegments) {
    XyleLedgerSegments.dateKeySegmenter = date_key_segmenter_1.default;
    XyleLedgerSegments.signSegment = sign_segment_1.default;
})(XyleLedgerSegments = exports.XyleLedgerSegments || (exports.XyleLedgerSegments = {}));
