import React from 'react';
import { Alert } from "react-bootstrap";

const alertErrors = (props) => {
    const errors = props.errors.map((error, inx) => {
        return <li key={inx}>{error.message}</li>
    });
    return (
        <div>
            {
                errors.length ? 
                    <Alert variant="danger"><ul>{errors}</ul></Alert>
                    :null
            }
        </div>
    );
}

export default alertErrors;