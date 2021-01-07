import Actions from "./enumActions";
import Languaje from "./languajes";
import languajes from "pages/translationsfiles";

const setLanguaje = (languaje: Languaje) => (dispatch: any) => {

    let lang: any = {};

    switch (languaje) {

        case Languaje.EN:
            lang = languajes.en;
            lang.locale = 'en';
            break;

        case Languaje.ES:
            lang = languajes.es;
            lang.locale = 'es';
            break;

        default:
            lang = languajes.es
            lang.locale = 'es';
    }

    dispatch({
        type: Actions.SET_LANGUAJE,
        payload: lang
    })
};

export default {
    setLanguaje
};