

const SET_USER = 'SET_USER';
const SET_SELLER_DATA = 'SET_SELLER_DATA';


interface IsetUser {
        login: string,
        role: string,
        _id:string
}

interface IsetEditApartmentModalId {
    _id:string
}


const initialState = {
    user: {
        login: '',
        role: '',
        _id:''
    },
    sellerData:{
        apartments: [],
        vouchers: [],
        bookings: [],
        orders:[]
    }

};


const mainReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: {...action.payload}
            };
        case SET_SELLER_DATA:
            return {
                ...state,
                sellerData: {...action.payload}
            };
        default:
            return state;
    }
};

export const setUser = (payload: IsetUser) => ({type: SET_USER, payload});
export const setSellerData = (payload: any) => ({type: SET_SELLER_DATA, payload});


export default mainReducer;