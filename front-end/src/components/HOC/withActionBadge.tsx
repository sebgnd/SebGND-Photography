import React, { ComponentType, FunctionComponent, MouseEvent, useCallback, useMemo } from 'react';
import styles from './css/badge.module.css';

export type WithActionBadgeProps = {
    onBadgeClick?: (event: MouseEvent<HTMLDivElement>) => void;
}

export type Icon = {
    name: string;
    isBranding?: boolean;
};

export type BadgeStyle = {
    backgroundColor?: string;
    iconColor?: string;
}

const withActionBadge = <T, P extends object>(WrappedComponent: ComponentType<P>, icon: Icon, style: BadgeStyle = {}) => {
    const ComponentWithActionBadge: FunctionComponent<P & WithActionBadgeProps> = (props: P & WithActionBadgeProps) => {
        const { isBranding, name: iconName } = icon;
        const { onBadgeClick } = props;

        const handleClick = useCallback((event: MouseEvent<HTMLDivElement>) => {
            if (onBadgeClick) {
                onBadgeClick(event);
            }
        }, [onBadgeClick]);

        const getColorStyle = useCallback((styleProp: string | undefined, defaultColor: string) => {
            return styleProp ? styleProp : defaultColor;
        }, []);

        return (
            <div className={styles.componentContainer}>
                <WrappedComponent {...props} />
                <div className={styles.badge}>
                    <div 
                        style={{ backgroundColor: getColorStyle(style.backgroundColor, '#000000') }} 
                        className={styles.iconContainer} 
                        onClick={handleClick}
                    >
                        <i 
                            style={{ color: getColorStyle(style.iconColor, '#FFFFFF') }} 
                            className={`${isBranding ? 'fab' : 'fas'} fa-${iconName}`} 
                        />
                    </div>
                </div>
            </div>
        )
    }

    return ComponentWithActionBadge;
}

export default withActionBadge;