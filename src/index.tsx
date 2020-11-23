import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import {RouteProps} from "react-router";
import {Container} from "./container";
import {MainPage, ArtistPage} from "./pages";

interface Props extends RouteProps {
    component: any,
    layout: any,
}

const LayoutWrapper = ({component: Component, layout: Layout, ...routeProps}: Props) => (
    <Route {...routeProps} render={(props) =>
        <Layout {...props}>
            <Component {...props} />
        </Layout>
    }/>
);

ReactDOM.render(
    <Router>
        <Switch>
            <LayoutWrapper exact path="/" component={MainPage} layout={Container}/>
            <LayoutWrapper path="/:artistId" component={ArtistPage} layout={Container}/>
        </Switch>
    </Router>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
