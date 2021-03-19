import React, { ComponentType, FunctionComponent, useEffect, useState } from 'react';
import styles from './css/centering.module.css';

export interface CenteringProps {
    centerHorizontal?: boolean;
    centerVertical?: boolean;
    fullScreen?: boolean;
}

const withCentering = <P extends object>(WrappedComponent: ComponentType<P & CenteringProps>) => {
    const ComponentWithCentering: FunctionComponent<P & CenteringProps> = (props: P & CenteringProps) => {
        const [centeringClass, setCenteringClass] = useState<string>('');
        const { centerHorizontal, centerVertical } = props;

        const getClassNames = () => {
            const classes = [];

            if (centerHorizontal) {
                classes.push(styles.centerHorizontal);
            }
            if (centerVertical) {
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
            <>
                {(centerHorizontal || centerVertical) ? (
                    <div className={[styles.centeringContainer, centeringClass].join(' ')}>
                        <WrappedComponent {...props as P} />
                    </div>
                ) : (
                    <WrappedComponent {...props as P} />
                )}
            </>
        )
    }

    return ComponentWithCentering;
}

export default withCentering;