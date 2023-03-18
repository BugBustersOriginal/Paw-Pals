import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';


import { App } from './App.jsx';
import { BrowserRouter } from 'react-router-dom';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.errorInfo) {

      return (
        <div>
          <p>Please try again later.</p>
        </div>
      );
    }

    return (
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
  }

}

const root = createRoot(document.getElementById("root"));

root.render(<ErrorBoundary />);


