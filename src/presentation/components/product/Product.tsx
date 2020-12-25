import React from 'react';
import { useDispatch } from 'react-redux';
import {
    makeStyles,
    Avatar,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Typography,
    Divider,
    Button,
    ButtonGroup,
    FormControlLabel,
    Checkbox,
} from '@material-ui/core';
import { Favorite, FavoriteBorder } from '@material-ui/icons';
import ExposureNeg1Icon from '@material-ui/icons/ExposureNeg1';
import PlusOneIcon from '@material-ui/icons/PlusOne';
import EventIcon from '@material-ui/icons/Event';
import { IProduct } from 'src/domain/interfaces';

import notify from 'src/redux/notifications/actions';
import { useTraductor } from 'src/hooks/Traductor';

const useStyles = makeStyles({
    main: {
        justifyContent: 'space-between'
    },
    avatar: {
        marginRight: '1.5rem',
        width: '100px',
        height: '100px',
    },
    mainInfo: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    actions: {
        display: 'flex',
        flexDirection: 'column'
    },
    productInfo: {},
    amounActions: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    productFavoriteColorIcon: {
        color: 'red'
    },
    cursorFavorite: {
        cursor: 'pointer'
    }

});

const Product = (props: any) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const traductor = useTraductor();

    const onProductAmountClicked = () => {

        let product: IProduct = Object.assign({}, props.product);
        dispatch(
            notify.showNotification({
                product,
                type: 'productQty',
                onOk: (amount: any) => {
                    if (amount !== null && amount !== '' && isNaN(amount) === false)
                        product.amount = parseInt(amount);

                    props.onProductAmountModified(product);
                }
            })
        )
    }

    const onProductClickPlus = () => {

        let product: IProduct = Object.assign({}, props.product);
        product.amount++;
        props.onProductAmountModified(product);
    }

    const onProductClickMinus = () => {

        let product: IProduct = Object.assign({}, props.product);
        if (product.amount > 0)
            product.amount--;

        props.onProductAmountModified(product);
    }

    const onFavoriteClick = () => {

        let product: IProduct = Object.assign({}, props.product);
        product.favorite = !product.favorite;
        props.onProductFavoriteClicked(product);
    }

    return (

        <React.Fragment>
            <ListItem className={classes.main}>
                <div className={classes.mainInfo}>
                    <ListItemAvatar>
                        <Avatar
                            className={classes.avatar}
                            variant='square'
                            src={props.product.imageUrl}
                            imgProps={{
                                style: { objectFit: 'contain' }
                            }}
                        />
                    </ListItemAvatar>
                    <ListItemText
                        primary={props.product.name}
                        secondary={props.product.price > 0 ? `${props.product.price} €` : ''}
                    />
                </div>
                <div className={classes.actions}>
                    <div>
                        <FormControlLabel
                            onChange={(e: any, isFavorite: any) => onFavoriteClick()}
                            control={<Checkbox icon={<FavoriteBorder />}
                                checkedIcon={<Favorite />}
                                name="favorite" />}
                            label=""
                            style={{ margin: '0' }}
                            checked={props.product.favorite}
                        />
                        {false && <FormControlLabel
                            onChange={(e: any, isCkecked: any) => console.log('calendar', isCkecked)}
                            control={<Checkbox icon={<EventIcon />}
                                checkedIcon={<EventIcon style={{ color: '#2196F3' }} />}
                                name="calendar" />}
                            label=""
                            style={{ margin: '0' }}
                        />}
                    </div>
                    <ButtonGroup
                        size="small"
                        aria-label="small outlined button group"
                        style={{ height: 'fit-content' }}
                    >
                        <Button
                            style={{ backgroundColor: '#91CBF9' }}
                            onClick={(e: any) => onProductClickPlus()}>
                            <PlusOneIcon />
                        </Button>
                        <Button onClick={(e: any) => onProductClickMinus()}>
                            <ExposureNeg1Icon />
                        </Button>
                    </ButtonGroup>
                    <Typography
                        id={'item-qty'}
                        variant="body1"
                        gutterBottom
                        style={{ cursor: 'pointer', whiteSpace: 'pre', margin: '0' }}
                        onClick={(e: any) => onProductAmountClicked()}
                    >
                        {`${traductor('total', {onlyfirst:true})}: ${props.product.amount}`}
                    </Typography>
                </div>
            </ListItem>
            <Divider />
        </React.Fragment>
    )
}

export default Product;
