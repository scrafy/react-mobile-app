import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function TemporaryDrawer({ open=false, setOpen, options=[] }: any) {
    const classes = useStyles();

    const list = () => (
        <div
            className={clsx(classes.list)}
            role="presentation"
            onClick={(e:any) => setOpen(false)}
            onKeyDown={(e:any) => setOpen(false)}
        >
            <List>
                {
                    options.map(((option:any, index:any) => (
                        <ListItem 
                            button 
                            key={index} 
                            onClick={(e:any) => option.action(e)}
                        >
                            <ListItemIcon>{option.icon || null}</ListItemIcon>
                            <ListItemText primary={option.text} />
                        </ListItem>
                    )))
                }
            </List>
        </div>
    );

    return (
        <div style={{ marginTop: '70px'}}>
        {
            <React.Fragment key={'left'}>
                {/* <Button onClick={(e:any) => setOpen(true)}>{'left'}</Button> */}
                <Drawer anchor={'left'} open={open} onClose={(e:any) => setOpen(false)}>
                    {list()}
                </Drawer>
            </React.Fragment>
        }
        </div>
    );
};
