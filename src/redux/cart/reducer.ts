import Actions from "./enumActions";

const initialState: any = {

    products: [],
    center: null,
    supplier: null
}


export default (state = initialState, action: any) => {

    switch (action.type) {
        case Actions.SAVE_PRODUCT_TO_CART:
            
            return { ...state, products: action.payload };
        case Actions.DELETE_PRODUCT_FROM_CART:
            return { ...state, products: action.payload };
        case Actions.SAVE_CENTER_TO_CART:
            return { ...state, center: action.payload };
        case Actions.SAVE_SUPPLIER_TO_CART:
            return { ...state, supplier: action.payload };
        case Actions.CLEAN_PRODUCTS_IN_CART:
            return { ...state, products: [] };
        case Actions.CLEAN_CART:
            return { products: [], center: null, supplier: null };
        case Actions.SAVE_CART:
            return action.payload;
        default:
            return state;
    }
};
