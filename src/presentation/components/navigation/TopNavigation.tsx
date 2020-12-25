import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

const useStyles = makeStyles({
    bar: {
        marginTop: 70,
        marginBottom:25
    },
    action: {
        '&$selected': {
            color: '#2196F3',
            borderBottom: '2px solid #2196F3',
        }
    },
    selected: {
    },
});

export default function TopNavigation({
    navOptions = [],
    handleNavChange = () => { },
    navValue = 0,
    ...props
}: any) {
    const classes = useStyles();

    return (
        <BottomNavigation
            {...props}
            value={navValue}
            onChange={handleNavChange}
            showLabels
            className={classes.bar}
        >
            {
                navOptions.map(({ label = '', icon = null}: any) => {
                    return (
                        <BottomNavigationAction
                            key={label}
                            classes={{ root: classes.action, selected: classes.selected }}
                            label={label}
                            icon={icon}
                        />
                    )
                })
            }
        </BottomNavigation>
    );
};