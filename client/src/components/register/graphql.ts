import {gql} from 'apollo-boost';

export const ADD_USER_MUTATION = gql`
    mutation AddUser($login:String, $role:String){
      addUser(login: $login, role:$role){
        _id,
        login,
        role
      }
}
    `;