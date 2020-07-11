import React, { ComponentType, FunctionComponent, useEffect, useState, useRef } from 'react';

export interface EndScrollProps {
    endWindowReached: boolean;
}

const withEndScroll = <P extends object>(WrappedComponent: ComponentType<P>, action: Function | undefined = undefined) => {
    const EnhancedComponent: FunctionComponent<P & EndScrollProps> = (props: P & EndScrollProps) => {
        const [endWindowReached, setEndWindowReached] = useState(false);
        const endWindowRef = useRef(false);

        const doAction = (reached: boolean) => {
            if (endWindowRef.current !== reached && !action) {
                setEndWindowReached(reached);
            } else {
                if (endWindowRef.current !== reached && reached && action) {
                    action();
                }
            }
            endWindowRef.current = reached;
        }

        const handleScroll = () => {
            const scrollYBottom = Math.round(window.scrollY + window.innerHeight);
            const pageHeight = document.body.scrollHeight;
            const offsetThreshold = 5;
    
            if (scrollYBottom > pageHeight - offsetThreshold) {
                doAction(true);
            } else {
                doAction(false);
            }
        }

        useEffect(() => {
            window.addEventListener('scroll', handleScroll);
            
            return () => {
                window.removeEventListener('scroll', handleScroll);
            }
        }, []);

        return (
            <WrappedComponent endWindowReached={endWindowReached} {...props as P} />
        )
    }

    return EnhancedComponent;
}

export default withEndScroll;