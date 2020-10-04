import React, {useEffect, useState} from "react";
import {
    Button, Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, FormControlLabel,
    Grid,
    TextField,
    Typography
} from "@material-ui/core";
import {toast} from "react-toastify";
import {useMutation} from "@apollo/react-hooks";
import {ADD_BOOKING_MUTATION} from "./graphql";
import {connect} from "react-redux";
import {useRouter} from "next/router";

interface IitemData {
    _id: string
    name: string
    description: string
    price: number
    ownerId:string
    timeSlots: string[]
    rooms: number
}

interface IformData {
    first: string
    last: string
    email: string
    timeSlots: string[]
}

interface IaddBookingToBase {
    price: number
    rooms: number
    timeSlots:string[]
    apartmentId: string
    buyerId: string
    ownerId:string
    buyerLast: string
    buyerFirst: string
    buyerEmail: string
}

const AddBookingModal = (props: any) => {
    const [addBooking, {data}] = useMutation(ADD_BOOKING_MUTATION);
    const [itemData, setItemData] = useState<IitemData>({
        _id: '',
        name: '',
        description: '',
        price: 0,
        ownerId:'',
        timeSlots: [],
        rooms: 0
    });
    const [formData, setFormData] = useState<IformData>({
        first: '',
        last: '',
        email: '',
        timeSlots: []
    });
    const router = useRouter();


    useEffect(() => {
        if (props.addBookingModalData && props.addBookingModalData._id) {
            setItemData({...props.addBookingModalData});
            props.setShowAddBookingModal(true);
        }
    }, [props]);


    const closeFormHandler = () => {
        props.setShowAddBookingModal(false);
        setFormData({
            first: '',
            last: '',
            email: '',
            timeSlots: []
        });
        props.setAddBookingModalData({
            _id: '',
            name: '',
            rooms: 0,
            ownerId:'',
            description: '',
            price: 0,
            timeSlots: [],
        });
    };


    const changeFormInputsHandler = (e: any) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const formSubmitHandler = (e: any) => {
        e.preventDefault();
            const sendingData = {
                buyerFirst:formData.first,
                buyerLast:formData.last,
                buyerEmail:formData.email,
                price: formData.timeSlots.length * itemData.price,
                buyerId: props.buyerId,
                ownerId:itemData.ownerId,
                apartmentId: itemData._id,
                rooms: Number(itemData.rooms),
                timeSlots:formData.timeSlots
            };
            addBookingToBase(sendingData);
            closeFormHandler();
    };

    const addBookingToBase = async (sendingData: IaddBookingToBase) => {
        try {
            await addBooking({variables: {...sendingData}});
            toast.dark('Booking is added');
            router.push('/buyer');
        } catch (e) {
            toast.error(e.message || 'Error with apartment saving');
        }
    };


    const timeSlotCheckHandler = (e: any) => {
        const value = e.target.value;
        if(e.target.checked){
            if(formData.timeSlots.indexOf(value)===-1){
                const timeSlots = [...formData.timeSlots, value];
                setFormData({...formData, timeSlots});
                console.log(444)
            }
        }else{
            if(formData.timeSlots.indexOf(value)>-1) {
                const timeSlots = formData.timeSlots.filter((i:any)=> i!==value);
                setFormData({...formData, timeSlots: timeSlots});
            }
        }
    };


    return (
        <>
            <Dialog open={props.showAddBookingModal} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add new booking</DialogTitle>
                <form onSubmit={formSubmitHandler}>
                    <DialogContent>
                        <Grid item xs={12}>
                            <Typography variant="body1" gutterBottom>
                                Name: {itemData.name}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1" gutterBottom>
                                Description: {itemData.description}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1" gutterBottom>
                                Price: {itemData.price}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1" gutterBottom>
                                Rooms: {itemData.rooms}
                            </Typography>
                        </Grid>
                        <hr/>
                        <Grid item xs={12}>
                            {itemData.timeSlots.length > 0 && <>
                                <Typography variant="h6" gutterBottom>
                                    Pick date:
                                    {itemData.timeSlots.map((i: any) => <Grid key={i} item xs={12}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    onChange={timeSlotCheckHandler}
                                                    name="dataSlotCheckBox"
                                                    color="primary"
                                                    value={i}
                                                />
                                            }
                                            label={new Date(Number(i)).toLocaleDateString()}
                                        />
                                    </Grid>)}
                                </Typography>
                            </>}
                        </Grid>
                        <hr/>
                        <Grid item xs={12}>
                            <Typography variant="h5" gutterBottom>
                                Buyer info:
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField name='first' value={formData.first}
                                       onChange={changeFormInputsHandler} label="First Name" autoComplete='off'/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField name='last' value={formData.last}
                                       onChange={changeFormInputsHandler} label="Last Name" autoComplete='off'/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField name='email' value={formData.email}
                                       onChange={changeFormInputsHandler} label="E-Mail" autoComplete='off'/>
                        </Grid>
                        <Grid item xs={12}>
                            {formData.timeSlots.length > 0 && <Typography variant="h5" gutterBottom>
                                Total sum: {formData.timeSlots.length * itemData.price}
                            </Typography>
                            }
                        </Grid>
                    </DialogContent>
                    < DialogActions>
                        < Button onClick={closeFormHandler} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={formSubmitHandler} type='submit' color="primary">
                            Add booking
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    )
};


const mapStateToProps = (state: any) => ({
    buyerId: state.user._id
});

export default connect(mapStateToProps)(AddBookingModal);