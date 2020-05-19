import * as React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

// Components
import Home from './_containers/Home/Home';
import Contact from './_containers/Contact/Contact';
import Recent from './_containers/Recent/Recent';
import Galleries from './_containers/Galleries/Galleries';
import Gallery from './_containers/Gallery/Gallery';
import Viewer from './_containers/Viewer/Viewer';
import Playground from './_containers/Playground/Playground';
import UserNavigation from './UI/Navigation/UserNavigation/UserNavigation';

// Utils
import Paths from '../helper/Paths';

class App extends React.Component {

    public render() {
        return (
            <BrowserRouter>
                <UserNavigation />
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
                        <Galleries />
                    </Route>
                    <Route exact={true} path={Paths.galleryWithId()} component={Gallery} />
                    <Route exact={true} path={Paths.viewer()} component={Viewer} />
                    <Route exact={true} path="/playground">
                        <Playground />
                    </Route>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
