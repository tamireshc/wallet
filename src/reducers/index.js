import { combineReducers } from 'redux';
import user from './user';
import wallet from './wallet';

const reducer = combineReducers({ user, wallet });

export default reducer;

// Referencia usada de funçao para somar itens array de objetos usada no Wallet.js
// https://medium.com/@luizalbertobm/somar-valores-em-uma-lista-de-objetos-javascript-usando-reduce-faf39aa2618e
