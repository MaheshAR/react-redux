import React from 'react';

const CurrencyFormatter = ({value}) => {
    return (
        <span>{parseInt(value).toLocaleString('en-IN', {style: 'currency', currency: 'INR'})}</span>
    );
};

export default CurrencyFormatter;