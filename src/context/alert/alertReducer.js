import 
{
    SHOW_ALERT, 
    OCULTAR_ALERTA 
} from '../../types/index';

export default (state, action) => {

    switch(action.type){

        case SHOW_ALERT:
            return{
                ...state,
                alert: action.payload
            }

        case OCULTAR_ALERTA:
            return{
                ...state,
                alert: null
            }
    }

}

