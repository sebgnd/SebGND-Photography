import React, { Component } from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { Button } from '../button';
import './user-navigation.css';

class UserNavigation extends Component<RouteComponentProps, {}> {
    changePage(url: string) {
        this.props.history.push(url);
    }

    public render() {
        return (
            <nav>
                <div className="side-menu" id="left">
                    <div className="item">
                        <Button size="normal" variant="light" onClick={() => this.changePage('/')}>Home</Button>
                    </div>
                    <div className="item">
                        <Button size="normal"  variant="light" onClick={() => this.changePage('/galleries')}>Galleries</Button>
                    </div>
                </div>
                <Link to="" id="center-menu"><img src="images/logo.png" alt="logo"/></Link>
                <div className="side-menu" id="right">
                    <div className="item">
                        <Button size="normal"  variant="light" onClick={() => this.changePage('/recent')}>Recent</Button>
                    </div>
                    <div className="item">
                        <Button size="normal"  variant="light" onClick={() => this.changePage('/contact')}>Contact</Button>
                    </div>
                </div>
            </nav>
        );
    }
}

export default withRouter(UserNavigation);
