import {gql} from 'apollo-boost';

export const ADD_ORDER_MUTATION = gql`
    mutation AddOrder($price:Float,
                          $variant:String, 
                          $qty:Int,
                          $voucherId:ID,
                          $buyerId:ID,
                          $ownerId:ID,
                          $buyerLast:String,
                          $buyerFirst:String,
                          $buyerEmail:String){
      addOrder(price:$price,
                   variant:$variant, 
                   qty:$qty,
                   voucherId:$voucherId,
                   buyerId:$buyerId,
                   ownerId:$ownerId,
                   buyerLast:$buyerLast,
                   buyerFirst:$buyerFirst,
                   buyerEmail:$buyerEmail
                   ){
       _id
      }
      }
    `;