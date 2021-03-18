import React from 'react'
import {Router, Scene,Stack} from 'react-native-router-flux'
import Main from '../component/Main'
import SecondPage from "./SecondPage";
import LogOut from "./LogOut";

const RoutingFlux = () => (
        <Router>
            <Stack key = "root">
                <Scene
                    key = "Main"
                    component = {Main}
                    title = "Enter Login & Password"
                    initial = {true}
                />
                <Scene
                    navBar = {()=><LogOut/>}
                    key = "inLogin"
                    component = {SecondPage}
                    title = "Personal Data"
                />
        </Stack>
        </Router>
)
export default RoutingFlux