"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    price: { type: Number, required: true },
    rooms: { type: Number, required: true },
    timeSlots: { type: Array, required: true },
    apartmentId: { type: mongoose_1.Types.ObjectId, required: true },
    buyerLast: { type: String, required: true },
    buyerFirst: { type: String, required: true },
    buyerEmail: { type: String, required: true },
    buyerId: { type: mongoose_1.Types.ObjectId, required: true },
    ownerId: { type: mongoose_1.Types.ObjectId, required: true }
});
exports.default = mongoose_1.model('booking', schema);
