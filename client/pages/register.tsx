import React, {useEffect, useState} from "react";
import {Button, Container, FormControlLabel, Grid, Radio, RadioGroup, TextField} from "@material-ui/core";
import {toast} from "react-toastify";
import AddBoxIcon from '@material-ui/icons/AddBox';
import classes from '../src/components/register/register.module.css';
import {ADD_USER_MUTATION} from "../src/components/register/graphql";
import {useMutation} from 'react-apollo';
import {connect} from "react-redux";
import {setUser} from "../src/redux/mainReducer";
import Link from "next/link";
import MainLayout from "../Layouts/MainLayout";
import {useRouter} from "next/router";


const Register = (props: any) => {
    const [addUser, {data}] = useMutation(ADD_USER_MUTATION);
    const [login, setLogin] = useState('');
    const [radio, setRadio] = useState('seller');
    const router = useRouter();

    useEffect(() => {
            if (props.user.role) {
                router.push('/');
            }
        });

    const onChangeFormHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setLogin(e.target.value);
    };

    const onRadioChangeHandler = (e: any): void => {
        setRadio(e.target.value);
    };

    const submitFormHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const entry: any = await addUser({variables: {login: login, role: radio}});
            props.setUser({login, role: radio, _id: entry.data.addUser._id});
            toast.dark('User is added');
            router.push('/');
        } catch (e) {
            toast.dark(e.message || 'Something went wrong')
        }
    };

    return (
        <MainLayout>
            <Container className="mainContainer" maxWidth="lg">
                <Grid container spacing={2} justify="center">
                    <form className={classes.registerForm} onSubmit={submitFormHandler}>
                        <Grid item xs={12}>
                            <div className={classes.iconContainer}>
                                <AddBoxIcon className={classes.icon}/>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <div className={classes.labelContainer}>
                                Register
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField className={classes.inputs} name='login' label="Enter login"
                                       variant="outlined"
                                       value={login}
                                       onChange={onChangeFormHandler}/>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid item xs={12}>
                                <RadioGroup aria-label="gender" name="gender1" value={radio}
                                            onChange={onRadioChangeHandler}>
                                    <FormControlLabel value="seller" control={<Radio/>} label="Seller"/>
                                    <FormControlLabel value="buyer" control={<Radio/>} label="Buyer"/>
                                    <FormControlLabel value="admin" control={<Radio/>} label="Admin"/>
                                </RadioGroup>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="secondary"
                            >
                                Register
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <div className={classes.goToLogin}>
                                <Link href="/login"><a>Return to login page</a></Link>
                            </div>
                        </Grid>
                    </form>
                </Grid>
            </Container>
        </MainLayout>
    )
};


const mapStateToProps = (state: any) => ({
    user: state.user
});

export default connect(mapStateToProps, {setUser})(Register);