import {gql} from 'apollo-boost';

export const UPDATE_APARTMENT_MUTATION = gql`
    mutation UpdateApartment($_id:ID 
                            $name:String,
                            $description:String,
                            $image:String,
                            $imageName:String,
                            $price:Float,
                            $rooms:Int,
                            $timeSlots:[String]){
      updateApartment( 
                   _id:$_id
                   name: $name,
                   description:$description,
                   price:$price,
                   rooms:$rooms,
                   timeSlots:$timeSlots,
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
        rooms
        timeSlots
        ownerId
      }
}
    `;