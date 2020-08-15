import React, { ComponentType, FunctionComponent, useEffect, useState } from 'react';
import styles from './css/centering.module.css';

export interface CenteringProps {
    centerHorizontal?: boolean;
    centerVertical?: boolean;
    fullScreen?: boolean;
}

export type CenteredProp = {
    centeringClass?: string;
}

export type WithCenteringProps = CenteredProp & CenteringProps;

const withCentering = <P extends object>(WrappedComponent: ComponentType<P & CenteringProps>) => {
    const EnhancedComponent: FunctionComponent<P & WithCenteringProps> = (props: P & WithCenteringProps) => {
        const [centeringClass, setCenteringClass] = useState<string>('');

        const getClassNames = () => {
            const classes = [];

            if (props.centerHorizontal) {
                classes.push(styles.centerHorizontal);
            }
            if (props.centerVertical) {
                if (props.fullScreen) {
                    classes.push(styles.fullScreen);
                } else {
                    classes.push(styles.centerVertical);
                }
            }
            return classes.join(' ');
        }

        useEffect(() => {
            setCenteringClass(
                getClassNames()
            );
        }, [])

        return (
            <WrappedComponent centeringClass={centeringClass} {...props as P} />
        )
    }

    return EnhancedComponent;
}

export default withCentering;