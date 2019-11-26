import React from 'react';

export const ErrorComponent = props => (
    <div id="content">
        <h1>Error: {props.error.message}</h1>
    </div>
);

