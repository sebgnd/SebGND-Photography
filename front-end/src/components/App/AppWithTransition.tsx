import * as React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import styles from './App.module.css';

// Components
import Home from '../pages/Home/Home';
import Contact from '../pages/Contact/Contact';
import Recent from '../pages/Recent/Recent';
import Galleries from '../pages/Galleries/Galleries';
import Gallery from '../pages/Gallery/Gallery';
import Playground from '../pages/Playground/Playground';
import UserNavigation from '../UI/Navigation/UserNavigation/UserNavigation';

class AppWithTransition extends React.Component {

    public render() {
        return (
            <BrowserRouter>
                <UserNavigation />
                <Route render={({ location }) => (
                    <TransitionGroup>
                        <CSSTransition
                            key={location.key}
                            classNames={{
                                enter: styles.routeEnter,
                                enterActive: styles.routeEnterActive,
                                exitActive: styles.routeExitActive,
                                exit: styles.routeExit
                            }}
                            timeout={0}
                        >
                            <Switch location={location}>
                                <div className={styles.page}>
                                    <Route exact={true} path="/" component={Home} />
                                    <Route exact={true} path="/contact" component={Contact} />
                                    <Route exact={true} path="/recent/:imageId?" component={Recent} /> 
                                    <Route exact={true} path="/gallery" component={Galleries} />
                                    <Route exact={true} path="/gallery/:id/:imageId?" component={Gallery} />
                                    <Route exact={true} path="/playground" component={Playground} />
                                </div>
                            </Switch>
                        </CSSTransition>
                    </TransitionGroup>
                )} />
            </BrowserRouter>
        );
    }
}

export default AppWithTransition;
