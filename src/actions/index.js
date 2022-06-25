const REGISTER_USER = 'REGISTER_USER';
const REQUEST_API = 'REQUEST_API';
const GET_CURRENCIES = 'GET_CURRENCIES';
const ADD_EXPENSE = 'ADD_EXPENSE';
const GET_RATES = 'GET_RATES';
const ADD_TOTAL = 'ADD_TOTAL';
const DELETE_EXPENSE = 'DELETE_EXPENSE';
const EDIT_FORM = 'EDIT_FORM';
const SEND_DATA_EDIT_FORM = 'SEND_DATA_EDIT_FORM';

const registerUser = (user) => ({
  type: REGISTER_USER,
  payload: {
    user,
  },
});

const requestAPI = () => ({
  type: REQUEST_API,
});

const getCurrencies = (data) => ({
  type: GET_CURRENCIES,
  payload: {
    data,
  },
});

const getCurrenciesRates = (data) => ({
  type: GET_RATES,
  payload: {
    data,
  },
});

const fetchAPI = () => async (dispatch) => {
  dispatch(requestAPI());
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  dispatch(getCurrenciesRates(data));
  const dataCurriencies = Object.keys(data);
  // console.log(data);
  const dataCurrienciesFilter = dataCurriencies.filter((item) => item !== 'USDT');
  return dispatch(getCurrencies(dataCurrienciesFilter));
};

const addExpense = (data) => ({
  type: ADD_EXPENSE,
  payload: {
    data,
  },
});

const deleteExpense = (data) => ({
  type: DELETE_EXPENSE,
  payload: {
    data,
  },
});

const addValueTotalExpense = (data) => ({
  type: ADD_TOTAL,
  payload: {
    data,
  },
});

const editForm = (id) => ({
  type: EDIT_FORM,
  payload: {
    id,
  },
});

const sendDataEditForm = (data) => ({
  type: SEND_DATA_EDIT_FORM,
  payload: {
    data,
  },
});

export {
  registerUser, fetchAPI, addExpense,
  addValueTotalExpense, deleteExpense, editForm, sendDataEditForm,
  GET_CURRENCIES, REGISTER_USER, REQUEST_API, ADD_EXPENSE,
  GET_RATES, ADD_TOTAL, DELETE_EXPENSE, EDIT_FORM, SEND_DATA_EDIT_FORM,
};
