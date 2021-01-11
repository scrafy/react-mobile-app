import languajes from "src/presentation/translationsfiles";

const getLanguage = () => {
    let lang;
    try {
        lang = navigator.language.toUpperCase();
    } catch (error) {
        lang = "ES";
    }

    switch (true) {
        case lang.indexOf("ES", 0) !== -1:
            return languajes.es;

        case lang.indexOf("EN", 0) !== -1:
            return languajes.en;

        default:
            return languajes.es;
    }
};

export default getLanguage;