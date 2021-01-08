const ErrorFormManager = (error: any, callBackError: (errorMessage: string, validationErrors?: any) => void) => {

    if (error.errorCode !== undefined) {

        if (error.validationErrors) {

            let errors: any = {};
            error.validationErrors.forEach((error: any) => {

                errors[error.FieldName] = error.ErrorMessage

            });
            callBackError(error.message, errors);

        } else {
            callBackError(error.message);

        }

    } else {
        callBackError(error.message);
    }
}

export default ErrorFormManager;