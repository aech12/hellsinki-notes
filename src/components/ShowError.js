import React from 'react';

const ShowErrorMessage = ({ message }) => {
  if (!message) {
    return null;
  }
  return <p>{message}</p>;
};

export default ShowErrorMessage;
