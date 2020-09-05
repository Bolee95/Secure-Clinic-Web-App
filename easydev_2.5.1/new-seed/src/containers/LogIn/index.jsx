import React from 'react';
import { Link } from 'react-router-dom';
import LogInForm from './components/LogInForm';
import Loading from '../../shared/components/Loading';
import axios from 'axios';

class LogInComponent extends React.Component {

  constructor() {
    super();

    this.processLoginAsEntity = this.processLoginAsEntity.bind(this);
    this.processLoginAsUser = this.processLoginAsUser.bind(this);

    this.state = {
      isLoading: false
    };
  }

  componentDidMount() {
    var store = require('store');
    if (store.get('loggedin') == true) {
      this.props.history.push("/pages");
    }
  }

  processLoginAsEntity(data) {

    this.setState({ isLoading : true});

    const userId = data["userId"];
    var bodyFormData = new FormData();
    bodyFormData.set('userId', userId);

    axios({ method: 'POST', url: '/shared/login', data: bodyFormData })
    .then(response => {
      let isValid = response['data'];
      if (isValid) {
        this.retrieveUserData(userId);
      }
    }, error => {
      window.alert(error);
      console.log(error);
      this.setState({ isLoading: false });
    })
  }

  processLoginAsUser(userId) {
    this.setState({ isLoading: true });

    axios({ method: 'GET', url: '/shared/getPacient', params: { pacientLbo: userId }, headers: { 'Identity_name': 'doctor' }})
    .then(response => {

      let pacientData = response.data;
      var store = require('store');

      store.set('user', { name: pacientData.name,
                          surname: pacientData.surname,
                          role: 'user',
                          hospitalName: pacientData.hospitalName,
                          hospitalCode: pacientData.hospitalCode,
                          ordinationCode: pacientData.ordinationCode,
                          serviceCode: pacientData.serviceCode,
                          city: pacientData.city
      })
      store.set('loggedIn', true);
      this.props.history.push("/pages");
    }, error => {
      window.alert(error);
      console.log(error);
    })
    .then(() => {
      this.setState({ isLoading: false });
    })
  }

  retrieveUserData(licenceId) {
    axios({ method: 'GET', url: '/shared/getEntity', params: { licenceId: licenceId }, headers: { 'Identity_name': 'doctor' }})
    .then(response => {

      let entityData = response.data;
      var store = require('store');
  
      store.set('user', { licenceId: entityData.licenceId,
                          name: entityData.name,
                          surname: entityData.surname,
                          role: entityData.role,
                          hospitalName: entityData.hospitalName,
                          hospitalCode: entityData.hospitalCode
      })
      store.set('loggedIn', true);

      this.props.history.push("/pages");
    }, error => {
      window.alert(error);
      console.log(error);
    })
    .then(() => {
      this.setState({ isLoading: false });
    })
  }
  
  render() {

    const { isLoading } = this.state;

    if (isLoading) {
      return (<Loading loading={isLoading} />);
    }

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
            <LogInForm onSubmit={this.processLoginAsEntity} isLoading={isLoading} logInAsUser={this.processLoginAsUser} />
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
