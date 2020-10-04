import {Schema, model, Types} from 'mongoose';


const schema = new Schema({
    name: {type:String, required: true},
    description: {type:String, required: true},
    image: {type:Object},
    price: {type:Number, required:true},
    variant: {type:String, required:true},
    qty:{type:Number},
    ownerId:{type: Types.ObjectId, required:true}
});

export default model('voucher', schema);