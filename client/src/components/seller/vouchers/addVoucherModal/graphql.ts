import {gql} from 'apollo-boost';

export const ADD_VOUCHER_MUTATION = gql`
    mutation AddVoucher($name:String,
                        $description:String,
                        $image:String,
                        $price:Float,
                        $qty:Int,
                        $variant:String,
                        $ownerId:ID,
                        $imageName:String){
      addVoucher(name: $name,
                   description:$description,
                   price:$price,
                   qty:$qty,
                   variant:$variant,
                   ownerId:$ownerId,
                   image:{
                   name:$imageName,
                   dataUrl:$image
                   }){
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