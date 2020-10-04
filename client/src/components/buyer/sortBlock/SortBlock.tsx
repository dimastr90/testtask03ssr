import React, {useEffect, useState} from "react";
import classes from './SortBlock.module.css'
import {Checkbox, FormControlLabel, FormLabel, Radio, RadioGroup} from "@material-ui/core";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import DateFnsUtils from "@date-io/date-fns";
import {useRouter} from "next/router";


const SortBlock = (props: any) => {
    const [show, setShow] = useState('all');
    const [priceSort, setPriceSort] = useState('none');
    const [roomsSort, setRoomsSort] = useState('none');
    const [startDate, setStartDate] = useState<any>(new Date().setHours(0, 0, 0, 0));
    const [endDate, setEndDate] = useState<any>(new Date().setHours(0, 0, 0, 0));
    const [dateRangeSort, setDateRangeSort] = useState(false);
    const router = useRouter();


    useEffect(() => {
        props.sortViewByDateRange(+startDate, +endDate, dateRangeSort);
    }, [startDate, endDate, dateRangeSort]);



    const showHandleChange = (e: any) => {
        router.push('/buyer/'+e.target.value);
        setShow(e.target.value);
    };

    const priceSortHandleChange = (e: any) => {
        props.sortViewDataPrice(e.target.value);
        setPriceSort(e.target.value);
    };

    const roomsSortHandleChange = (e: any) => {
        props.sortViewDataRooms(e.target.value);
        setRoomsSort(e.target.value);
    };

    const dateRangeCheckHandler = (e: any) => {
        setDateRangeSort(e.target.checked);
    };

    return (
        <div>
            <div className={classes.top}>
                <span>Sort</span>
            </div>
            <div className={classes.container}>
                <div>
                    <FormLabel component="legend">Show:</FormLabel>
                    <RadioGroup name="show" value={show} onChange={showHandleChange}>
                        <FormControlLabel value="all" control={<Radio/>} label="All"/>
                        <FormControlLabel value="vouchers" control={<Radio/>} label="Vouchers"/>
                        <FormControlLabel value="apartments" control={<Radio/>} label="Apartments"/>
                    </RadioGroup>
                </div>
                <hr/>
                <div>
                    <FormLabel component="legend">Sort by price:</FormLabel>
                    <RadioGroup name="price" value={priceSort} onChange={priceSortHandleChange}>
                        <FormControlLabel value="none" control={<Radio/>} label="None"/>
                        <FormControlLabel value="asc" control={<Radio/>} label="Ascending"/>
                        <FormControlLabel value="desc" control={<Radio/>} label="Descending"/>
                    </RadioGroup>
                </div>
                <hr/>
                {show === 'apartments' &&
                <>
                    <div>
                        <FormLabel component="legend">Sort by rooms:</FormLabel>
                        <RadioGroup name="rooms" value={roomsSort} onChange={roomsSortHandleChange}>
                            <FormControlLabel value="none" control={<Radio/>} label="None"/>
                            <FormControlLabel value="asc" control={<Radio/>} label="Ascending"/>
                            <FormControlLabel value="desc" control={<Radio/>} label="Descending"/>
                        </RadioGroup>
                    </div>
                    <hr/>
                    <div>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={dateRangeSort}
                                    onChange={dateRangeCheckHandler}
                                    name="rangeCheckBox"
                                    color="primary"
                                />
                            }
                            label='Sort by range:'
                        />
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                disablePast={true}
                                format="dd/MM/yyyy"
                                margin="normal"
                                label="Start date"
                                name='start'
                                value={startDate}
                                onChange={setStartDate}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />

                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                disablePast={true}
                                format="dd/MM/yyyy"
                                margin="normal"
                                label="End date"
                                name='end'
                                value={endDate}
                                onChange={setEndDate}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                    </div>
                </>}
            </div>
        </div>
    )
};


export default SortBlock;