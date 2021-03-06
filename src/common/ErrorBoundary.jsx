// common/ErrorBoundary.jsx
import React, { Component } from 'react';

import { SOMETHING_WRONG } from '../config/AppConstants';
import './ErrorBoundary.css';

export default class ErrorBoundary extends Component {
  state = { error: null, errorInfo: null };

  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error,
      errorInfo
    });
    // You can also log error messages to an error reporting service here
  }

  render() {
    const { children } = this.props;
    const { error, errorInfo } = this.state;

    if (errorInfo) {
      // Error path
      return (
        <div>
          <h2>{SOMETHING_WRONG}</h2>
          <details className="errorDetails">
            (error && <div>{error.toString()}</div>)
            <div>{errorInfo.componentStack}</div>
          </details>
        </div>
      );
    }
    // Normally, just render children
    return children;
  }
}
