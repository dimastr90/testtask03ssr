import React, {useEffect, useState} from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    TextField,
    Typography
} from "@material-ui/core";
import {toast} from "react-toastify";
import {connect} from "react-redux";
import {useMutation} from "@apollo/react-hooks";
import {ADD_ORDER_MUTATION} from "./graphql";
import {useRouter} from "next/router";


interface IitemData {
    _id: string
    name: string
    description: string
    price: number
    ownerId:string
    variant: string
    qty: number | string
}

interface IaddOrderToBase {
    price: number
    variant: string
    qty: number
    voucherId: string
    buyerId: string
    ownerId:string
    buyerLast: string
    buyerFirst: string
    buyerEmail: string
}

const AddOrderModal = (props: any) => {
    const [addOrder, {data}] = useMutation(ADD_ORDER_MUTATION);
    const [itemData, setItemData] = useState<IitemData>({
        _id: '',
        name: '',
        description: '',
        ownerId:'',
        price: 0,
        variant: '',
        qty: 0
    });
    const [formData, setFormData] = useState({
        first: '',
        last: '',
        email: '',
        qty: ''
    });
    const router = useRouter();



    useEffect(() => {
        if (props.addOrderModalData && props.addOrderModalData._id) {
            setItemData({...props.addOrderModalData});
            props.setShowAddOrderModal(true);
        }
    }, [props]);

    const closeFormHandler = () => {
        props.setShowAddOrderModal(false);
        setFormData({
            first: '',
            last: '',
            email: '',
            qty: ''
        });

        props.setAddOrderModalData({
            _id: '',
            name: '',
            description: '',
            price: 0,
            ownerId:'',
            variant: '',
            qty: 0
        });
    };

    const changeFormInputsHandler = (e: any) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const formSubmitHandler = (e: any) => {
        e.preventDefault();
        if (!Number(formData.qty) || Number(formData.qty) < 1 || Number(formData.qty) > itemData.qty) {
            toast.info('Invalid quantity');
        } else if (formData.last.trim().length < 1 || formData.first.trim().length < 1 || formData.email.trim().length < 1) {
            toast.info('Incorrect buyer info');
        } else if (!(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(formData.email.trim()))) {
            toast.info('Incorrect email')
        } else {
            const sendingData = {
                buyerFirst:formData.first,
                buyerLast:formData.last,
                buyerEmail:formData.email,
                price: Number(formData.qty) * itemData.price,
                buyerId: props.buyerId,
                ownerId:itemData.ownerId,
                voucherId: itemData._id,
                variant: itemData.variant,
                qty:Number(formData.qty)
            };
            addOrderToBase(sendingData);
            closeFormHandler();
        }
    };


    const addOrderToBase = async (sendingData: IaddOrderToBase) => {
        try {
            await addOrder({variables: {...sendingData}});
            toast.dark('Order is added');
            router.push('/buyer');
        } catch (e) {
            toast.error(e.message || 'Error with apartment saving');
        }
    };

    return (
        <>
            <Dialog open={props.showAddOrderModal} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add new order</DialogTitle>
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
                                Variant: {itemData.variant}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1" gutterBottom>
                                Available: {itemData.qty}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField name='qty' value={formData.qty}
                                       onChange={changeFormInputsHandler} label="Quantity" autoComplete='off'/>
                        </Grid>

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
                            {Number(formData.qty) > 0 && <Typography variant="h5" gutterBottom>
                                Total sum: {Number(formData.qty) * itemData.price}
                            </Typography>
                            }
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={closeFormHandler} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={formSubmitHandler} type='submit' color="primary">
                            Add order
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

export default connect(mapStateToProps)(AddOrderModal);