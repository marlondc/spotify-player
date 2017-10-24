import React, { Component } from 'react';
import { isNil } from 'ramda';

import User from './User';
import Login from './Login';

class PageDisplay extends Component {
  componentWillMount() {
    this.props.getTokens();
  }

  render() {
    const {
      accessToken,
      refreshToken,
    } = this.props

    if (isNil(accessToken) && isNil(refreshToken)) return <Login {...this.props} />

    return <User {...this.props} />
  }
}

export default PageDisplay;
