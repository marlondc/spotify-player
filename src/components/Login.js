import React from 'react';

const Login = props => (
  <div className="login">
    <a href="http://localhost:8000/login" onClick={() => props.login()}>LOGIN</a>
  </div>
);

export default Login;
