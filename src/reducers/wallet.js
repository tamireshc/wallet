import { ADD_EXPENSE, GET_CURRENCIES, GET_RATES, REQUEST_API,
  ADD_TOTAL, DELETE_EXPENSE, EDIT_FORM, SEND_DATA_EDIT_FORM } from '../actions';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  isLoading: false,
  rates: [],
  total: 0,

};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_API:
    return {
      ...state,
      isLoading: true,
    };
  case GET_CURRENCIES:
    return {
      ...state,
      currencies: action.payload.data,
      isLoading: false,
    };
  case GET_RATES:
    return {
      ...state,
      rates: action.payload.data,
    };
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.payload.data],
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: action.payload.data,
    };
  case ADD_TOTAL:
    return {
      ...state,
      total: action.payload.data,
    };
  case EDIT_FORM:
    return {
      ...state,
      editor: true,
      idToEdit: action.payload.id,
    };
  case SEND_DATA_EDIT_FORM:
    return {
      ...state,
      editor: false,
      idToEdit: 0,
      expenses: action.payload.data,
    };

  default:
    return state;
  }
};

export default wallet;
