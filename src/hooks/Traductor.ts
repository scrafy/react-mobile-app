import _ from "lodash";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import languajeAction from 'src/redux/languajes/actions';
import Languaje from 'src/redux/languajes/languajes';

interface Styles {
    uppercase: boolean,
    lowercase: boolean,
    capitalize: boolean,
    onlyfirst: boolean
}

const setLanguaje = (dispatch:any) => {

    let lang: string = '';
    try {
      lang = navigator.language.toUpperCase();
    }
    catch (error) {
      lang = 'ES'
    }
  
    switch (true) {
  
      case lang.indexOf('ES', 0) !== -1:
        dispatch(languajeAction.setLanguaje(Languaje.ES));
        break;
  
      case lang.indexOf('EN', 0) !== -1:
        dispatch(languajeAction.setLanguaje(Languaje.EN));
        break;
  
      default:
        dispatch(languajeAction.setLanguaje(Languaje.ES));
  
    }
  }

export const useTraductor = (): Function => {

    const translation: any = useSelector((state: any) => state.languaje);

    if ( _.isEmpty(translation) )
        setLanguaje(useDispatch());

    return (key: string, style: Styles): string | undefined => {

        if (translation[key] === null || translation[key] === undefined)
            return 'NO_TRADUCIDO'
        else {
            if (style.uppercase)
                return (translation[key] as string).toUpperCase();
            if (style.lowercase)
                return (translation[key] as string).toLowerCase();
            if (style.capitalize)
                return (translation[key] as string).split(" ").map(_x => { let x: string[] = Array.from(_x); x[0] = x[0].toUpperCase(); return x.join(''); }).join(" ");
            if (style.onlyfirst)
                return (translation[key] as string).charAt(0).toUpperCase() + (translation[key] as string).slice(1, (translation[key] as string).length);

            return 'ERROR';
        }
    }
}