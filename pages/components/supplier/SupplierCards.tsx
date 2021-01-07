import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Grid,
} from '@material-ui/core';

import { ISeller } from 'src/domain/interfaces';

const useStyles = makeStyles({
    container: {
        marginTop: '80px',
        height: 'calc(100vh - 80px)',
        overflow: 'auto',
    },
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
    },
});

const SupplierCards = ({ suppliers = [] }: any) => {
    const classes = useStyles();

    return (
        <Grid container wrap={'wrap'} className={classes.container}>
            {
                suppliers.map((supplier: ISeller) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={supplier.id}>
                        <Card className={classes.root}>
                            <CardMedia
                                className={classes.media}
                                image={supplier.imageUrl}
                                title={supplier.companyName}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {supplier.companyName}
                                </Typography>
                                <Typography variant="body1" color="textSecondary" component="p">
                                    {supplier.email}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {supplier.address}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {`${supplier.city}, ${supplier.postalCode}`}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {supplier.province}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))
            }
        </Grid>
    )
};

export default SupplierCards;