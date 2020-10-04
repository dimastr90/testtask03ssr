import React, {useEffect, useState} from "react";
import {Fab, Grid} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import {useQuery} from "@apollo/react-hooks";
import {GET_USER_VOUCHERS} from "../../seller/graphql";
import classes from './Vouchers.module.css';
import VouchersItem from "../vouchersItem/VouchersItem";
import AddVoucherModal from "../addVoucherModal/AddVoucherModal";
import {connect} from "react-redux";
import EditVoucherModal from "../editVoucherModal/EditVoucherModal";
import EditApartmentModal from "../../apartments/editApatmentModal/EditApartmentModal";


interface IeditModalData {
    _id: string
    name: string
    description: string,
    image: {
        name: string
        dataUrl: string
    }
    price: number
    variant: string
    qty:number
    ownerId: string
}




const Vouchers = ({data}) => {
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editModalData, setEditModalData] = useState<IeditModalData>({
        _id: '',
        name: '',
        description: '',
        image: {
            name: '',
            dataUrl: ''
        },
        price: 0,
        variant: '',
        qty:0,
        ownerId:''
    });



    useEffect(() => {
        setShowEditModal(!!editModalData._id);
    }, [editModalData]);


    const addButtonHandler = () => {
        setShowAddModal(true);
    };

    return (
        <>
            <Grid container spacing={2} alignItems="center" justify="center" className={classes.container}>
                {data && data.length>0 && data.map((i: any) =>
                    <VouchersItem key={i._id} item={{...i}} setEditModalData={setEditModalData}/>)}
            </Grid>
            <Fab aria-label='Add' className={classes.addButton} onClick={addButtonHandler} color='primary'>
                <AddIcon/>
            </Fab>

            <AddVoucherModal showAddModal={showAddModal} setShowAddModal={setShowAddModal}/>
            <EditVoucherModal showEditModal={showEditModal} setShowEditModal={setShowEditModal} data={editModalData} setEditModalData={setEditModalData}/>
        </>
    )
};



const mapStateToProps = (state: any) => ({
    _id: state.user._id,
    data: state.sellerData.vouchers
});

export default connect(mapStateToProps)(Vouchers);