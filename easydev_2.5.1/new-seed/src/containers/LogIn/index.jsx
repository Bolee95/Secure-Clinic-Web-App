import React from 'react';
import { Link } from 'react-router-dom';
import LogInForm from './components/LogInForm';
import axios from 'axios';

class LogInComponent extends React.Component {

  constructor() {
    super();

    this.state = {
      isLoading: false
    };

    this.processLogin = this.processLogin.bind(this);
  }

  componentDidMount() {
    var store = require('store');
    if (store.get('loggedin') == true) {
      this.props.history.push("/pages");
    }
  }

  processLogin(data) {

    this.setState({ isLoading : true});

    const userId = data["userId"];
    var bodyFormData = new FormData();
    bodyFormData.set('userId', userId);

    axios({ method: 'POST', url: '/shared/login', data: bodyFormData })
    .then(response => {
      let isValid = response['data'];
      if (isValid) {
        console.log(isValid);
        this.props.history.push("/pages");
      
        var store = require('store');
        store.set('user', { userId: userId, role: 'doctor' });
        store.set('loggedIn', true);
      }
    }, error => {
      window.alert(error);
      console.log(error);
    }).then(() => {
      this.setState({ isLoading: false });
    });
  }
  
  render() {

    const { isLoading } = this.state;

    return (
      <div className="account">
        <div className="account__wrapper">
          <div className="account__card">
            <div className="account__head">
              <h3 className="account__title">Welcome to
                <span className="account__logo"> Secure Clinic</span>
              </h3>
              <h4 className="account__subhead subhead">Pacient centric and transparent Waiting lists managment</h4>
            </div>
            <LogInForm onSubmit={this.processLogin} isLoading={isLoading} />
            <div className="account__or">
              <p>Or log to system by scanning ID card</p>
            </div>
            <Link className="btn btn-primary account__btn account__btn--small" to="/log_in">Scan</Link>
            {/* <div className="account__social">
              <Link
                className="account__social-btn account__social-btn--facebook"
                to="/pages/one"
              ><FacebookIcon />
              </Link>
              <Link
                className="account__social-btn account__social-btn--google"
                to="/pages/one"
              ><GooglePlusIcon />
              </Link>
            </div> */}
          </div>
        </div>
      </div>
      )};
}

export default LogInComponent;

// if you want to add select, date-picker and time-picker in your app you need to uncomment the first
// four lines in /scss/components/form.scss to add styles
