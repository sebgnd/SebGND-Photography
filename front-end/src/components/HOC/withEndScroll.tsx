import React, { Component, ComponentType } from 'react';

const withEndScroll = (WrappedComponent: ComponentType<any>, action: Function) => {
    return class extends Component<any, any> {
        constructor(props: any) {
            super(props);
            
            this.handleScroll = this.handleScroll.bind(this);
        }

        handleScroll() {
            const scrollYBottom = Math.round(window.scrollY + window.innerHeight);
            const pageHeight = document.body.scrollHeight;
            const offsetThreshold = 50;
    
            if (scrollYBottom > pageHeight - offsetThreshold) {
                action();
            }
        }

        componentDidMount() {
            window.addEventListener('scroll', this.handleScroll);
        }

        componentWillUnmount() {
            window.removeEventListener('scroll', this.handleScroll);
        }

        render() {
            return (
                <WrappedComponent {...this.props} />
            )
        }
    }
}

export default withEndScroll;