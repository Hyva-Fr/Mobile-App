import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Bottom from "./components/navigations/Bottom";
import { View, Image, StyleSheet, NativeModules, Platform } from "react-native";
import Account from "./components/svg/Account";
import Offline from "./views/Offline";
import Css from "./utils/CSS";
import Loader from "./components/ui-kit/Loader";
import OnlineStt from "./utils/OnlineStt";
import Login from "./views/Login";

const {StatusBarManager} = NativeModules;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isOnline: false,
            visible: false,
            start: null,
            user: null
        }
    }

    setOnlineStt = (stt) => {
        this.setState({visible: true})
        setTimeout(() => {
            this.isOnlineChecker()
        }, 500)
    }

    isOnlineChecker = () => {
        OnlineStt((stt) => {
            this.setState({isOnline: stt, visible: false, start: true})
        });
    }

    componentDidMount() {
        this.isOnlineChecker()
    }

    render() {

        if (this.state.start === true) {
            if (this.state.isOnline === true) {
                if (this.state.user !== null) {
                    return (
                        <>
                            <View style={styles.view}>
                                <Image
                                    style={styles.logo}
                                    source={require('./assets/hyva.png')}
                                />
                                <Account online={this.setOnlineStt}/>
                            </View>
                            <NavigationContainer>
                                <Bottom online={this.setOnlineStt}/>
                            </NavigationContainer>
                            {this.state.visible === true &&
                            <Loader/>
                            }
                            <StatusBar style="auto"/>
                        </>
                    );
                } else {
                    return(
                        <>
                            <View style={styles.view2}>
                                <Image
                                    style={styles.logo}
                                    source={require('./assets/hyva.png')}
                                />
                            </View>
                            <Login />
                        </>
                    )
                }
            } else {
                return (
                    <>
                        <View style={styles.view2}>
                            <Image
                                style={styles.logo}
                                source={require('./assets/hyva.png')}
                            />
                        </View>
                        <Offline online={this.setOnlineStt}/>
                        {this.state.visible === true &&
                        <Loader/>
                        }
                    </>
                )
            }
        } else {
            return(
                <Loader/>
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
        backgroundColor: Css().root.yellow,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        height: 60,
        paddingTop: STATUSBAR_HEIGHT,
        paddingRight: 10
    },
    view2: {
        backgroundColor: Css().root.yellow,
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: 'center',
        height: 60,
        paddingTop: STATUSBAR_HEIGHT,
    },
    text: {
        fontWeight: 'bold'
    }
})