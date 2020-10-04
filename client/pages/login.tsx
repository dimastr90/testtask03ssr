import React, {useEffect, useState} from "react";
import {Button, Container, Grid, TextField} from "@material-ui/core";
import {toast} from "react-toastify";
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import classes from '../src/components/login/login.module.css';
import {useLazyQuery} from "@apollo/react-hooks";
import {GET_USER_QUERY} from "../src/components/login/graphql";
import {connect} from "react-redux";
import {setUser} from "../src/redux/mainReducer";
import Link from 'next/link';
import {useRouter} from "next/router";
import MainLayout from "../Layouts/MainLayout";

const Login = (props: any) => {
    const [login, setLogin] = useState('');
    const [getUser, {loading, data}] = useLazyQuery(GET_USER_QUERY);
    const router=useRouter();

    useEffect(() => {
        if(props.user.role){
            router.push('/')
        }else if (data && data.userByLogin !== null) {
            props.setUser({...data.userByLogin});
            router.push('/')
        }else if(login && data){
            toast.info('Incorrect login')
        }
    }, [data]);




    const onChangeFormHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setLogin(e.target.value);
    };

    const submitFormHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(login.trim().length<1){
            toast.info('Input field is empty');
        }else {
            getUser({variables: {login}});
        }
    };

    return (
        <MainLayout>
            <Container className="mainContainer" maxWidth="lg">
                <Grid container spacing={2} justify="center">
                    <form className={classes.loginForm} onSubmit={submitFormHandler}>
                        <Grid item xs={12}>
                            <div className={classes.iconContainer}>
                                <AssignmentIndIcon className={classes.icon}/>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <div className={classes.labelContainer}>
                                Login
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField className={classes.inputs} name='login' label="Enter Login"
                                       variant="outlined"
                                       value={login}
                                       autoComplete='off'
                                       onChange={onChangeFormHandler}/>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                            >
                                Login
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <div className={classes.goToRegister}>
                                <Link href="/register"><a>Don't have an account? Register...</a></Link>
                            </div>
                        </Grid>
                    </form>
                </Grid>
            </Container>
        </MainLayout>
    )
};

const mapStateToProps = (state: any) => ({
    user:state.user
});

export default connect(mapStateToProps, {setUser})(Login);