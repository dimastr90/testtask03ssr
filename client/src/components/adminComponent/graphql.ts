import {gql} from 'apollo-boost';

export const GET_APARTMENTS = gql`
    query Apartments{
      apartments{
        _id
        rooms
        timeSlots
      }
}
    `;

export const GET_BOOKINGS = gql`
    query Bookings{
      bookings{
        _id
        timeSlots
        apartment{
             _id
             }
      }
}
    `;