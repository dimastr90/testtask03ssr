import React from "react";
import Navbar from "../navbar/Navbar";
import SellerComponent from "../../../pages/seller/[sellerId]";
import Buyer from "../../../pages/buyer/[[...params]]";
import AdminComponent from "../../../pages/admin";
import {connect} from "react-redux";
import {Container} from "@material-ui/core";


type Role = 'admin' | 'seller' | 'buyer';

const currentRender = {
    seller: <SellerComponent/>,
    buyer: <Buyer/>,
    admin: <AdminComponent/>
};


interface Iprops {
    user: {
        role: Role
    }
}

const MainContainer = (props: Iprops) => {
    return (
        <>
            <Navbar/>
            <Container maxWidth='lg'>
                {currentRender[props.user.role]}
            </Container>
        </>
    )
};


const mapStateToProps = (state: any) => ({
    user: state.user
});

export default connect(mapStateToProps)(MainContainer);