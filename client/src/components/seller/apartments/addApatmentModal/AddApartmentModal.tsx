import React, {useState} from "react";
import Button from "@material-ui/core/Button";
import {connect} from "react-redux";
import classes from "./AddApartmentModal.module.css"
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
import {ADD_APARTMENT_MUTATION} from "./graphql";
import {useRouter} from "next/router";

interface IformValues {
    name: string
    description: string
    image: string | null | ArrayBuffer
    imageName:string
    price: string
    rooms: string
    timeSlots: Date[]
}

interface IaddApartmentToBase {
    name: string
    description: string
    image: string
    imageName:string
    price: number
    rooms: number
    timeSlots: string[]
    ownerId: string
}


const AddApartmentModal = (props: any) => {
    const [addApartment, {data}] = useMutation(ADD_APARTMENT_MUTATION);
    const [formValues, setFormValues] = useState<IformValues>({
        name: '',
        description: '',
        image: '',
        imageName:'',
        price: '',
        rooms: '',
        timeSlots: []
    });
    const [checkedDate, setCheckedDate] = useState(new Date());
    const router = useRouter();


    const closeFormHandler = () => {
        props.setShowAddModal(false);
    };

    const changeInputsHandler = (e: any) => {
        setFormValues({...formValues, [e.target.name]: e.target.value});
    };

    const formSubmitHandler = async (e: any) => {
        e.preventDefault();
        const {name, description, image, price, rooms} = formValues;
        if (name.trim().length < 1) {
            toast.dark('Incorrect name');
        } else if (description.trim().length < 1) {
            toast.dark('Incorrect description');
        } else if (!Number(price.trim())) {
            toast.dark('Incorrect price');
        } else if (!Number(rooms.trim())) {
            toast.dark('Incorrect quantity of rooms');
        } else {
            const timeSlots = [...formValues.timeSlots.map((i:any)=>Date.parse(i).toString())];
            const data = {
                ...formValues,
                image: image ? image.toString() : '',
                price: Number(formValues.price),
                rooms: Number(formValues.rooms),
                ownerId: props._id,
                timeSlots
            };
            await addApartmentToBase(data);
            props.setShowAddModal(false);
            setFormValues({
                name: '',
                description: '',
                image: '',
                imageName:'',
                price: '',
                rooms: '',
                timeSlots: []
            });
        }
    };

    const addApartmentToBase = async (sendingData: IaddApartmentToBase) => {
        try {
            await addApartment({variables: {...sendingData}});
            toast.dark('Apartment is added');
            router.push(props._id);
        }catch (e) {
            toast.error(e.message || 'Error with apartment saving');
        }
    };

    const imageChangeHandler = (e: any) => {
        if (e.target.files[0]) {
            const name = e.target.files[0].name;
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onloadend = () => {
                formValues.image = reader.result;
                formValues.imageName = name;
            }
        }
    };

    const onChangeDateHandler = (date: any) => {
        setCheckedDate(date);
    };

    const addDateHandler = () => {
        const today = new Date();
        if (checkedDate < today) {
            toast.dark('Incorrect date')
        } else if (formValues.timeSlots.includes(checkedDate)) {
            toast.dark('Date is already checked');
        } else {
            setFormValues({...formValues, timeSlots: [...formValues.timeSlots, checkedDate]});
        }
    };

    const deleteDateHandler = (e: any) => {
        const changedArray = formValues.timeSlots.filter(i => JSON.stringify(i) !== e.currentTarget.value);
        setFormValues({...formValues, timeSlots: changedArray});
    };


    return (
        <>
            <Dialog open={props.showAddModal} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add new apartment</DialogTitle>
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
                                        key={i.getDate()}>{i.toLocaleDateString()}
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
                            Add apartment
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
export default connect(mapStateToProps)(AddApartmentModal);