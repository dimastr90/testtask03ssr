import React, {useEffect} from 'react';
import {connect} from "react-redux";
import Apartments from "../../src/components/seller/apartments/apartments/Apartments";
import {AppBar, Box, Grid, Tab, Tabs, Typography} from "@material-ui/core";
import {makeStyles, useTheme} from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import Vochers from "../../src/components/seller/vouchers/vouchers/Vouchers";
import BookingsAndOrdersContainer
    from "../../src/components/seller/bookingsAndOrders/bookingsAndOrdersContainer/BookingsAndOrdersContainer";
import NavbarLayout from "../../Layouts/NavbarLayout";
import {GetServerSideProps} from "next";
import ApolloClient from "apollo-boost";
import {GET_APARTMENTS, GET_VOUCHERS} from "../../src/components/buyer/buyer/graphql";
import {
    GET_BOOKINGS_BY_OWNER_ID, GET_ORDERS_BY_OWNER_ID,
    GET_USER_APARTMENTS,
    GET_USER_VOUCHERS
} from "../../src/components/seller/seller/graphql";
import getConfig from "next/dist/next-server/lib/runtime-config";
import {setSellerData} from "../../src/redux/mainReducer";



function TabPanel(props: any) {
    const {children, value, index, ...other} = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`action-tabpanel-${index}`}
            aria-labelledby={`action-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

function a11yProps(index: any) {
    return {
        id: `action-tab-${index}`,
        'aria-controls': `action-tabpanel-${index}`,
    };
}


const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '1em',
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        minHeight: 200,
        borderRadius: 5,
        marginBottom: '2em'
    }
}));










const SellerId = (props: any) => {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);


    useEffect(()=>{
        props.setSellerData(props.sellerData);
    });

    //MaterialUI

    const handleChange = (event: any, newValue: any) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index: any) => {
        setValue(index);
    };

    //End MaterialUI

    if (props.user.role === 'seller') {
        return (
            <NavbarLayout>
                <Grid container alignItems="center" justify="center">
                    <Grid item xs={12} md={10}>
                        <div className={classes.root}>
                            <AppBar position="static" color="default">
                                <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    indicatorColor="primary"
                                    textColor="primary"
                                    variant="fullWidth"
                                    aria-label="action tabs example"
                                >
                                    <Tab label="Apartments" {...a11yProps(0)} />
                                    <Tab label="Vouchers" {...a11yProps(1)} />
                                    <Tab label="Bookings/Orders" {...a11yProps(2)} />
                                </Tabs>
                            </AppBar>
                            <SwipeableViews
                                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                                index={value}
                                onChangeIndex={handleChangeIndex}
                            >
                                <TabPanel value={value} index={0} dir={theme.direction}>
                                    <Apartments/>
                                </TabPanel>
                                <TabPanel value={value} index={1} dir={theme.direction}>
                                    <Vochers/>
                                </TabPanel>
                                <TabPanel value={value} index={2} dir={theme.direction}>
                                    <BookingsAndOrdersContainer/>
                                </TabPanel>
                            </SwipeableViews>
                        </div>
                    </Grid>
                </Grid>
            </NavbarLayout>
        )
    }

    return <></>
};

const mapStateToProps = (state: any) => ({
    user: state.user
});

export default connect(mapStateToProps, {setSellerData})(SellerId);








export const getServerSideProps: GetServerSideProps = async (context) => {

    const client = new ApolloClient({
        uri: 'http://api:5001/graphql'
    });
    const {sellerId} = context.params;
    if (sellerId) {
        const sellerData = {};
        const names = ['vouchers', 'apartments', 'bookings', 'orders'];
        const vouchers = client.query({query: GET_USER_VOUCHERS, variables: {ownerId: sellerId}});
        const apartments = client.query({query: GET_USER_APARTMENTS, variables: {ownerId: sellerId}});
        const bookings = client.query({query: GET_BOOKINGS_BY_OWNER_ID, variables: {ownerId: sellerId}});
        const orders = client.query({query: GET_ORDERS_BY_OWNER_ID, variables: {ownerId: sellerId}});

        const res = await Promise.allSettled([vouchers, apartments, bookings, orders]);
        res.map((item, index: number) => item.status === 'fulfilled' ? sellerData[names[index]] = item.value.data[`${names[index]}ByOwnerId`] : sellerData[names[index]] = []);
        return {
            props: {
                sellerData
            }
        };

    }
    return {
        props: {}
    };

};