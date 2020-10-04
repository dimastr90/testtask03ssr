import React from "react";
import Typography from "@material-ui/core/Typography";
import classes from "./ApartmentsItem.module.css"
import {Card, CardActionArea, CardContent, CardMedia, Grid} from "@material-ui/core";
const no_image = require('../../../../images/no_image.jpg');


const ApartmentsItem = (props: any) => {

    const onCardClickHandler = () => {
        props.setEditModalData({...props.item});
    };


    return (
        <Grid item xs={12} md={5}>
            <div className={classes.container}>
                <Card className={classes.card}>
                    <CardActionArea onClick={onCardClickHandler}>
                        <CardMedia><img className={classes.image}
                                        src={props.item.image.dataUrl ? props.item.image.dataUrl : no_image}/></CardMedia>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {props.item.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Rooms:{props.item.rooms}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Price:{props.item.price}
                            </Typography>
                            <Typography paragraph>
                                {props.item.description}
                            </Typography>
                                <div className={classes.slots}>
                                {props.item.timeSlots.length > 0 && <> Time Slots: {props.item.timeSlots.map((i: any) =>
                                    <span key={'timeSlotApartmentKey-'+i}>{new Date(Number(i)).toLocaleDateString() + '; '}</span>)}</>}
                                </div>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </div>
        </Grid>
    )
};

export default ApartmentsItem;