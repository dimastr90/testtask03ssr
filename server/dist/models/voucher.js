"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: Object },
    price: { type: Number, required: true },
    variant: { type: String, required: true },
    qty: { type: Number },
    ownerId: { type: mongoose_1.Types.ObjectId, required: true }
});
exports.default = mongoose_1.model('voucher', schema);
