import React from 'react';
import { useDispatch } from 'react-redux';
import {
    Menu,
    MenuItem,
    ListItemText,
    ListItemIcon,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    InputBase,
    FormControlLabel,
    Switch,
    useMediaQuery,
} from '@material-ui/core';
import { createStyles, fade, Theme, makeStyles } from '@material-ui/core/styles';
import { ArrowBackIosSharp, MoreVert, AccountCircle } from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import notify from 'src/redux/notifications/actions';
import { UnitOfWorkService } from 'src/infraestructure/unitsofwork';
import { useTraductor } from 'src/hooks/Traductor';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1
        },
        barRoot: {
            position: "fixed",
            top: 0,
            backgroundColor: '#2196F3',
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
        search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: fade(theme.palette.common.white, 0.25),
            },
            marginLeft: 0,
            width: '100%',
            [theme.breakpoints.up('xs')]: {
                width: '55px',
                '&:hover': {
                    width: '100%',
                },
                '&:focus': {
                    width: '100%',
                },
            },
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing(1),
                width: 'auto',
                '&:hover': {
                    width: 'auto',
                },
            },
        },
        searchIcon: {
            padding: theme.spacing(0, 2),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputRoot: {
            color: 'inherit',
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: '12ch',
                '&:focus': {
                    width: '20ch',
                },
            },
        },
        vertMenuButton: {
            paddingRight: '0px',
            marginLeft: '1px',
        },
        menu: {
            top: '65px',
            right: '0px',
            left: 'unset',
        }
    }),
);

export default function SearchAppBar({
    handleClickVertMenu = () => { },
    handleClickMenu = () => { },
    handleSearch = () => { },
    handleEnter = () => { },
    setCardView = () => { },
    searchValue = '',
    backIcon = false,
    searchEnabled = false,
    cardView = false,
    showSwitch = true,
    ...props
}: any) {

    const traductor = useTraductor();
    const appBarOptions = [
        {
            text: traductor("cerrar_sesion", { onlyfirst: true }),
            icon: <AccountCircle />,
        },
    ]
    const classes = useStyles();
    const dispatch = useDispatch();
    const isDesktop = useMediaQuery('(min-width:900px)');


    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClickAway = () => {
        setAnchorEl(null);
    };

    const handleClose = () => {
        setAnchorEl(null);
        dispatch(
            notify.showNotification({
                type: 'confirm',
                title: 'Info',
                message: traductor("cerrar_sesion_aviso", { onlyfirst: true }),
                onlyOk: false,
                textOk: traductor("salir", { onlyfirst: true }),
                textClose: traductor("cancelar", { onlyfirst: true }),
                onOk: () => new UnitOfWorkService().getTokenService().removeToken()
            })
        )

    };

    const onSearchEnter = (e: any) => {

        if (e.keyCode === 13)
            handleEnter();
    };

    return (
        <div className={classes.root}>
            <AppBar classes={{ root: classes.barRoot }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleClickMenu}
                    >
                        {backIcon ? <ArrowBackIosSharp /> : <MenuIcon />}
                    </IconButton>
                    <Typography className={classes.title} variant="h6" noWrap>
                        {props.title}
                    </Typography>
                    {
                        (showSwitch && isDesktop) &&
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={cardView}
                                    onChange={setCardView}
                                    name="toggle-card-view"
                                    color="primary"
                                />
                            }
                            label={traductor('cambiar_layout', { capitalize: true })}
                        />
                    }
                    {
                        searchEnabled &&
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder={traductor('buscar', { onlyfirst: true })}
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search', onKeyUp: onSearchEnter }}
                                onChange={handleSearch}
                                value={searchValue}
                            />
                        </div>
                    }
                    <IconButton
                        edge="start"
                        className={classes.vertMenuButton}
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleClick}
                    >
                        {<MoreVert />}
                    </IconButton>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClickAway}
                    >
                        {
                            appBarOptions.map((option: any, i: any) => (
                                <MenuItem
                                    key={i}
                                    onClick={handleClose}
                                >
                                    <ListItemIcon>
                                        {option.icon || null}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={option.text}
                                    />
                                </MenuItem>
                            ))
                        }
                    </Menu>
                </Toolbar>
            </AppBar>
        </div>
    );
};
