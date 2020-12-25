import { combineReducers } from "redux";
import centers from "src/redux/centres/reducer";
import catalogs from "src/redux/catalogs/reducer";
import providers from "src/redux/providers/reducer";
import cart from "src/redux/cart/reducer";
import notifications from "src/redux/notifications/reducer";
import userId from "src/redux/users/reducer";
import languaje from "src/redux/languajes/reducer";


const reducers = combineReducers({
    
    centers,
    providers,
    catalogs,
    cart,
    notifications,
    userId,
    languaje    
});

export default reducers;
