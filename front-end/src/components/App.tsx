import * as React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';

// Components
import Home from './pages/home/Home';
import Contact from './pages/contact/Contact';
import Recent from './pages/recent/Recent';
import Categories from './pages/categories/Categories';
import Gallery from './pages/gallery/Gallery';
import Viewer from './pages/viewer/Viewer';
import UserNavigation from './navigation/UserNavigation';

// Utils
import Paths from '../helper/Paths';

class App extends React.Component {

    public render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact={true} path={Paths.home()}>
                        <Home />
                    </Route>
                    <Route exact={true} path={Paths.contact()}>
                        <Contact />
                    </Route>
                    <Route exact={true} path={Paths.recent()}> 
                        <Recent />
                    </Route>
                    <Route exact={true} path={Paths.gallery()}>
                        <Categories />
                    </Route>
                    <Route exact={true} path={Paths.galleryWithName()}>
                        <Gallery />
                    </Route>
                    <Route exact={true} path={Paths.viewer()}>
                        <Viewer />
                    </Route>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
