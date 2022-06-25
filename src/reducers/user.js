import { REGISTER_USER } from '../actions';

const INITIAL_STATE = {
  email: '', // string que armazena o email da pessoa usuária
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REGISTER_USER:
    return {
      ...state,
      email: action.payload.user,
    };
  default:
    return state;
  }
};

export default user;
