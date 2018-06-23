import React, {PropTypes} from 'react';

const TextInput = ({type, name, placeholder, value, onChange, label}) => {
    return (
        <div className="form-field">
            <label htmlFor={name}>{label}</label>
            <div className="field">
                <input
                    type={type}
                    name={name}
                    className="form-control"
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange} />
            </div>
        </div>
    );
};

TextInput.propTypes = {
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
};

export default TextInput;