import {Schema, model, Types} from 'mongoose';
import {GraphQLString} from "graphql";


const schema = new Schema({
    variant: {type:String, required: true},
    price: {type:Number, required:true},
    qty: {type:Number, required:true},
    buyerLast: {type:String, required: true},
    buyerFirst: {type:String, required: true},
    buyerEmail: {type:String, required: true},
    voucherId:{type: Types.ObjectId, required:true},
    buyerId:{type: Types.ObjectId, required:true},
    ownerId:{type: Types.ObjectId, required:true}
});

export default model('order', schema);