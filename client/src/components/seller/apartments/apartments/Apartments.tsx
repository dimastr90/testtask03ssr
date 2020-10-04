import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import classes from "./Apartments.module.css"
import {Fab, Grid} from "@material-ui/core";
import AddApartmentModal from "../addApatmentModal/AddApartmentModal";
import ApartmentsItem from "../apartmentsItem/ApartmentsItem";
import EditApartmentModal from "../editApatmentModal/EditApartmentModal";
import AddIcon from '@material-ui/icons/Add';


interface IeditModalData {
    _id: string
    name: string
    description: string,
    image: {
        name: string
        dataUrl: string
    }
    price: number
    rooms: number
    timeSlots: Date[]
    ownerId: string
}

const Apartments = ({data}) => {
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
        rooms: 0,
        timeSlots: [],
        ownerId: ''
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
                    <ApartmentsItem key={'apartment' + i._id} item={{...i}} setEditModalData={setEditModalData}/>)}
            </Grid>
            <Fab aria-label='Add' className={classes.addButton} onClick={addButtonHandler} color='primary'>
                <AddIcon/>
            </Fab>


            <AddApartmentModal showAddModal={showAddModal} setShowAddModal={setShowAddModal}/>
            <EditApartmentModal showEditModal={showEditModal} setShowEditModal={setShowEditModal} data={editModalData}
                                setEditModalData={setEditModalData}/>
        </>
    )
};

const mapStateToProps = (state: any) => ({
    _id: state.user._id,
    data: state.sellerData.apartments
});

export default connect(mapStateToProps)(Apartments);
