import React from 'react';

export const ErrorComponent = props => <div><h1>Error: {props.error.message}</h1></div>;

export const LoadingComponent = props => <div><h1>Loading...</h1></div>;
