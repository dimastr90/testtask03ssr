import React from "react";
import {connect} from "react-redux";
import {Typography} from "@material-ui/core";
import classes from './Bookings.module.css';

const Bookings = ({data}) => {

    return (
        <>
            {data && data.length>0 && <Typography variant="h5" gutterBottom>
                Bookings:
            </Typography>}
            {data && data.length>0 && data.map((i: any) => <div
                    className={classes.container} key={i._id}>
                    <Typography variant="body1" gutterBottom>
                        Order ID: {i._id}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Time Slot(s): {i.timeSlots.map((j: any) =>
                        <span key={i}>{new Date(Number(j)).toLocaleDateString()}; </span>)}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Quantity of rooms: {i.apartment.rooms}
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
    data: state.sellerData.bookings
});

export default connect(mapStateToProps)(Bookings);