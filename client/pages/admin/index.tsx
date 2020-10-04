import React, {useState} from 'react';
import {connect} from "react-redux";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {Button, Grid, Typography} from "@material-ui/core";
import classes from "../../styles/admin.module.css"
import {useQuery} from "@apollo/react-hooks";
import {GET_APARTMENTS, GET_BOOKINGS} from "../../src/components/adminComponent/graphql";
import {requestToApi} from "../../src/modules/request";
import getConfig from "next/dist/next-server/lib/runtime-config";
import NavbarLayout from "../../Layouts/NavbarLayout";
import {useRouter} from "next/router";


const {publicRuntimeConfig} = getConfig();

const {graphqlUri} = publicRuntimeConfig;


const Index = (props:any) => {
    const router = useRouter();
    const [report, setReport] = useState<any>([]);
    const [startDate, setStartDate] = useState<any>(new Date().setHours(0, 0, 0, 0));
    const [endDate, setEndDate] = useState<any>(new Date().setHours(0, 0, 0, 0));
    const {loading: bookingsLoading, error: bookingsError, data: bookingsData} = useQuery(GET_BOOKINGS);
    const {loading: apartmentsLoading, error: apartmentsError, data: apartmentsData} = useQuery(GET_APARTMENTS);


    const makeReportButtonHandler = () => {
        createReport()
    };


    const createReport = () => {
        const result: any = {};
        const start = +startDate;
        const end = +endDate;
        const bookings = [...bookingsData.bookings];
        const apartments = [...apartmentsData.apartments];
        let maxRooms = 0;

        if (apartments) {
            for (let i of apartments) {
                let add = true;
                if (bookings) {
                    for (let k of bookings) {
                        if (k.apartment._id === i._id) {
                            const isBooked = k.timeSlots.some((i: any) => Number(i) >= start && Number(i) <= end);
                            if (isBooked) {
                                add = false;
                                break;
                            }
                        }
                    }
                }
                if (add) {
                    maxRooms = Math.max(maxRooms, i.rooms);
                    if (result.hasOwnProperty(i.rooms)) {
                        result[i.rooms] += 1;
                    } else {
                        result[i.rooms] = 1;
                    }
                }
            }
        }

        const view = [];
        for (let i = maxRooms; i > 0; i--) {
            if (result.hasOwnProperty(i)) {
                view.push([i, result[i]]);
            }
        }
        setReport(view);
    };

if(props.user.role === 'admin') {
    return (
        <NavbarLayout>
            <Grid container direction="column"
                  alignItems="center"
                  justify="center">
                <Grid item xs={12} md={3} lg={6}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="dd/MM/yyyy"
                            margin="normal"
                            className={classes.calendar}
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
                            className={classes.calendar}
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
                </Grid>
                <Grid item xs={12}>
                    <Button className={classes.button} onClick={makeReportButtonHandler} variant="contained"
                            color="primary">
                        Make Report
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    {report.length > 0 && <>
                        <div className={classes.report}>
                            <Typography variant="h5" gutterBottom>
                                Report(unbooked apartments):
                            </Typography>
                            {report.map((i: any) =>
                                <Typography variant="body1" gutterBottom key={i[0]}>
                                    {`${i[0]} rooms: ${i[1]}`}
                                </Typography>)}
                        </div>
                    </>}
                </Grid>
            </Grid>
        </NavbarLayout>
    )
}
return <></>;
};

const mapStateToProps = (state: any) => ({
    user:state.user
});

export default connect(mapStateToProps)(Index);