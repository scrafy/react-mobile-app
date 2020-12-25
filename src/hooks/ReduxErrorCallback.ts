import { useDispatch } from 'react-redux';
import notify from 'src/redux/notifications/actions';

const useReduxErrorCallback = () => {

    const dispatch = useDispatch();
    return (error: string) => {

        dispatch(
            notify.showNotification({
                type: 'confirm',
                title: 'Error',
                message: error,
                onlyOk: true,
                textOk: 'OK',
            })
        )
    }
}

export default useReduxErrorCallback;