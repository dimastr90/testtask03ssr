import React, {useState} from "react";
import Button from "@material-ui/core/Button";
import {connect} from "react-redux";
import classes from "./AddVoucherModal.module.css"
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid, InputLabel, MenuItem, Select,
    TextField
} from "@material-ui/core";
import {toast} from "react-toastify";
import {useMutation} from "@apollo/react-hooks";
import {ADD_VOUCHER_MUTATION} from "./graphql";
import {useRouter} from "next/router";

interface IformValues {
    name: string
    description: string
    image: string | null | ArrayBuffer
    imageName:string
    price: string
    qty: string
    variant: string
}

interface IaddVoucherToBase {
    name: string
    description: string
    image: string
    imageName:string
    price: number
    qty: number
    variant: string
    ownerId: string
}


const AddVoucherModal = (props: any) => {
    const [addVoucher, {data}] = useMutation(ADD_VOUCHER_MUTATION);
    const [formValues, setFormValues] = useState<IformValues>({
        name: '',
        description: '',
        image: '',
        imageName:'',
        price: '',
        qty: '',
        variant: 'cinema'
    });

    const router = useRouter();


    const closeFormHandler = () => {
        props.setShowAddModal(false);
    };

    const changeInputsHandler = (e: any) => {
        setFormValues({...formValues, [e.target.name]: e.target.value});
    };

    const formSubmitHandler = async (e: any) => {
        e.preventDefault();
        const {name, description, image, price, qty} = formValues;
        if (name.trim().length < 1) {
            toast.dark('Incorrect name');
        } else if (description.trim().length < 1) {
            toast.dark('Incorrect description');
        } else if (!Number(price.trim())) {
            toast.dark('Incorrect price');
        } else if (!Number(qty.trim())) {
            toast.dark('Incorrect quantity');
        } else {
            const data = {
                ...formValues,
                image: image ? image.toString() : '',
                price: Number(formValues.price),
                qty: Number(formValues.qty),
                ownerId: props._id
            };
            await addVoucherToBase(data);
            props.setShowAddModal(false);
            setFormValues({
                name: '',
                description: '',
                image: '',
                imageName:'',
                price: '',
                qty: '',
                variant: 'cinema'
            });
        }
    };

    const addVoucherToBase = async (sendingData: IaddVoucherToBase) => {
        try {
            await addVoucher({variables: {...sendingData}});
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


    return (
        <>
            <Dialog open={props.showAddModal} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add new voucher</DialogTitle>
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
                            <InputLabel>Variant</InputLabel>
                            <Select
                                name='variant'
                                className={classes.input}
                                value={formValues.variant}
                                onChange={changeInputsHandler}
                                label="Variant"
                            >
                                <MenuItem value={'restaurant'}>Restaurant</MenuItem>
                                <MenuItem value={'club'}>Club</MenuItem>
                                <MenuItem value={'museum'}>Museum</MenuItem>
                                <MenuItem value={'cinema'}>Cinema</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField className={classes.input} name='qty' value={formValues.qty}
                                       onChange={changeInputsHandler} label="Quantity" autoComplete='off'/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                className={classes.input}
                                name="upload-photo"
                                type="file"
                                onChange={imageChangeHandler}
                            />
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={closeFormHandler} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={formSubmitHandler} type='submit' color="primary">
                            Add voucher
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
export default connect(mapStateToProps)(AddVoucherModal);