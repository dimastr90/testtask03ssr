import React, {useEffect, useState} from 'react';
import ApolloClient from "apollo-boost";
import {Grid} from "@material-ui/core";
import MainContainer from "../../src/components/buyer/mainContainer/MainContainer";
import {GET_APARTMENTS, GET_VOUCHERS} from "../../src/components/buyer/buyer/graphql";
import sortingItems from "../../src/modules/sortingItems";
import SortBlock from "../../src/components/buyer/sortBlock/SortBlock";
import getConfig from "next/dist/next-server/lib/runtime-config";
import {GetServerSideProps} from "next";
import {useRouter} from "next/router";
import NavbarLayout from "../../Layouts/NavbarLayout";
import {connect} from "react-redux";


const Buyer = (props:any) => {
    const [viewData, setViewData] = useState<any>([]);
    const router = useRouter();
    const params = router.query.params || [];

    const {apartmentsData, vouchersData} = props;

    
    useEffect(() => {
        if (apartmentsData && vouchersData) {
            setViewData([...apartmentsData.apartments, ...vouchersData.vouchers]);
        }


        if (params.length > 0) {
            sortViewDataByType(params[0]);
        }
    }, [vouchersData, apartmentsData]);


    const sortViewDataByType = (type: string) => {
        if (type === "vouchers") {
            setViewData(vouchersData.vouchers);
        } else if (type === "apartments") {
            setViewData(apartmentsData.apartments);
        } else {
            setViewData([...apartmentsData.apartments, ...vouchersData.vouchers]);
        }
    };

    const sortViewDataPrice = (order: 'asc' | 'desc' | 'none') => {
        if (order !== "none") {
            setViewData([...sortingItems.sort(viewData, 'price', order)]);
        }
    };

    const sortViewDataRooms = (order: 'asc' | 'desc' | 'none') => {
        if (order !== "none") {
            setViewData([...sortingItems.sort(viewData, 'rooms', order)]);
        }
    };

    const sortViewByDateRange = (start: number, end: number, isOn: boolean) => {
        if (isOn) {
            setViewData(apartmentsData.apartments.filter((i: any) => i.timeSlots.some((j: any) => Number(j) >= start && Number(j) <= end)));
        } else {
            if (apartmentsData) {
                setViewData(apartmentsData.apartments);
            }
        }
    };

    if (props.user.role === 'buyer') {
        return (
            <NavbarLayout>
                <Grid container justify='center' spacing={2}>
                    <Grid item xs={12} md={9}>
                        <MainContainer data={viewData}/>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <SortBlock sortViewDataByType={sortViewDataByType} sortViewDataPrice={sortViewDataPrice}
                                   sortViewByDateRange={sortViewByDateRange}
                                   sortViewDataRooms={sortViewDataRooms}/>
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

export default connect(mapStateToProps)(Buyer);


export const getServerSideProps: GetServerSideProps = async (context) => {
    const client = new ApolloClient({
        uri: 'http://api:5001/graphql'
    });
    try {
        const {data: apartmentsData} = await client.query({query: GET_APARTMENTS});
        const {data: vouchersData} = await client.query({query: GET_VOUCHERS});
        return {
            props: {
                vouchersData,
                apartmentsData
            }
        }
    } catch (e) {
        console.warn(e.message || 'Error in db request')
        return {
            props: {}
        };
    }

};
