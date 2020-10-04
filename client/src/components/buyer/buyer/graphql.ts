import {gql} from 'apollo-boost';

export const GET_APARTMENTS = gql`
    query Apartments{
      apartments{
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

export const GET_VOUCHERS = gql`
    query Vouchers{
      vouchers{
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