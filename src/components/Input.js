import React from 'react'

const Input = ({
    children,
    className,
    type
}) => {
    return (
        <div>
            <input className={`rounded-md border outline-none`} />
        </div>
    )
}

export default Input;
