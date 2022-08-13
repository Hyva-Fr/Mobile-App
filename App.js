import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Bottom from "./components/navigations/Bottom";
import { View, Image, StyleSheet, NativeModules, Platform, Text } from "react-native";
import Account from "./components/svg/Account";
import Offline from "./views/Offline";

const {StatusBarManager} = NativeModules;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isOnline: false
        }
    }

    render() {

        if (this.state.isOnline === true) {
            return (
                <>
                    <View style={styles.view}>
                        <Image
                            style={styles.logo}
                            source={require('./assets/hyva.png')}
                        />
                        <Account />
                    </View>
                    <NavigationContainer>
                        <Bottom />
                    </NavigationContainer>
                    <StatusBar style="auto"/>
                </>
            );
        } else {
            return (
                <>
                    <View style={styles.view}>
                        <Image
                            style={styles.logo}
                            source={require('./assets/hyva.png')}
                        />
                    </View>
                    <Offline />
                </>
            )
        }
    }
}

const styles = StyleSheet.create({
    logo: {
        width: 80,
        height: 80,
    },
    view: {
        backgroundColor: '#FCD833',
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        height: 60,
        paddingTop: STATUSBAR_HEIGHT,
        paddingRight: 10
    },
    text: {
        fontWeight: 'bold'
    }
})