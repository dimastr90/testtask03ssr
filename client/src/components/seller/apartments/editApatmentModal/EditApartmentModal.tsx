import React, {useEffect, useState} from "react";
import Button from "@material-ui/core/Button";
import {connect} from "react-redux";
import classes from "./EditApartmentModal.module.css"
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    TextField
} from "@material-ui/core";
import {toast} from "react-toastify";
import Calendar from 'react-calendar';
import ClearIcon from '@material-ui/icons/Clear';
import {useMutation} from "@apollo/react-hooks";
import {UPDATE_APARTMENT_MUTATION} from "./graphql";
import {useRouter} from "next/router";

interface IformValues {
    _id: string
    name: string
    description: string,
    image: {
        name: string
        dataUrl: string | ArrayBuffer | null
    }
    price: string
    rooms: string
    timeSlots: any[]
    ownerId: string
}

interface IUpdateApartmentInBase {
    _id: string
    name: string
    description: string,
    imageName: string
    image: string | ArrayBuffer | null
    price: number
    rooms: number
    timeSlots: string[]
}


const EditApartmentModal = (props: any) => {
    const [updateApartment, {data}] = useMutation(UPDATE_APARTMENT_MUTATION);
    const [formValues, setFormValues] = useState<IformValues>({
        ...props.data,
        price: props.data.price + '',
        rooms: props.data.rooms + ''
    });
    const [checkedDate, setCheckedDate] = useState(new Date());
    const router = useRouter();




    useEffect(() => {
        setFormValues({...props.data})
    }, [props]);

    const closeFormHandler = () => {
        props.setShowEditModal(false);
    };

    const changeInputsHandler = (e: any) => {
        setFormValues({...formValues, [e.target.name]: e.target.value});
    };

    const formSubmitHandler = async (e: any) => {
        e.preventDefault();
        const {name, description, price, rooms, image, _id, timeSlots} = formValues;
        if (name.trim().length < 1) {
            toast.dark('Incorrect name');
        } else if (description.trim().length < 1) {
            toast.dark('Incorrect description');
        } else if (!price.toString().trim()) {
            toast.dark('Incorrect price');
        } else if (!rooms.toString().trim()) {
            toast.dark('Incorrect quantity of rooms');
        } else {
            const data = {
                _id,
                name,
                description,
                price: Number(price),
                rooms: Number(rooms),
                imageName: image.name,
                image: image.dataUrl,
                timeSlots
            };
            await updateApartmentInBase(data);
            props.setEditModalData({
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
        }
    };

    const updateApartmentInBase = async (sendingData: IUpdateApartmentInBase) => {
        try {
            await updateApartment({variables: {...sendingData}});
            toast.dark('Apartment is updated');
            router.push(props._id);
        } catch (e) {
            toast.error(e.message || 'Error with apartment saving');
        }
    };

    const imageChangeHandler = (e: any) => {
        if (e.target.files[0]) {
            const name = e.target.files[0].name;
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onloadend = () => {
                formValues.image.dataUrl = reader.result;
                formValues.image.name = name;
            }
        }
    };

    const deleteImageHandler = () => {
        const image = {name: '', dataUrl: ''};
        setFormValues({...formValues, image});
    };

    const onChangeDateHandler = (date: any) => {
        setCheckedDate(date);
    };

    const addDateHandler = () => {
        const today = new Date();
        const stringTimestampDate = +checkedDate+"";
        console.log(stringTimestampDate)
        if (checkedDate < today) {
            toast.dark('Incorrect date')
        } else if (formValues.timeSlots.includes(stringTimestampDate)) {
            toast.dark('Date is already checked');
        } else {
            setFormValues({...formValues, timeSlots: [...formValues.timeSlots, stringTimestampDate]});
        }
    };

    const deleteDateHandler = (e: any) => {
        const changedArray = formValues.timeSlots.filter(i => JSON.stringify(i) !== e.currentTarget.value);
        setFormValues({...formValues, timeSlots: changedArray});
    };


    return (
        <>
            <Dialog open={props.showEditModal} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit apartment</DialogTitle>
                <form onSubmit={formSubmitHandler}>
                    <DialogContent>
                        <Grid item xs={12}>
                            <TextField className={classes.input} name='name' value={formValues.name}
                                       onChange={changeInputsHandler} label="Name" autoComplete='off'/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField className={classes.input} name='description' value={formValues.description}
                                       onChange={changeInputsHandler} label="Description" autoComplete='off'/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField className={classes.input} name='price' value={formValues.price}
                                       onChange={changeInputsHandler} label="Price" autoComplete='off'/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField className={classes.input} name='rooms' value={formValues.rooms}
                                       onChange={changeInputsHandler} label="Amount of rooms" autoComplete='off'/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                className={classes.input}
                                name="upload-photo"
                                type="file"
                                onChange={imageChangeHandler}
                            />
                            {formValues.image.name && <>
                                <p>Image: {formValues.image.name} <IconButton
                                    aria-label="settings" className={classes.deleteDateButton}
                                    onClick={deleteImageHandler}>
                                    <ClearIcon/></IconButton></p>
                            </>}
                        </Grid>
                        <Grid item xs={12}>
                            <Calendar
                                onChange={onChangeDateHandler}
                                value={checkedDate}
                                locale='en-US'
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button className={classes.addDateButton} onClick={addDateHandler} color="primary">
                                Add date
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            {formValues.timeSlots.length > 0 && <div className={classes.checkedItems}>
                                <div>Checked Dates:</div>
                                <ul>
                                    {formValues.timeSlots.map((i: Date) => <li
                                        key={'timeslotkey-'+new Date(Number(i)).toLocaleString()}>{new Date(Number(i)).toLocaleDateString()}
                                        <IconButton aria-label="settings" className={classes.deleteDateButton}
                                                    value={JSON.stringify(i)} onClick={deleteDateHandler}>
                                            <ClearIcon/>
                                        </IconButton>
                                    </li>)}
                                </ul>
                            </div>
                            }
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={closeFormHandler} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={formSubmitHandler} type='submit' color="primary">
                            Edit
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
};


const mapStateToProps = (state: any) => ({
    _id: state.user._id
});
export default connect(mapStateToProps)(EditApartmentModal);