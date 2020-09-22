import React, { FunctionComponent, useRef, useState, useEffect } from 'react';
import styles from './DropdownButton.module.css';
import Separator from '../../../UI/Separator/Separator';
import useEventListener from '../../../../hooks/useEventListener';

export interface DropdownButtonOption {
    value: any;
    label: string;
}

interface DropdownButtonProps {
    options: DropdownButtonOption[];
    onClick: (e: React.MouseEvent, value: any) => void;
    size: 'small' | 'big' | 'medium';
    fullWidth?: boolean;
    label: string;
}

const DropdownButton: FunctionComponent<DropdownButtonProps> = ({
    options, 
    onClick,
    size,
    fullWidth,
    label
}) => {
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const dropdownMenuRef = useRef<HTMLDivElement>(null);
    const showDropdownRef = useRef<boolean>(false);

    const toggleDropdownMenu = () => {
        setShowDropdown(prevShow => !prevShow);
    }

    const handleClick = (e: React.MouseEvent, value: any) => {
        onClick(e, value);
        toggleDropdownMenu();
    }

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && showDropdownRef.current) {
            const outsideDropdown = !dropdownRef.current.contains(event.target as Node);

            if (outsideDropdown) {
                toggleDropdownMenu();
            }
        }
    }   

    useEventListener('mousedown', handleClickOutside);

    useEffect(() => {
        showDropdownRef.current = showDropdown;
    }, [showDropdown])

    return (
        <div ref={dropdownRef} className={`${styles.dropdown} ${fullWidth ? styles.fullWidth : ''}`}>
            <button 
                className={styles.button}
                onClick={() => toggleDropdownMenu()}
            >
                {label}
            </button>
            <div 
                ref={dropdownMenuRef} 
                className={styles.dropdownMenu}
                style={{
                    maxHeight: !showDropdown ? 0 : dropdownMenuRef.current?.scrollHeight
                }}
            >
                {options.length && (
                    <Separator size="big" />
                )}
                {options.map((option: DropdownButtonOption) => (
                    <button
                        onClick={(e: React.MouseEvent) => handleClick(e, option.value)}
                        className={styles.dropdownButton}
                    >
                        {option.label}
                    </button>
                ))}
            </div>
        </div>
    )
};

export default DropdownButton;