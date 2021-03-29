import React, { useReducer } from 'react';
import alertReducer from './alertReducer';
import alertContext from './alertContext';
import 
{
    SHOW_ALERT, 
    OCULTAR_ALERTA 
} from '../../types/index';

const AlertState = props => {

    const initialState = {
        alert: null
    }

    const[ state, dispatch ] = useReducer(alertReducer, initialState);

    const showAlert = (msg, category) => {
        dispatch({
            type: SHOW_ALERT,
            payload: {
                msg,
                category
            }
        })
    }

    //later 5 minuter
    setTimeout(() => {
        dispatch({
            type: OCULTAR_ALERTA
        })
    }, 20000);

    return(
        <alertContext.Provider
            value={{
                alert: state.alert,
                showAlert
            }}>
            { props.children }
        </alertContext.Provider>
    )
}

export default AlertState;

