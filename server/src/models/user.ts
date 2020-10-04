import {Schema, model, Types} from 'mongoose';
import {GraphQLID, GraphQLList} from "graphql";


const schema = new Schema({
    login: {type: String, required:true, unique:true},
    bookingsId:{type: Array},
    ordersId:{type: Array},
    role:{type:String, required:true},
    apartmentsId: {type:Array},
    vouchersId: {type: Array}
});

export default model('user', schema);