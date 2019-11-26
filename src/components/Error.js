import React from 'react';

export const handleError = response => {
    if (!response.ok) {
        throw Error(response.message);
    }
    return response;
};

export const ErrorComponent = props => (
    <div id="content">
        <h1>Error: {props.error.message}</h1>
    </div>
);

