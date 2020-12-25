import { ICenter, IProduct, ISeller } from "src/domain/interfaces";
import Actions from "./enumActions";
import lodash from 'lodash';
import useStore from 'src/redux/store/index';


export default (errorCallback: (error: string) => void): any => {

    return {

        saveProductToCart: (product: IProduct) => (dispatch: any) => {

            try {

                let products = [...useStore().getState().cart.products];
                if (products.length === 0)
                    products.push(product);
                else {
                    const index: number = lodash.findIndex(products, (p: IProduct) => {

                        return p.id === product.id

                    }, 0);

                    if (index === -1)
                        products.push(product);
                    else
                        products[index] = product;
                }

                dispatch({
                    type: Actions.SAVE_PRODUCT_TO_CART,
                    payload: products
                })

            }
            catch (error) {
                errorCallback(error.message);
            }
        },

        deleteProductFromCart: (product: IProduct) => (dispatch: any) => {

            try {

                let products: IProduct[] = [...useStore().getState().cart.products];

                if (products.length === 0)
                    return;

                const index: number = lodash.findIndex(products, (p: IProduct) => {

                    return p.id === product.id

                }, 0);

                if (index !== -1)
                    lodash.remove(products, (p: IProduct) => {

                        return p.id === product.id
                    })

                dispatch({
                    type: Actions.DELETE_PRODUCT_FROM_CART,
                    payload: products
                })

            }
            catch (error) {
                errorCallback(error.message);
            }
        },

        saveCenterToCart: (center: ICenter | null) => (dispatch: any) => {

            try {
                dispatch({
                    type: Actions.SAVE_CENTER_TO_CART,
                    payload: center
                })
            }
            catch (error) {
                errorCallback(error.message);
            }

        },

        saveSupplierToCart: (supplier: ISeller | null) => (dispatch: any) => {

            try {
                dispatch({
                    type: Actions.SAVE_SUPPLIER_TO_CART,
                    payload: supplier
                })
            }
            catch (error) {
                errorCallback(error.message);
            }
        },

        deleteProductsFromCart: (dispatch: any) => {

            try {
                dispatch({
                    type: Actions.CLEAN_PRODUCTS_IN_CART
                })
            }
            catch (error) {
                errorCallback(error.message);
            }
        },

        cleanCart: (dispatch: any) => {

            try {
                dispatch({
                    type: Actions.CLEAN_CART
                })
            }
            catch (error) {
                errorCallback(error.message);
            }
        }

    }

}
