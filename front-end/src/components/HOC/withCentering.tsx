import React, { ComponentType, FunctionComponent, useEffect, useMemo } from 'react';
import { fulfilledCaseReducer, fulfilledCaseWithSuccesReducer } from '../../redux/reducers';
import styles from './css/centering.module.css';

export interface CenteringProps {
    centerHorizontal?: boolean;
    centerVertical?: boolean;
    fullScreen?: boolean;
    insideContainer?: boolean,
    zIndex?: number ;
}

const withCentering = <P extends object>(WrappedComponent: ComponentType<P & CenteringProps>) => {
    const ComponentWithCentering: FunctionComponent<P & CenteringProps> = (props: P & CenteringProps) => {
        const { centerHorizontal, centerVertical, fullScreen, insideContainer, zIndex = 0 } = props;

        const classNames = useMemo(() => {
            const classes = [styles.centeringContainer];

            if (centerHorizontal) {
                classes.push(styles.centerHorizontal);
            }
            if (centerVertical) {
                if (fullScreen) {
                    classes.push(styles.fullScreen);
                } else {
                    classes.push(styles.centerVertical);
                }
            }
            if (insideContainer) {
                classes.push(styles.insideContainer);
            }
            
            return classes.join(' ');
        }, [centerVertical, centerHorizontal, fullScreen, insideContainer])

        return (
            <>
                {(centerHorizontal || centerVertical) ? (
                    <div style={{ zIndex }} className={[styles.centeringContainer, classNames].join(' ')}>
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