import React from 'react';
import SearchPage from './containers/searchPage';
import { BrowserRouter as Router, Route } from "react-router-dom";
import AlbumPage from './containers/AlbumPage';

const App = () => {
    return (
        <Router>
            <div className="App">
                <Route path="/" exact component={SearchPage} />
                <Route path="/song/:id" exact component={AlbumPage} />
            </div>
        </Router>
    );
}

export default App;
