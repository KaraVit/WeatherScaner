// src/components/ErrorMessage.js

import React from 'react';

const ErrorMessage = ({ error }) => (
  <p className="alert alert-danger">{error}</p>
);

export default ErrorMessage;
