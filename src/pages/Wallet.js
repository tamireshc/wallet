import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { addExpense, fetchAPI, addValueTotalExpense,
  deleteExpense, editForm, sendDataEditForm } from '../actions/index';
import pencil from '../pencil.png';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      description: '',
      currencyx: 'USD',
      payment: 'Dinheiro',
      category: 'Alimentação',
      id: 0,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchAPI());
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  }

  clearInput = () => {
    this.setState({
      value: '',
      description: '',
    });
  }

  deleteExpenseFunction = (item) => {
    const { expenses, dispatch } = this.props;
    const attExpensesState = expenses.filter((expense) => expense.id !== item);
    // function getTotal(soma, i) {
    //   return soma + +i.value * +i.exchangeRates[i.currency].ask;}
    // const soma = attExpensesState.reduce(getTotal, 0);
    dispatch(deleteExpense(attExpensesState));
  }

  editFormFunction = (id) => {
    const { dispatch } = this.props;
    dispatch(editForm(id));
  }

  sendDataEditFormFunction = (data) => {
    const { dispatch, idToEdit, expenses } = this.props;
    console.log(data);
    expenses[idToEdit] = data;
    dispatch(sendDataEditForm(expenses));
  }

  render() {
    const { dispatch, isLoading, currencies, rates, expenses, editor,
      idToEdit } = this.props;
    const { value, description, category, currencyx, payment, id } = this.state;
    function getTotal(soma, item) {
      return soma + (+item.value * +item.exchangeRates[item.currency].ask);
    }
    const soma = expenses.reduce(getTotal, 0);
    dispatch(addValueTotalExpense(soma));
    return (
      <div>
        {isLoading && <p>...Carregando</p>}
        <Header />
        <form className="form-container">
          <label htmlFor="value">
            Valor
            <input
              id="value"
              name="value"
              value={ value }
              onChange={ this.handleChange }
              data-testid="value-input"
            />
          </label>
          <label htmlFor="coin">
            Moeda
            <select id="coin" name="currencyx" onChange={ this.handleChange }>
              {currencies?.map((item) => (
                <option
                  key={ item }
                  value={ item }
                >
                  {item}
                </option>))}
            </select>
          </label>
          <label htmlFor="payment">
            Método de Pagamento
            <select
              id="payment"
              name="payment"
              onChange={ this.handleChange }
              data-testid="method-input"
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="payment">
            Categoria
            <select
              id="category"
              data-testid="tag-input"
              name="category"
              onChange={ this.handleChange }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <label htmlFor="value">
            Descrição
            <input
              id="description"
              name="description"
              value={ description }
              data-testid="description-input"
              onChange={ this.handleChange }
            />
          </label>
          { editor ? (
            <button
              type="button"
              onClick={ (event) => {
                event.preventDefault();
                this.sendDataEditFormFunction({ id: idToEdit,
                  value,
                  description,
                  currency: currencyx,
                  method: payment,
                  tag: category,
                  exchangeRates: rates,
                });
                this.clearInput();
              } }
            >
              Editar despesa
            </button>)
            : (
              <button
                type="submit"
                onClick={ (event) => {
                  event.preventDefault();
                  dispatch(fetchAPI());
                  this.setState((estadoAnterior) => ({
                    id: estadoAnterior.id + 1,
                  }));
                  dispatch(addExpense({ id,
                    value,
                    description,
                    currency: currencyx,
                    method: payment,
                    tag: category,
                    exchangeRates: rates }));
                  this.clearInput();
                } }
              >
                Adicionar despesa
              </button>)}
        </form>
        <div>
          <table>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
            {expenses.map((i) => (
              <tr key={ i.id }>
                <td>{i.description}</td>
                <td>{i.tag}</td>
                <td>{i.method}</td>
                <td>{(+i.value).toFixed(2)}</td>
                <td>{i.exchangeRates[i.currency].name.split('/Real Brasileiro')}</td>
                <td>{(+i.exchangeRates[i.currency].ask).toFixed(2)}</td>
                <td>
                  {(+(i.value) * +(i.exchangeRates[i.currency].ask)).toFixed(2)}
                </td>
                <td>Real</td>
                <td className="buttons-table">
                  <button
                    type="button"
                    data-testid="edit-btn"
                    onClick={ () => {
                      this.editFormFunction(i.id);
                      console.log(i.id);
                      this.setState({ value: expenses[i.id].value,
                        description: expenses[i.id].description,
                      });
                    } }
                  >
                    <img src={ pencil } alt="pencil" className="pencil-icon" />
                  </button>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => this.deleteExpenseFunction(i.id) }
                  >
                    X
                  </button>
                </td>
              </tr>))}
          </table>
        </div>
      </div>);
  }
}

Wallet.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  rates: PropTypes.objectOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  editor: PropTypes.bool.isRequired,
  idToEdit: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  isLoading: state.wallet.isLoading,
  currencies: state.wallet.currencies,
  rates: state.wallet.rates,
  expenses: state.wallet.expenses,
  editor: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
});
export default connect(mapStateToProps)(Wallet);
