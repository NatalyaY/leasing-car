import React from 'react';

const Form: React.FC<{}> = () => {
    const min = 10000;
    const max = 10000000;
    const step = 10000;
    const [value, setValue] = React.useState(min);
    const changeValue = (e: React.ChangeEvent) => {
        let value: number | string = (e.target as HTMLInputElement).value;
        if (typeof value === 'string') {
            value = value.replace(/\D+/g, "");
        };
        value = Math.min(max, Math.max(min, +value));
        setValue(value);
    };
    return null;
};

export default Form;
