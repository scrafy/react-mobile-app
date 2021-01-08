import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';

const useStyles = makeStyles({
    formControl: {
        margin: '10px auto',
        width: '100%',
        maxWidth: '20rem',
    },
    selectEmpty: {
        // marginTop: '10px,
    },
});

export default function SimpleSelect({
    handleChange=()=>{},
    value='',
    label='',
    id='',
    selectoptions=[],
    ...props
} : any) {
    const classes = useStyles();

    return (
        <FormControl variant="filled" className={classes.formControl}>
            <InputLabel id="simple-select-outlined-label">{label}</InputLabel>
            <Select
                {...props}
                labelId="simple-select-outlined-label"
                id={id}
                value={value}
                onChange={handleChange}
                label={label}
            >
                {
                    selectoptions.map((option : any, i : any) => {
                        const { value='', key=i, label='' } = option;
                        return (
                            <MenuItem key={key} value={value}>{label}</MenuItem>
                        )
                    })
                }
            </Select>
        </FormControl>
    );
}
