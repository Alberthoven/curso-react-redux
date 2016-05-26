import { push } from 'react-router-redux';
import { emptyCart } from '../cart';

export const SAVE_ORDER_ERRORS = 'SAVE_ORDER_ERRORS';
export const CLEAR_ORDER_ERRORS = 'CLEAR_ORDER_ERRORS';
export const SAVE_ORDER_DETAILS = 'SAVE_ORDER_DETAILS';

export function validate(details){
  const { firstName, lastName, email, address } = details;
  let errors = {};
  if(!firstName) errors.firstName = 'Nombre obligatorio';
  if(!lastName) errors.lastName = 'Apellido obligatorio';
  if(!email) errors.email = 'Email obligatorio';
  if(!address) errors.address = '¿Dónde te lo mandamos torpón?';
  return errors;
}

export function changeField(patch){
  return {
    type: SAVE_ORDER_DETAILS,
    payload: patch
  }
}

export function saveOrder(details){
  //devolvemos una función para el middleware redux-thunk!!!
  return (dispatch, getState) => {
    //guardamos el form en el estado
    dispatch(changeField(details));
    //validamos
    let errors = validate(details);
    if(Object.keys(errors).length > 0){
      dispatch({
        type: SAVE_ORDER_ERRORS,
        errors
      });
    }
    else {
      //limpiar errores
      dispatch({ type: CLEAR_ORDER_ERRORS });
      //vaciar el carrito
      dispatch(emptyCart());
      //y navegar a la página de gracias
      dispatch(push('thankyou'));
    }
  }
}