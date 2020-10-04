import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import {connect} from "react-redux";
import classes from "./Navbar.module.css"
import {setUser} from "../../redux/mainReducer";
import {useRouter} from "next/router";

const Navbar = (props:any) => {
    const router = useRouter();

    const logoutButtonHandler = () => {
        props.setUser({login:'',role:'',_id:''});
        router.push('/');
    };

    return (
        <div className={classes.container}>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Booking
                    </Typography>
                    <Button color="inherit" onClick={logoutButtonHandler} className={classes.exitButton}>Logout</Button>
                </Toolbar>
            </AppBar>

        </div>
    )
};

export default connect(null,{setUser})(Navbar);