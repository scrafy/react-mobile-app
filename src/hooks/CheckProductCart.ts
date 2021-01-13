import { isNull } from 'lodash';
import { useSelector } from 'react-redux';
import { UnitOfWorkUseCase } from 'src/application/unitsofwork';
import { IProduct, ICenter, ISeller, IProductBelongToCenter, IServerResponse } from 'src/domain/interfaces';
import { ProductBelongToCenter } from 'src/domain/models';
import { useTraductor } from './Traductor';
import store from "src/redux/store";

enum TypeMessageCheckProduct {

    SHOW_MESSAGE,
    SHOW_SELECT_CENTER_MESSAGE,
    PRODUCT_NOT_BELONG_TO_CURRENT_CENTER,
    PRODUCT_NOT_BELONG_TO_CURRENT_SUPPLIER,
    DIFFERENT_CENTERS
}


interface ICheckProductCallback {

    typeMessage: TypeMessageCheckProduct,
    product: IProduct,
    message: string
}


const productBelongsToCenter = async (product: IProduct, center: ICenter): Promise<boolean> => {

    try {

        const products: IProduct[] = store.getState().centers.centerProducts;
        if (products && products.length > 0) {

            if (products.find((p: IProduct) => {

                return p.id === product.id && p.price === product.price
            }))
                return true;
            else
                return false;

        } else {

            let data: IProductBelongToCenter = new ProductBelongToCenter();
            data.centerId = center.id;
            data.price = product.price;
            data.productId = product.id;
            const resp: IServerResponse<string> = await new UnitOfWorkUseCase().getProductBelongToCenterUseCase().checkProductBelongToCenter(data);
            return resp.ServerData?.Data === "True" ? true : false;
        }

    }
    catch (error) {
        throw error;
    }

}


const useCheckProductCart = () => {

    const traductor = useTraductor();

    const centerSelected: ICenter | null = useSelector((state: any) => state.centers.selectedCenter);
    const centerInCart: ICenter | null = useSelector((state: any) => state.cart.center);
    const supplierInCart: ISeller | null = useSelector((state: any) => state.cart.supplier);
    const productsCart: IProduct[] = useSelector((state: any) => state.cart.products);

    return async (product: IProduct, messageCallback: (message: ICheckProductCallback) => void): Promise<boolean | void> => {

        try {

            if (isNull(centerSelected)) {
                messageCallback({
                    message: 'Seleccione un centro',
                    typeMessage: TypeMessageCheckProduct.SHOW_SELECT_CENTER_MESSAGE,
                    product
                });
                return false;
            }

            const center: ICenter | null = centerInCart || centerSelected;

            const check: boolean = await productBelongsToCenter(product, center);
            if (check) {

                if (centerInCart && centerInCart.id !== centerSelected.id) {
                    messageCallback({
                        message: (traductor('mensaje3', { onlyfirst: true }) as string).replace('{0}', centerInCart.name).replace('{1}', centerSelected.name),
                        typeMessage: TypeMessageCheckProduct.DIFFERENT_CENTERS,
                        product
                    });
                }

                if (productsCart.length === 0)
                    return true;
                else {
                    if (supplierInCart?.id === product.sellerId) {
                        return true;
                    } else {
                        messageCallback({
                            message: (traductor('mensaje1', { onlyfirst: true }) as string).replace('{0}', product.sellerName).replace('{1}', product.name).replace('{2}', product.name),
                            typeMessage: TypeMessageCheckProduct.PRODUCT_NOT_BELONG_TO_CURRENT_SUPPLIER,
                            product
                        });
                        return false;
                    }
                }
            }
            else {
                messageCallback({
                    message: (traductor('mensaje2', { onlyfirst: true }) as string).replace('{0}', product.name).replace('{1}', center.name).replace('{2}', product.name).replace('{3}', product.name),
                    typeMessage: TypeMessageCheckProduct.PRODUCT_NOT_BELONG_TO_CURRENT_CENTER,
                    product
                });
                return false;
            }
        }
        catch (error) {

            messageCallback({
                message: error.message,
                typeMessage: TypeMessageCheckProduct.SHOW_MESSAGE,
                product
            });
            return false;
        }
    }
};

export { TypeMessageCheckProduct }
export type { ICheckProductCallback };
export default useCheckProductCart;