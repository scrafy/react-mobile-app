import notify from 'src/redux/notifications/actions';

export const ShowLoader = (dispatch: any) => {

    dispatch(
        notify.showNotification({
            type: 'loader'
        })
    )
}

export const HideLoader = (dispatch: any) => {

    dispatch(
        notify.hideNotification()
    )
}