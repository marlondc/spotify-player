import React from 'react';

const Login = props => (
  <div className="container">
    <div className="top top--login">
      <div className="content content--login">
        <div className="input input--login">
          <a className="input__add-button input__add-button--login" href="http://localhost:8000/login" onClick={() => props.login()}>LOGIN</a>
        </div>
      </div>
    </div>
    <div className="bottom bottom--login" />
  </div>
);

export default Login;
