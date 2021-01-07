// @ts-nocheck
import React from 'react';
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux';
import notificationActions from 'src/redux/notifications/actions'
import { DatePicker } from '@material-ui/pickers';
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";

const materialTheme = createMuiTheme({
    overrides: {
        MuiPickersToolbar: {
            toolbar: {
                backgroundColor: '#2196F3',
            },
        },
        MuiPickersDay: {
            day: {},
            daySelected: {
                backgroundColor: '#2196F3',
            },
            dayDisabled: {},
            current: {
                color: '#2196F3',
            },
        },
        MuiPickersModal: {
            dialogAction: {
                color: '#2196F3',
            },
        },
    },
});

export default function DatePickerDialog() {

    const dispatch = useDispatch();
    const {
        show,
        initialDate = new Date(),
        availableDates = [],
        selectedDate = () => { },
        onMonthChanged = () => { }
    } = useSelector((state: any) => state.notifications);

    const handleClose = () => {
        dispatch(notificationActions.hideNotification());
    };


    return (
        <ThemeProvider theme={materialTheme}>

            <DatePicker
                open={show}
                value={initialDate}
                onChange={(date: DateIOType) => selectedDate(date.toDate())}
                shouldDisableDate={(day) => {
                    return !availableDates.some((date: any) => day?.isSame(moment(date), 'day'))
                }}
                onClose={handleClose}
                TextFieldComponent={() => <div />}
                disablePast={true}
                onMonthChange={(date: DateIOType) => onMonthChanged(new Date(date.toDate()).getMonth(), new Date(date.toDate()).getFullYear())}
            />
        </ThemeProvider>
    );
};
