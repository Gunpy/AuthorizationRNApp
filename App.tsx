import React  from 'react';
import {
    StatusBar,
} from 'react-native';
import RoutingPage from "./src/component/RoutingPage";



const App = () => {
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <RoutingPage></RoutingPage>
        </>
    );
};


export default App;
