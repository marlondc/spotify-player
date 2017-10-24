import React, { Component } from 'react';

import { isNil } from 'ramda';

import User from './User';
import Login from './Login';

const PageDisplay = (props) => {
  const { match } = props;
  const { params } = match
  const { accessToken, refreshToken } = params;
  if (!isNil(accessToken) && !isNil(refreshToken)) {
    return <User {...props} />
  } else {
    return <Login {...props} />
  }
}

export default PageDisplay;
