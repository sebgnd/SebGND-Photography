import { useState } from 'react';

const useToggle = (value: boolean): [boolean, () => void] => {
    const [active, setActive] = useState(value);

    const toggleActive = (): void => {
        setActive(prevActive => !prevActive);
    }

    return [active, toggleActive];
}

export default useToggle;