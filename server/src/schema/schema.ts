import {Types} from "mongoose";
const graphql = require('graphql');
import {GraphQLFloat, GraphQLID, GraphQLInt, GraphQLList, GraphQLString, GraphQLBoolean} from "graphql";
import Apartment from "../models/apartment";
import Voucher from "../models/voucher";
import User from "../models/user";
import Booking from "../models/booking";
import Order from "../models/order";


const NestedImageType = new graphql.GraphQLObjectType({
    name: 'NestedImage',
    fields: () => ({
        name: {type: GraphQLString},
        dataUrl: {type: GraphQLString},
    })
});

const NestedImageInputType = new graphql.GraphQLInputObjectType({
    name: 'NestedImageInput',
    fields: () => ({
        name: {type: GraphQLString},
        dataUrl: {type: GraphQLString},
    })
});

const ApartmentsType = new graphql.GraphQLObjectType({
    name: 'apartments',
    fields: () => ({
        _id: {type: GraphQLID},
        name: {type: GraphQLString},
        description: {type: GraphQLString},
        image: {type: NestedImageType},
        price: {type: GraphQLFloat},
        rooms: {type: GraphQLInt},
        timeSlots: {type: GraphQLList(GraphQLString)},
        ownerId: {type: GraphQLID}
    })
});

const VouchersType = new graphql.GraphQLObjectType({
    name: 'vouchers',
    fields: () => ({
        _id: {type: GraphQLID},
        name: {type: GraphQLString},
        description: {type: GraphQLString},
        image: {type: NestedImageType},
        price: {type: GraphQLFloat},
        variant: {type: GraphQLString},
        qty: {type: GraphQLInt},
        ownerId: {type: GraphQLID}
    })
});


const BookingsType = new graphql.GraphQLObjectType({
    name: 'bookings',
    fields: () => ({
        _id: {type: GraphQLID},
        timeSlots: {type: GraphQLList(GraphQLString)},
        price: {type: GraphQLFloat},
        apartmentId: {type: GraphQLID},
        buyerId: {type: GraphQLID},
        ownerId: {type: GraphQLID},
        buyerLast: {type: GraphQLString},
        buyerFirst: {type: GraphQLString},
        buyerEmail: {type: GraphQLString},
        apartment: {
            type: ApartmentsType,
            async resolve(parent: any, args: any) {
                try {
                    return await Apartment.findOne({_id: parent.apartmentId});
                } catch (e) {
                    console.warn(e.message || "DB query error");
                }
            }
        },
        buyer: {
            type: UsersType,
            async resolve(parent: any, args: any) {
                try {
                    return await User.findOne({_id: parent.buyerId});
                } catch (e) {
                    console.warn(e.message || "DB query error");
                }
            }
        }
    })
});

const OrdersType = new graphql.GraphQLObjectType({
    name: 'orders',
    fields: () => ({
        _id: {type: GraphQLID},
        price: {type: GraphQLFloat},
        qty: {type: GraphQLInt},
        variant: {type: GraphQLString},
        voucherId: {type: GraphQLID},
        buyerId: {type: GraphQLID},
        ownerId: {type: GraphQLID},
        buyerLast: {type: GraphQLString},
        buyerFirst: {type: GraphQLString},
        buyerEmail: {type: GraphQLString},
        voucher: {
            type: VouchersType,
            async resolve(parent: any, args: any) {
                try {
                    return await Voucher.findOne({_id: parent.vouchersId});
                } catch (e) {
                    console.warn(e.message || "DB query error");
                }
            }
        },
        buyer: {
            type: UsersType,
            async resolve(parent: any, args: any) {
                try {
                    return await User.findOne({_id: parent.buyerId});
                } catch (e) {
                    console.warn(e.message || "DB query error");
                }
            }
        }
    })
});

const UsersType = new graphql.GraphQLObjectType({
    name: 'users',
    fields: () => ({
        _id: {type: GraphQLID},
        login: {type: GraphQLString},
        role: {type: GraphQLString},
        bookingsId: {type: new GraphQLList(GraphQLID)},
        ordersId: {type: new GraphQLList(GraphQLID)},
        apartmentsId: {type: new GraphQLList(GraphQLID)},
        vouchersId: {type: new GraphQLList(GraphQLID)}
    })
});


const Query = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: {
        apartments: {
            type: GraphQLList(ApartmentsType),
            async resolve(parent: any, args: any) {
                try {
                    return await Apartment.find({});
                } catch (e) {
                    console.warn(e.message || "DB query error");
                }
            }
        },
        bookings: {
            type: GraphQLList(BookingsType),
            async resolve(parent: any, args: any) {
                try {
                    return await Booking.find({});
                } catch (e) {
                    console.warn(e.message || "DB query error");
                }
            }
        },
        apartmentsByOwnerId: {
            type: GraphQLList(ApartmentsType),
            args: {ownerId: {type: GraphQLID}},
            async resolve(parent: any, args: any) {
                try {
                    return await Apartment.find({ownerId: Types.ObjectId(args.ownerId)});
                } catch (e) {
                    console.warn(e.message || "DB query error");
                }
            }
        },
        vouchers: {
            type: GraphQLList(VouchersType),
            async resolve(parent: any, args: any) {
                try {
                    return await Voucher.find({});
                } catch (e) {
                    console.warn(e.message || "DB query error");
                }
            }
        },
        vouchersByOwnerId: {
            type: GraphQLList(VouchersType),
            args: {ownerId: {type: GraphQLID}},
            async resolve(parent: any, args: any) {
                try {
                    return await Voucher.find({ownerId: Types.ObjectId(args.ownerId)});
                } catch (e) {
                    console.warn(e.message || "DB query error");
                }
            }
        },
        ordersByOwnerId: {
            type: GraphQLList(OrdersType),
            args: {ownerId: {type: GraphQLID}},
            async resolve(parent: any, args: any) {
                try {
                    return await Order.find({ownerId: Types.ObjectId(args.ownerId)});
                } catch (e) {
                    console.warn(e.message || "DB query error");
                }
            }
        },
        bookingsByOwnerId: {
            type: GraphQLList(BookingsType),
            args: {ownerId: {type: GraphQLID}},
            async resolve(parent: any, args: any) {
                try {
                    return await Booking.find({ownerId: Types.ObjectId(args.ownerId)});
                } catch (e) {
                    console.warn(e.message || "DB query error");
                }
            }
        },
        bookingsByBuyer: {    //all bookings by a specific buyer
            type: GraphQLList(BookingsType),
            args: {buyerId: {type: GraphQLID}},
            async resolve(parent: any, args: any) {
                try {
                    return await Booking.find({buyerId: Types.ObjectId(args.buyerId)});
                } catch (e) {
                    console.warn(e.message || "DB query error");
                }
            }
        },
         ordersByBuyer: {    //all orders by a specific buyer
            type: GraphQLList(OrdersType),
            args: {buyerId: {type: GraphQLID}},
            async resolve(parent: any, args: any) {
                try {
                    return await Order.find({buyerId: Types.ObjectId(args.buyerId)});
                } catch (e) {
                    console.warn(e.message || "DB query error");
                }
            }
        },
        availableApartmentsSlotsByDate: {    // is the slot available for the date by apartment (date is a timestamp)
            type: GraphQLBoolean,
            args: {
                _id: {type: GraphQLID},
                date: {type: GraphQLString}
            },
            async resolve(parent: any, args: any) {
                try {
                    const data = await Apartment.findOne({_id: Types.ObjectId(args._id)});
                    if(data) {
                        // @ts-ignore
                        return data.timeSlots.indexOf(args.date) > -1;
                    }
                    return false;
                } catch (e) {
                    console.warn(e.message || "DB query error");
                }
            }
        },
        userByLogin: {
            type: UsersType,
            args: {login: {type: GraphQLString}},
            async resolve(parent: any, args: any) {
                try {
                    return await User.findOne({login: args.login});
                } catch (e) {
                    console.warn(e.message || "DB query error");
                }
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
                login: {type: GraphQLString},
                role: {type: GraphQLString}
            },
            async resolve(parent: any, args: any) {
                try {
                    const user = new User({
                        login: args.login,
                        role: args.role
                    });

                    const check = await User.findOne({login: args.login});
                    if (check) {
                        return new Error('User is already exist');
                    }
                    return await user.save();
                } catch (e) {
                    console.warn(e.message || "Something went wrong with mutation")
                    throw new Error(e.message);
                }
            }
        },
        addApartment: {
            type: ApartmentsType,
            args: {
                name: {type: GraphQLString},
                description: {type: GraphQLString},
                image: {type: NestedImageInputType},
                price: {type: GraphQLFloat},
                rooms: {type: GraphQLInt},
                timeSlots: {type: GraphQLList(GraphQLString)},
                ownerId: {type: GraphQLID}
            },
            async resolve(parent: any, args: any) {
                try {
                    const apartment = new Apartment({...args});
                    const check = await Apartment.findOne({name: args.name});
                    if (check) {
                        return new Error('Apartment is already exist');
                    }
                    return await apartment.save();
                } catch (e) {
                    console.warn(e.message || "Something went wrong with mutation")
                    throw new Error(e.message);
                }
            }
        },
        updateApartment: {
            type: ApartmentsType,
            args: {
                _id: {type: GraphQLID},
                name: {type: GraphQLString},
                description: {type: GraphQLString},
                image: {type: NestedImageInputType},
                price: {type: GraphQLFloat},
                rooms: {type: GraphQLInt},
                timeSlots: {type: GraphQLList(GraphQLString)}
            },
            async resolve(parent: any, args: any) {
                try {
                    return await Apartment.updateOne({_id: args._id},
                        {
                            $set: {
                                name: args.name,
                                description: args.description,
                                image: args.image,
                                price: args.price,
                                rooms: args.rooms,
                                timeSlots: args.timeSlots
                            }
                        });
                } catch (e) {
                    console.warn(e.message || "Something went wrong with mutation")
                    throw new Error(e.message);
                }
            }
        },
        addVoucher: {
            type: VouchersType,
            args: {
                name: {type: GraphQLString},
                description: {type: GraphQLString},
                image: {type: NestedImageInputType},
                price: {type: GraphQLFloat},
                qty: {type: GraphQLInt},
                variant: {type: GraphQLString},
                ownerId: {type: GraphQLID}
            },
            async resolve(parent: any, args: any) {
                try {
                    const voucher = new Voucher({...args});
                    const check = await Voucher.findOne({name: args.name});
                    if (check) {
                        return new Error('Voucher is already exist');
                    }
                    return await voucher.save();
                } catch (e) {
                    console.warn(e.message || "Something went wrong with mutation")
                    throw new Error(e.message);
                }
            }
        },
        updateVoucher: {
            type: VouchersType,
            args: {
                _id: {type: GraphQLID},
                name: {type: GraphQLString},
                description: {type: GraphQLString},
                image: {type: NestedImageInputType},
                price: {type: GraphQLFloat},
                qty: {type: GraphQLInt},
                variant: {type: GraphQLString}
            },
            async resolve(parent: any, args: any) {
                try {
                    return await Voucher.updateOne({_id: Types.ObjectId(args._id)},
                        {
                            $set: {
                                name: args.name,
                                description: args.description,
                                image: args.image,
                                price: args.price,
                                qty: args.qty,
                                variant: args.variant
                            }
                        });
                } catch (e) {
                    console.warn(e.message || "Something went wrong with mutation")
                    throw new Error(e.message);
                }
            }
        },
        addOrder: {
            type: OrdersType,
            args: {
                price: {type: GraphQLFloat},
                qty: {type: GraphQLInt},
                variant: {type: GraphQLString},
                voucherId: {type: GraphQLID},
                buyerId: {type: GraphQLID},
                ownerId: {type: GraphQLID},
                buyerLast: {type: GraphQLString},
                buyerFirst: {type: GraphQLString},
                buyerEmail: {type: GraphQLString},
            },
            async resolve(parent: any, args: any) {
                try {
                    await Voucher.updateOne({_id: Types.ObjectId(args.voucherId)},
                        {
                            $inc: {
                                qty: -args.qty
                            }
                        });
                    const order = new Order({...args});
                    return await order.save();
                } catch (e) {
                    console.warn(e.message || "Something went wrong with mutation")
                    throw new Error(e.message);
                }
            }
        },
        addBooking: {
            type: BookingsType,
            args: {
                price: {type: GraphQLFloat},
                rooms: {type: GraphQLInt},
                timeSlots: {type: GraphQLList(GraphQLString)},
                apartmentId: {type: GraphQLID},
                buyerId: {type: GraphQLID},
                ownerId: {type: GraphQLID},
                buyerLast: {type: GraphQLString},
                buyerFirst: {type: GraphQLString},
                buyerEmail: {type: GraphQLString},
            },
            async resolve(parent: any, args: any) {
                try {
                    await Apartment.updateOne({_id: Types.ObjectId(args.apartmentId)},
                        {
                            $pull: {
                                timeSlots: {$in: args.timeSlots}
                            }
                        });
                    const book = new Booking({...args});
                    return await book.save();
                } catch (e) {
                    console.warn(e.message || "Something went wrong with mutation")
                    throw new Error(e.message);
                }
            }
        },
    }
});

export default new graphql.GraphQLSchema({
    query: Query,
    mutation: Mutation
});