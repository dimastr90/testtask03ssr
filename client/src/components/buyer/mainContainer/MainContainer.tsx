import React, {useEffect, useState} from "react";
import classes from './MainContainer.module.css';
import {Grid} from "@material-ui/core";
import {Pagination} from "@material-ui/lab";
import Item from "../item/Item";
import AddOrderModal from "../addOrderModal/AddOrderModal";
import AddBookingModal from "../addBookingModal/AddBookingModal";


interface IaddOrderModalData {
    _id: string
    name: string
    description: string
    ownerId: string
    price: number
    variant: string
    qty: number
}

interface IaddBookingModalData {
    _id: string
    name: string
    description: string
    price: number
    ownerId:string
    timeSlots: string[]
    rooms: number
}


const MainContainer = (props: any) => {
    const [showAddBookingModal, setShowAddBookingModal] = useState<boolean>(false);
    const [showAddOrderModal, setShowAddOrderModal] = useState<boolean>(false);
    const [addOrderModalData, setAddOrderModalData] = useState<IaddOrderModalData>({
        _id: '',
        name: '',
        ownerId:'',
        description: '',
        price: 0,
        variant: '',
        qty: 0
    });
    const [addBookingModalData, setAddBookingModalData] = useState<IaddBookingModalData>({
        _id: '',
        name: '',
        rooms: 0,
        ownerId:'',
        description: '',
        price: 0,
        timeSlots: [],
    });
    const [currentPage, setCurrentPage] = useState(1); //selected page;
    const PER_PAGE = 6; //notes on page;
    const pageAmount = Math.ceil(props.data.length / PER_PAGE); //total amount of pages;


    const handleChangePage = (e: any, page: number) => {
        setCurrentPage(page);
    };


    const getData = () => {
        const offset = currentPage === 1 ? 0 : currentPage * PER_PAGE - PER_PAGE;
        const newData = props.data.slice(offset, offset + PER_PAGE);
        if (newData.length === 0) {
            setCurrentPage(currentPage === 1 ? 1 : currentPage - 1);
        }
        return newData;
    };

    return (
        <>
            <div className={classes.container}>
                <Grid container spacing={2}>
                    {props.data.length > 0 && getData().map((i: any) => <Item
                        setAddBookingModalData={setAddBookingModalData}
                        setAddOrderModalData={setAddOrderModalData} key={i._id} {...i}/>)}
                </Grid>
                <Grid container justify="center" spacing={2}>
                    <Grid item>
                        {pageAmount > 1 && <div className='cardListPagination'>
                            <Pagination className='pagination' count={pageAmount} showFirstButton showLastButton
                                        onChange={handleChangePage}/>
                        </div>
                        }
                    </Grid>
                </Grid>
            </div>

            <AddOrderModal setAddOrderModalData={setAddOrderModalData}
                           setShowAddOrderModal={setShowAddOrderModal}
                           showAddOrderModal={showAddOrderModal}
                           addOrderModalData={addOrderModalData}/>
            <AddBookingModal setShowAddBookingModal={setShowAddBookingModal}
                             showAddBookingModal={showAddBookingModal}
                             addBookingModalData={addBookingModalData}
                             setAddBookingModalData={setAddBookingModalData}/>
        </>
    )
};


export default MainContainer;