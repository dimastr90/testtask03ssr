import {Schema, model, Types} from 'mongoose';


const schema = new Schema({
    price: {type:Number, required:true},
    rooms: {type:Number, required:true},
    timeSlots:{type:Array, required:true},
    apartmentId:{type: Types.ObjectId, required:true},
    buyerLast: {type:String, required: true},
    buyerFirst: {type:String, required: true},
    buyerEmail: {type:String, required: true},
    buyerId:{type: Types.ObjectId, required:true},
    ownerId:{type: Types.ObjectId, required:true}
});

export default model('booking', schema);