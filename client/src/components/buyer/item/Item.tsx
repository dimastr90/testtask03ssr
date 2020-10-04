import React from "react";
import {Button, Grid} from "@material-ui/core";
import classes from "./Item.module.css";
const noImage = require("../../../images/no_image.jpg");
import {toast} from "react-toastify";


const Item = (props: any) => {

    const bookBuyHandler = () => {
        if(props.timeSlots && props.timeSlots.length<1){
            toast.dark('No bookings available');
        }else if(props.variant){
            const {_id, name, description, price, variant, qty, ownerId} = props;
            props.setAddOrderModalData({_id, name, description, price, variant, qty, ownerId});
        }else{
            const {_id, name, description, price, timeSlots, rooms, ownerId} = props;
            props.setAddBookingModalData({_id,name,description,price,timeSlots,rooms,ownerId});
        }
    };
    return (
        <>
            <Grid item xs={12} md={4} lg={4}>
                <div className={classes.container}>
                    <img className={classes.image} src={props.image.dataUrl ? props.image.dataUrl : noImage}
                         alt='some image'/>
                    <div><span className={classes.propertyName}>Name:</span>{props.name}</div>
                    <div><span className={classes.propertyName}>Description:</span>{props.description}</div>
                    {props.variant && <div><span className={classes.propertyName}>Variant:</span>{props.variant}</div>}
                    {props.rooms && <div><span className={classes.propertyName}>Rooms:</span>{props.rooms}</div>}
                    {props.qty && <div><span className={classes.propertyName}>Quantity:</span>{props.qty}</div>}
                    <div><span className={classes.propertyName}>Price:</span>{props.price}</div>
                    {(props.timeSlots && props.timeSlots.length > 0) &&
                    <div className={classes.timeSlots}><span className={classes.propertyName}>TimeSlots:</span>
                        <ul>
                            {props.timeSlots.map((i: any) => <li key={i}>{new Date(Number(i)).toLocaleDateString()}</li>)}
                        </ul>
                    </div>}
                    <div>
                        <Button variant="contained" onClick={bookBuyHandler} className={classes.button}>Book/Buy</Button>
                    </div>
                </div>
            </Grid>
        </>
    )
};


export default Item;