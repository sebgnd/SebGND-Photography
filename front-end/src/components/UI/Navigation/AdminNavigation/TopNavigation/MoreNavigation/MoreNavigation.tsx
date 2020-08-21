import React, { FunctionComponent, useRef, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import styles from './MoreNavigation.module.css';

import MoreItem from './MoreItem/MoreItem';
import { INavItem } from '../../../NavigationItem/NavigationItem';
import { ButtonContainer } from '../../../../../Styled/container';

interface MoreProps {
    moreItems: INavItem[];
    normalItems: INavItem[];
    onClick: () => void;
    isOpen: boolean;
}

const MoreNavigation: FunctionComponent<MoreProps> = ({ moreItems, normalItems, isOpen, onClick }) => {
    const moreMenuRef = useRef<HTMLDivElement>(null);
    const moreButtonRef = useRef<HTMLButtonElement>(null);

    const getArrowClassName = () => {
        const classes = [styles.arrow];
        if (isOpen) {
            classes.push(styles.arrowUp);
        } else {
            classes.push(styles.arrowDown);
        }

        return classes.join(' ');
    }

    const handleClickOutside = (event: MouseEvent) => {
        if (moreMenuRef.current && moreButtonRef.current) {
            const outsideMenu = !moreMenuRef.current.contains(event.target as Node);
            const outsideButton = !moreButtonRef.current.contains(event.target as Node);

            if (outsideButton && outsideMenu) {
                setTimeout(() => {
                    onClick();
                }, 50)
            }
        }
    }       

    useEffect(() => {
        window.addEventListener('mousedown', handleClickOutside);

        return () => {
            window.removeEventListener('mousedown', handleClickOutside);
        }
    }, [])

    return (
        <div className={styles.moreNavigation}>
            <ButtonContainer ref={moreButtonRef} onClick={onClick}>
                <div className={styles.moreButton}>
                    <span>More</span>
                    <span className={getArrowClassName()}>
                        <i className="fas fa-chevron-down" />
                    </span>
                </div>
            </ButtonContainer>
            <CSSTransition
                in={isOpen}
                classNames={{
                    enterActive: styles.moreEnterActive,
                    exitActive: styles.moreExitActive,
                    enter: styles.moreEnter,
                    exit: styles.moreExit
                }}
                timeout={500}
                unmountOnExit
                mountOnEnter
            >
                <div ref={moreMenuRef} className={styles.moreItemsList}>
                    <div className={styles.normalItems}>
                        {normalItems.map(item => (
                            <MoreItem key={item.url} onClick={onClick} name={item.name} url={item.url} />
                        ))}
                    </div>
                    {moreItems.map(item => (
                        <MoreItem key={item.url} onClick={onClick} name={item.name} url={item.url} />
                    ))}
                </div>
            </CSSTransition>
        </div>
    )
}

export default MoreNavigation;