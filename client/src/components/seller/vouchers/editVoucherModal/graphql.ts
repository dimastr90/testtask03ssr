import {gql} from 'apollo-boost';

export const UPDATE_VOUCHER_MUTATION = gql`
    mutation UpdateVoucher($_id:ID 
                            $name:String,
                            $description:String,
                            $image:String,
                            $imageName:String,
                            $price:Float,
                            $qty:Int,
                            $variant:String){
      updateVoucher( 
                   _id:$_id
                   name: $name,
                   description:$description,
                   price:$price,
                   qty:$qty,
                   variant:$variant,
                   image:{name:$imageName,
                          dataUrl:$image}){
        _id
        name
        description
        image{
          name
          dataUrl
          }
        price
        qty
        variant
        ownerId
      }
}
    `;