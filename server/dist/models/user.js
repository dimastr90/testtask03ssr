"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    login: { type: String, required: true, unique: true },
    bookingsId: { type: Array },
    ordersId: { type: Array },
    role: { type: String, required: true },
    apartmentsId: { type: Array },
    vouchersId: { type: Array }
});
exports.default = mongoose_1.model('user', schema);
