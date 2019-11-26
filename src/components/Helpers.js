import React from 'react';

export const ErrorComponent = props => (
    <div id="content">
        <h1>Error: {props.error.message}</h1>
    </div>
);

export const LoadingComponent = props => <div id="content"><h1>Loading...</h1></div>;;
