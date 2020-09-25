import React, { FunctionComponent, useRef, useState, useEffect } from 'react';
import _ from 'lodash';
import styles from './DropdownButton.module.css';

import Separator from '../../../UI/Separator/Separator';
import InformationMessage from '../../InformationMessage/InformationMessage';

import useEventListener from '../../../../hooks/useEventListener';

export interface DropdownButtonOption {
    value: any;
    label: string;
}

type Sizes = 'small' | 'big' | 'medium';

interface DropdownButtonProps {
    options: DropdownButtonOption[];
    size: Sizes;
    label: string;
    activeValue?: any;
    fullWidth?: boolean;
    onClick: (e: React.MouseEvent, value: any) => void;
}

const DropdownButton: FunctionComponent<DropdownButtonProps> = ({
    options, 
    size,
    fullWidth,
    label,
    activeValue,
    onClick,
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
        <div ref={dropdownRef} className={`${styles.dropdown} ${styles[size]} ${fullWidth ? styles.fullWidth : ''}`}>
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
                {(options.length !== 0) ? (
                    <>
                        <Separator size="big" />
                        {options.map((option: DropdownButtonOption) => {
                            if (_.isEqual(option.value, activeValue)) {
                                return null;
                            }
                            return (
                                <button
                                    onClick={(e: React.MouseEvent) => handleClick(e, option.value)}
                                    className={styles.dropdownButton}
                                >
                                    {option.label}
                                </button> 
                            )
                        })}
                    </>
                ) : (
                    <InformationMessage noIcon messageType="information" size="small" message="No option." />
                )}
            </div>
        </div>
    )
};

export default DropdownButton;