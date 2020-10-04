import {gql} from 'apollo-boost';

export const ADD_BOOKING_MUTATION = gql`
    mutation AddBooking($price:Float,
                          $timeSlots:[String], 
                          $rooms:Int,
                          $apartmentId:ID,
                          $buyerId:ID,
                          $ownerId:ID,
                          $buyerLast:String,
                          $buyerFirst:String,
                          $buyerEmail:String){
      addBooking(price:$price,
                   timeSlots:$timeSlots, 
                   rooms:$rooms,
                   apartmentId:$apartmentId,
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