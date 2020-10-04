import {gql} from 'apollo-boost';

export const GET_USER_VOUCHERS = gql`
    query VouchersByOwnerId($ownerId:ID){
      vouchersByOwnerId(ownerId: $ownerId){
        _id
        name
        description
        image{
        name
        dataUrl
        }
        price
        variant
        qty
        ownerId
      }
}
    `;


export const GET_USER_APARTMENTS = gql`
    query ApartmentsByOwnerId($ownerId:ID){
      apartmentsByOwnerId(ownerId: $ownerId){
        _id
        name
        description
        image{
        name
        dataUrl
        }
        price
        rooms
        timeSlots
        ownerId
      }
}
    `;

export const GET_BOOKINGS_BY_OWNER_ID = gql`
    query BookingsByOwner($ownerId:ID){
      bookingsByOwnerId(ownerId:$ownerId){
        _id
        timeSlots
        price
        buyerLast,
        buyerFirst
        buyerEmail
        apartment{
             rooms
             }
      }
}
    `;


export const GET_ORDERS_BY_OWNER_ID = gql`
    query OrdersByOwner($ownerId:ID){
      ordersByOwnerId(ownerId:$ownerId){
        _id
        variant
        price
        buyerLast,
        buyerFirst
        buyerEmail
        qty
      }
}
    `;