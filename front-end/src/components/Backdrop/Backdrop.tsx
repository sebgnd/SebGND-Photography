import React, { FunctionComponent } from 'react';

interface BackdropProps {
    show: boolean;
}

const Backdrop: FunctionComponent<BackdropProps> = ({ show = true }) => {
    return (
        <>
            {show ? (
                null
            ) : (
                null
            )}
        </>
    )
}

export default ShadowRoot;