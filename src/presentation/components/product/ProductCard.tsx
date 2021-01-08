import React from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    ButtonGroup,
    Button,
    Typography,
    FormControlLabel,
    Checkbox,
    Grid,
} from '@material-ui/core';
import {
    Favorite,
    FavoriteBorder,
    Event,
    PlusOne,
    ExposureNeg1,
} from '@material-ui/icons'

import { IProduct } from 'src/domain/interfaces';
import notify from 'src/redux/notifications/actions';
import { useTraductor } from 'src/hooks/Traductor';

const useStyles = makeStyles({
    root: {
        maxWidth: 290,
        margin: '10px auto',
        height: 340,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    media: {
        backgroundSize: 'contain',
        height: 160,
        marginTop: '10px'
    },
});

const ProductCard = (props: any) => {

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
        <Card className={classes.root}>
            <CardMedia
                className={classes.media}
                image={props.product.imageUrl}
                title={props.product.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {props.product.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {props.product.price > 0 ? `${props.product.price} €` : ''}
                </Typography>
            </CardContent>
            <CardActions>
                <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                >
                    <Grid item>
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
                            control={<Checkbox icon={<Event />}
                                checkedIcon={<Event style={{ color: '#2196F3' }} />}
                                name="calendar" />}
                            label=""
                            style={{ margin: '0' }}
                        />}
                    </Grid>
                    <Grid item>
                        <ButtonGroup
                            size="small"
                            aria-label="small outlined button group"
                            style={{ height: 'fit-content' }}
                        >
                            <Button
                                style={{ backgroundColor: '#91CBF9' }}
                                onClick={(e: any) => onProductClickPlus()}>
                                <PlusOne />
                            </Button>
                            <Button onClick={(e: any) => onProductClickMinus()}>
                                <ExposureNeg1 />
                            </Button>
                        </ButtonGroup>
                        <Typography
                            id={'item-qty'}
                            variant="body1"
                            gutterBottom
                            style={{ cursor: 'pointer', whiteSpace: 'pre', margin: '0' }}
                            onClick={(e: any) => onProductAmountClicked()}
                        >
                            {`${traductor('total', { onlyfirst: true })}: ${props.product.amount}`}
                        </Typography>
                    </Grid>
                </Grid>
            </CardActions>
        </Card>
    );
};

export default ProductCard;