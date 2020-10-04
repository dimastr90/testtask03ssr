import {gql} from 'apollo-boost';

export const GET_USER_QUERY = gql`
    query GetUser($login:String){
      userByLogin(login: $login){
        login,
        role,
        _id
      }
}
    `;