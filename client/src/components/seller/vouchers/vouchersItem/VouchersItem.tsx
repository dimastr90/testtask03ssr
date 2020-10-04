import React from "react";
import Typography from "@material-ui/core/Typography";
import classes from "./VouchersItem.module.css"
import {Card, CardActionArea, CardContent, CardMedia, Grid} from "@material-ui/core";
const no_image = require('../../../../images/no_image.jpg');


interface Iprops {
    item: {
        _id: string
        name: string
        description: string,
        image: {
            name: string
            dataUrl: string
        }
        price: number
        variant: string
        qty: number
        ownerId: string
    }
    setEditModalData: Function
}

const VouchersItem = (props: Iprops) => {

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
                                Variant:{props.item.variant}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Quantity: {props.item.qty}
                            </Typography>
                            <Typography paragraph>
                                {props.item.description}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </div>
        </Grid>
    )
};

export default VouchersItem;