import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import coin from '../coin-vertical.svg';
import dollar from '../dollar.svg';

class Header extends React.Component {
  render() {
    const { email, expenses, total } = this.props;
    console.log(expenses);

    return (
      <header className="header-container">
        <div className="title-container">
          <img src={ coin } alt="coin" className="img-coin" />
          <p className="title-header">Wallet</p>
        </div>
        <div className="value-container">
          <p data-testid="email-field">{email}</p>
          <img src={ dollar } alt="coin" className="img-dollar" />
          <p data-testid="total-field">{total.toFixed(2)}</p>
          <p data-testid="header-currency-field">BRL</p>
        </div>
      </header>

    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
  total: state.wallet.total,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  total: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
