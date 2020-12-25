import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

const useStyles = makeStyles({
    bar: {
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#2196F3',
    },
    action: {
        color: '#A8D4F9',
        '&$selected': {
            color: 'white'
        }
    },
    selected: {
        
    },
});

export default function SimpleBottomNavigation({
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