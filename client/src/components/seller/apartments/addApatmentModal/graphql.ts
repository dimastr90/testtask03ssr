import {gql} from 'apollo-boost';

export const ADD_APARTMENT_MUTATION = gql`
    mutation AddApartment($name:String, $description:String, $image:String, $price:Float, $rooms:Int, $timeSlots:[String], $ownerId:ID, $imageName:String){
      addApartment(name: $name,
                   description:$description,
                   price:$price,
                   rooms:$rooms,
                   timeSlots:$timeSlots,
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
        rooms
        timeSlots
        ownerId
      }
}
    `;