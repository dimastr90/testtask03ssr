import {Schema, model, Types} from 'mongoose';


const schema = new Schema({
    name: {type:String, required: true},
    description: {type:String, required: true},
    image: {type:Object},
    price: {type:Number, required:true},
    rooms: {type:Number, required:true},
    timeSlots:{type:[String]},
    ownerId:{type: Types.ObjectId, required:true}
});

export default model('apartment', schema);