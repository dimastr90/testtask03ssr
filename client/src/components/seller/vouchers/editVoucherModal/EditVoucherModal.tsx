import React, {useEffect, useState} from "react";
import Button from "@material-ui/core/Button";
import {connect} from "react-redux";
import classes from "./EditVoucherModal.module.css"
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid, IconButton, InputLabel, MenuItem, Select,
    TextField
} from "@material-ui/core";
import {toast} from "react-toastify";
import {useMutation} from "@apollo/react-hooks";
import {UPDATE_VOUCHER_MUTATION} from "./graphql";
import ClearIcon from '@material-ui/icons/Clear';
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
    qty: string
    variant: string
    ownerId: string
}

interface IUpdateVoucherInBase {
    _id:string
    name: string
    description: string
    image: string | ArrayBuffer | null
    imageName:string
    price: number
    qty: number
    variant: string
}

const EditVoucherModal = (props: any) => {
    const [updateVoucher, {data}] = useMutation(UPDATE_VOUCHER_MUTATION);
    const [formValues, setFormValues] = useState<IformValues>({
        ...props.data,
        price: props.data.price + '',
        qty: props.data.qty + ''
    });
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
        const {_id, name, description, image, price, qty,variant} = formValues;
        if (name.trim().length < 1) {
            toast.dark('Incorrect name');
        } else if (description.trim().length < 1) {
            toast.dark('Incorrect description');
        } else if (!Number(price.toString().trim())) {
            toast.dark('Incorrect price');
        } else if (!Number(qty.toString().trim())) {
            toast.dark('Incorrect quantity');
        } else {
            const data = {
                _id,
                name,
                description,
                price: Number(price),
                qty: Number(qty),
                imageName: image.name,
                image: image.dataUrl,
                variant
            };
            await updateVoucherInBase(data);
            props.setShowEditModal(false);
            props.setEditModalData({
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
        }
    };

    const updateVoucherInBase = async (sendingData: IUpdateVoucherInBase) => {
        try {
            await updateVoucher({variables: {...sendingData}});
            toast.dark('Voucher is updated');
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
                formValues.image.dataUrl = reader.result;
                formValues.image.name = name;
            }
        }
    };

    const deleteImageHandler = () => {
        const image = {name: '', dataUrl: ''};
        setFormValues({...formValues, image});
    };



    return (
        <>
            <Dialog open={props.showEditModal} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit voucher</DialogTitle>
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
                            {formValues.image.name && <>
                                <p>Image: {formValues.image.name} <IconButton
                                    aria-label="settings" className={classes.deleteButton}
                                    onClick={deleteImageHandler}>
                                    <ClearIcon/></IconButton></p>
                            </>}
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={closeFormHandler} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={formSubmitHandler} type='submit' color="primary">
                            Edit voucher
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
export default connect(mapStateToProps)(EditVoucherModal);