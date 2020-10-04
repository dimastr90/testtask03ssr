import React from "react";
import {connect} from "react-redux";
import {Typography} from "@material-ui/core";
import classes from "../bookings/Bookings.module.css";

const Orders = ({data}) => {


    return (
        <>
            {data && data.length > 0 && <Typography variant="h5" gutterBottom>
                Orders:
            </Typography>
            }
            {data && data.length>0 && data.map((i: any) => <div
                    className={classes.container} key={i._id}>
                    <Typography variant="body1" gutterBottom>
                        Order ID: {i._id}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Variant: {i.variant}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Quantity: {i.qty}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Price: {i.price}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        BuyerInfo: {`${i.buyerFirst} ${i.buyerLast} Email:${i.buyerEmail}`}
                    </Typography>
                </div>
            )}
        </>
    )
}


const mapStateToProps = (state: any) => ({
    userId: state.user._id,
    data: state.sellerData.orders
});

export default connect(mapStateToProps)(Orders);