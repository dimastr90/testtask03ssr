"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const graphql = require('graphql');
const graphql_1 = require("graphql");
const apartment_1 = __importDefault(require("../models/apartment"));
const voucher_1 = __importDefault(require("../models/voucher"));
const user_1 = __importDefault(require("../models/user"));
const booking_1 = __importDefault(require("../models/booking"));
const order_1 = __importDefault(require("../models/order"));
const NestedImageType = new graphql.GraphQLObjectType({
    name: 'NestedImage',
    fields: () => ({
        name: { type: graphql_1.GraphQLString },
        dataUrl: { type: graphql_1.GraphQLString },
    })
});
const NestedImageInputType = new graphql.GraphQLInputObjectType({
    name: 'NestedImageInput',
    fields: () => ({
        name: { type: graphql_1.GraphQLString },
        dataUrl: { type: graphql_1.GraphQLString },
    })
});
const ApartmentsType = new graphql.GraphQLObjectType({
    name: 'apartments',
    fields: () => ({
        _id: { type: graphql_1.GraphQLID },
        name: { type: graphql_1.GraphQLString },
        description: { type: graphql_1.GraphQLString },
        image: { type: NestedImageType },
        price: { type: graphql_1.GraphQLFloat },
        rooms: { type: graphql_1.GraphQLInt },
        timeSlots: { type: graphql_1.GraphQLList(graphql_1.GraphQLString) },
        ownerId: { type: graphql_1.GraphQLID }
    })
});
const VouchersType = new graphql.GraphQLObjectType({
    name: 'vouchers',
    fields: () => ({
        _id: { type: graphql_1.GraphQLID },
        name: { type: graphql_1.GraphQLString },
        description: { type: graphql_1.GraphQLString },
        image: { type: NestedImageType },
        price: { type: graphql_1.GraphQLFloat },
        variant: { type: graphql_1.GraphQLString },
        qty: { type: graphql_1.GraphQLInt },
        ownerId: { type: graphql_1.GraphQLID }
    })
});
const BookingsType = new graphql.GraphQLObjectType({
    name: 'bookings',
    fields: () => ({
        _id: { type: graphql_1.GraphQLID },
        timeSlots: { type: graphql_1.GraphQLList(graphql_1.GraphQLString) },
        price: { type: graphql_1.GraphQLFloat },
        apartmentId: { type: graphql_1.GraphQLID },
        buyerId: { type: graphql_1.GraphQLID },
        ownerId: { type: graphql_1.GraphQLID },
        buyerLast: { type: graphql_1.GraphQLString },
        buyerFirst: { type: graphql_1.GraphQLString },
        buyerEmail: { type: graphql_1.GraphQLString },
        apartment: {
            type: ApartmentsType,
            resolve(parent, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        return yield apartment_1.default.findOne({ _id: parent.apartmentId });
                    }
                    catch (e) {
                        console.warn(e.message || "DB query error");
                    }
                });
            }
        },
        buyer: {
            type: UsersType,
            resolve(parent, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        return yield user_1.default.findOne({ _id: parent.buyerId });
                    }
                    catch (e) {
                        console.warn(e.message || "DB query error");
                    }
                });
            }
        }
    })
});
const OrdersType = new graphql.GraphQLObjectType({
    name: 'orders',
    fields: () => ({
        _id: { type: graphql_1.GraphQLID },
        price: { type: graphql_1.GraphQLFloat },
        qty: { type: graphql_1.GraphQLInt },
        variant: { type: graphql_1.GraphQLString },
        voucherId: { type: graphql_1.GraphQLID },
        buyerId: { type: graphql_1.GraphQLID },
        ownerId: { type: graphql_1.GraphQLID },
        buyerLast: { type: graphql_1.GraphQLString },
        buyerFirst: { type: graphql_1.GraphQLString },
        buyerEmail: { type: graphql_1.GraphQLString },
        voucher: {
            type: VouchersType,
            resolve(parent, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        return yield voucher_1.default.findOne({ _id: parent.vouchersId });
                    }
                    catch (e) {
                        console.warn(e.message || "DB query error");
                    }
                });
            }
        },
        buyer: {
            type: UsersType,
            resolve(parent, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        return yield user_1.default.findOne({ _id: parent.buyerId });
                    }
                    catch (e) {
                        console.warn(e.message || "DB query error");
                    }
                });
            }
        }
    })
});
const UsersType = new graphql.GraphQLObjectType({
    name: 'users',
    fields: () => ({
        _id: { type: graphql_1.GraphQLID },
        login: { type: graphql_1.GraphQLString },
        role: { type: graphql_1.GraphQLString },
        bookingsId: { type: new graphql_1.GraphQLList(graphql_1.GraphQLID) },
        ordersId: { type: new graphql_1.GraphQLList(graphql_1.GraphQLID) },
        apartmentsId: { type: new graphql_1.GraphQLList(graphql_1.GraphQLID) },
        vouchersId: { type: new graphql_1.GraphQLList(graphql_1.GraphQLID) }
    })
});
const Query = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: {
        apartments: {
            type: graphql_1.GraphQLList(ApartmentsType),
            resolve(parent, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        return yield apartment_1.default.find({});
                    }
                    catch (e) {
                        console.warn(e.message || "DB query error");
                    }
                });
            }
        },
        bookings: {
            type: graphql_1.GraphQLList(BookingsType),
            resolve(parent, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        return yield booking_1.default.find({});
                    }
                    catch (e) {
                        console.warn(e.message || "DB query error");
                    }
                });
            }
        },
        apartmentsByOwnerId: {
            type: graphql_1.GraphQLList(ApartmentsType),
            args: { ownerId: { type: graphql_1.GraphQLID } },
            resolve(parent, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        return yield apartment_1.default.find({ ownerId: mongoose_1.Types.ObjectId(args.ownerId) });
                    }
                    catch (e) {
                        console.warn(e.message || "DB query error");
                    }
                });
            }
        },
        vouchers: {
            type: graphql_1.GraphQLList(VouchersType),
            resolve(parent, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        return yield voucher_1.default.find({});
                    }
                    catch (e) {
                        console.warn(e.message || "DB query error");
                    }
                });
            }
        },
        vouchersByOwnerId: {
            type: graphql_1.GraphQLList(VouchersType),
            args: { ownerId: { type: graphql_1.GraphQLID } },
            resolve(parent, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        return yield voucher_1.default.find({ ownerId: mongoose_1.Types.ObjectId(args.ownerId) });
                    }
                    catch (e) {
                        console.warn(e.message || "DB query error");
                    }
                });
            }
        },
        ordersByOwnerId: {
            type: graphql_1.GraphQLList(OrdersType),
            args: { ownerId: { type: graphql_1.GraphQLID } },
            resolve(parent, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        return yield order_1.default.find({ ownerId: mongoose_1.Types.ObjectId(args.ownerId) });
                    }
                    catch (e) {
                        console.warn(e.message || "DB query error");
                    }
                });
            }
        },
        bookingsByOwnerId: {
            type: graphql_1.GraphQLList(BookingsType),
            args: { ownerId: { type: graphql_1.GraphQLID } },
            resolve(parent, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        return yield booking_1.default.find({ ownerId: mongoose_1.Types.ObjectId(args.ownerId) });
                    }
                    catch (e) {
                        console.warn(e.message || "DB query error");
                    }
                });
            }
        },
        bookingsByBuyer: {
            type: graphql_1.GraphQLList(BookingsType),
            args: { buyerId: { type: graphql_1.GraphQLID } },
            resolve(parent, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        return yield booking_1.default.find({ buyerId: mongoose_1.Types.ObjectId(args.buyerId) });
                    }
                    catch (e) {
                        console.warn(e.message || "DB query error");
                    }
                });
            }
        },
        ordersByBuyer: {
            type: graphql_1.GraphQLList(OrdersType),
            args: { buyerId: { type: graphql_1.GraphQLID } },
            resolve(parent, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        return yield order_1.default.find({ buyerId: mongoose_1.Types.ObjectId(args.buyerId) });
                    }
                    catch (e) {
                        console.warn(e.message || "DB query error");
                    }
                });
            }
        },
        availableApartmentsSlotsByDate: {
            type: graphql_1.GraphQLBoolean,
            args: {
                _id: { type: graphql_1.GraphQLID },
                date: { type: graphql_1.GraphQLString }
            },
            resolve(parent, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        const data = yield apartment_1.default.findOne({ _id: mongoose_1.Types.ObjectId(args._id) });
                        if (data) {
                            // @ts-ignore
                            return data.timeSlots.indexOf(args.date) > -1;
                        }
                        return false;
                    }
                    catch (e) {
                        console.warn(e.message || "DB query error");
                    }
                });
            }
        },
        userByLogin: {
            type: UsersType,
            args: { login: { type: graphql_1.GraphQLString } },
            resolve(parent, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        return yield user_1.default.findOne({ login: args.login });
                    }
                    catch (e) {
                        console.warn(e.message || "DB query error");
                    }
                });
            }
        }
    }
});
const Mutation = new graphql.GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UsersType,
            args: {
                login: { type: graphql_1.GraphQLString },
                role: { type: graphql_1.GraphQLString }
            },
            resolve(parent, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        const user = new user_1.default({
                            login: args.login,
                            role: args.role
                        });
                        const check = yield user_1.default.findOne({ login: args.login });
                        if (check) {
                            return new Error('User is already exist');
                        }
                        return yield user.save();
                    }
                    catch (e) {
                        console.warn(e.message || "Something went wrong with mutation");
                        throw new Error(e.message);
                    }
                });
            }
        },
        addApartment: {
            type: ApartmentsType,
            args: {
                name: { type: graphql_1.GraphQLString },
                description: { type: graphql_1.GraphQLString },
                image: { type: NestedImageInputType },
                price: { type: graphql_1.GraphQLFloat },
                rooms: { type: graphql_1.GraphQLInt },
                timeSlots: { type: graphql_1.GraphQLList(graphql_1.GraphQLString) },
                ownerId: { type: graphql_1.GraphQLID }
            },
            resolve(parent, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        const apartment = new apartment_1.default(Object.assign({}, args));
                        const check = yield apartment_1.default.findOne({ name: args.name });
                        if (check) {
                            return new Error('Apartment is already exist');
                        }
                        return yield apartment.save();
                    }
                    catch (e) {
                        console.warn(e.message || "Something went wrong with mutation");
                        throw new Error(e.message);
                    }
                });
            }
        },
        updateApartment: {
            type: ApartmentsType,
            args: {
                _id: { type: graphql_1.GraphQLID },
                name: { type: graphql_1.GraphQLString },
                description: { type: graphql_1.GraphQLString },
                image: { type: NestedImageInputType },
                price: { type: graphql_1.GraphQLFloat },
                rooms: { type: graphql_1.GraphQLInt },
                timeSlots: { type: graphql_1.GraphQLList(graphql_1.GraphQLString) }
            },
            resolve(parent, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        return yield apartment_1.default.updateOne({ _id: args._id }, {
                            $set: {
                                name: args.name,
                                description: args.description,
                                image: args.image,
                                price: args.price,
                                rooms: args.rooms,
                                timeSlots: args.timeSlots
                            }
                        });
                    }
                    catch (e) {
                        console.warn(e.message || "Something went wrong with mutation");
                        throw new Error(e.message);
                    }
                });
            }
        },
        addVoucher: {
            type: VouchersType,
            args: {
                name: { type: graphql_1.GraphQLString },
                description: { type: graphql_1.GraphQLString },
                image: { type: NestedImageInputType },
                price: { type: graphql_1.GraphQLFloat },
                qty: { type: graphql_1.GraphQLInt },
                variant: { type: graphql_1.GraphQLString },
                ownerId: { type: graphql_1.GraphQLID }
            },
            resolve(parent, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        const voucher = new voucher_1.default(Object.assign({}, args));
                        const check = yield voucher_1.default.findOne({ name: args.name });
                        if (check) {
                            return new Error('Voucher is already exist');
                        }
                        return yield voucher.save();
                    }
                    catch (e) {
                        console.warn(e.message || "Something went wrong with mutation");
                        throw new Error(e.message);
                    }
                });
            }
        },
        updateVoucher: {
            type: VouchersType,
            args: {
                _id: { type: graphql_1.GraphQLID },
                name: { type: graphql_1.GraphQLString },
                description: { type: graphql_1.GraphQLString },
                image: { type: NestedImageInputType },
                price: { type: graphql_1.GraphQLFloat },
                qty: { type: graphql_1.GraphQLInt },
                variant: { type: graphql_1.GraphQLString }
            },
            resolve(parent, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        return yield voucher_1.default.updateOne({ _id: mongoose_1.Types.ObjectId(args._id) }, {
                            $set: {
                                name: args.name,
                                description: args.description,
                                image: args.image,
                                price: args.price,
                                qty: args.qty,
                                variant: args.variant
                            }
                        });
                    }
                    catch (e) {
                        console.warn(e.message || "Something went wrong with mutation");
                        throw new Error(e.message);
                    }
                });
            }
        },
        addOrder: {
            type: OrdersType,
            args: {
                price: { type: graphql_1.GraphQLFloat },
                qty: { type: graphql_1.GraphQLInt },
                variant: { type: graphql_1.GraphQLString },
                voucherId: { type: graphql_1.GraphQLID },
                buyerId: { type: graphql_1.GraphQLID },
                ownerId: { type: graphql_1.GraphQLID },
                buyerLast: { type: graphql_1.GraphQLString },
                buyerFirst: { type: graphql_1.GraphQLString },
                buyerEmail: { type: graphql_1.GraphQLString },
            },
            resolve(parent, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        yield voucher_1.default.updateOne({ _id: mongoose_1.Types.ObjectId(args.voucherId) }, {
                            $inc: {
                                qty: -args.qty
                            }
                        });
                        const order = new order_1.default(Object.assign({}, args));
                        return yield order.save();
                    }
                    catch (e) {
                        console.warn(e.message || "Something went wrong with mutation");
                        throw new Error(e.message);
                    }
                });
            }
        },
        addBooking: {
            type: BookingsType,
            args: {
                price: { type: graphql_1.GraphQLFloat },
                rooms: { type: graphql_1.GraphQLInt },
                timeSlots: { type: graphql_1.GraphQLList(graphql_1.GraphQLString) },
                apartmentId: { type: graphql_1.GraphQLID },
                buyerId: { type: graphql_1.GraphQLID },
                ownerId: { type: graphql_1.GraphQLID },
                buyerLast: { type: graphql_1.GraphQLString },
                buyerFirst: { type: graphql_1.GraphQLString },
                buyerEmail: { type: graphql_1.GraphQLString },
            },
            resolve(parent, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        yield apartment_1.default.updateOne({ _id: mongoose_1.Types.ObjectId(args.apartmentId) }, {
                            $pull: {
                                timeSlots: { $in: args.timeSlots }
                            }
                        });
                        const book = new booking_1.default(Object.assign({}, args));
                        return yield book.save();
                    }
                    catch (e) {
                        console.warn(e.message || "Something went wrong with mutation");
                        throw new Error(e.message);
                    }
                });
            }
        },
    }
});
exports.default = new graphql.GraphQLSchema({
    query: Query,
    mutation: Mutation
});
