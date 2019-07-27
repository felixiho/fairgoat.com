import React from 'react';

import './Signup.css';

class Signup extends React.Component {
  render() {
    return (
      <form
        action="https://app.convertkit.com/forms/993775/subscriptions"
        className="seva-form formkit-form"
        method="post"
        min-width="400 500 600 700 800"
        style={{ backgroundColor: 'rgb(255, 255, 255)', borderRadius: '6px' }}
      ></form>
    );
  }
}

export default Signup;
