import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Drawer from "./components/navigations/Drawer";

export default class App extends React.Component {

    render() {
        return (
            <NavigationContainer>
                <Drawer />
                <StatusBar style="auto"/>
            </NavigationContainer>
        );
    }
}