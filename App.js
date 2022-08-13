import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import Bottom from "./components/navigations/Bottom";
import { View, Image, StyleSheet, NativeModules, Platform, Text } from "react-native";
import Account from "./components/svg/Account";
import Exit from "./components/svg/Exit";
import Offline from "./views/Offline";
import Css from "./utils/CSS";
import Loader from "./components/ui-kit/Loader";
import OnlineStt from "./utils/OnlineStt";
import Login from "./views/Login";
import * as Font from 'expo-font';
import Notifications from "./components/svg/Notifications";
import User from "./views/User";
import Notifs from "./views/Notifications";
import Arrow from "./components/svg/Arrow";

const {StatusBarManager} = NativeModules;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isOnline: false,
            visible: false,
            start: true,
            user: null,
            fontLoaded: false,
            goToUser: false,
            goToNotifs: false
        }
    }

    setOnlineStt = (stt) => {
        this.setState({visible: true})
        setTimeout(() => {
            this.isOnlineChecker()
        }, 500)
    }

    async loadFonts() {
        await Font.loadAsync({
            'Lato-Bold': require('./assets/fonts/Lato-Bold.ttf'),
            'Lato-Light': require('./assets/fonts/Lato-Light.ttf'),
            'Lato-Black': require('./assets/fonts/Lato-Black.ttf'),
        });
        this.setState({ fontsLoaded: true });
    }

    isOnlineChecker = () => {
        OnlineStt((stt) => {
            this.setState({isOnline: stt, visible: false, start: true})
        });
    }

    login = (email, password) => {
        console.log(email, password)
    }

    logout = () => {
        console.log('logout')
    }

    componentDidMount() {
        this.loadFonts()
        this.isOnlineChecker()
    }

    goBack = () => {
        this.setState({
            goToUser: false,
            goToNotifs: false
        })
    }

    render() {

        if (this.state.fontsLoaded) {
            if (this.state.start === true) {
                if (this.state.isOnline === true) {
                    if (this.state.user === null) {
                        return (
                            <>
                                <View style={styles.view}>
                                    <Image
                                        style={styles.logo}
                                        source={require('./assets/hyva.png')}
                                    />
                                    <View style={styles.leftSide}>
                                        <Notifications
                                            online={this.setOnlineStt}
                                            onPress={() => this.setState({goToUser: false, goToNotifs: true})}
                                        />
                                        <Account
                                            style={{marginLeft: 10}}
                                            online={this.setOnlineStt}
                                            onPress={() => this.setState({goToNotifs: false, goToUser: true})}
                                        />
                                        <Exit
                                            style={{marginLeft: 10}}
                                            onPress={() => this.logout()}
                                        />
                                    </View>
                                </View>
                                {this.state.goToUser === true &&
                                    <>
                                        <View style={styles.fakeHeader}>
                                            <Text style={styles.fakeHeaderTitle}>My Account</Text>
                                            <Arrow style={styles.arrow} onPress={() => this.goBack()}/>
                                        </View>
                                        <User/>
                                    </>
                                }
                                {this.state.goToNotifs === true &&
                                    <>
                                        <View style={styles.fakeHeader}>
                                            <Text style={styles.fakeHeaderTitle}>Notifications</Text>
                                            <Arrow style={styles.arrow} onPress={() => this.goBack()}/>
                                        </View>
                                        <Notifs/>
                                    </>
                                }
                                {(this.state.goToUser === false && this.state.goToNotifs === false) &&
                                    <NavigationContainer>
                                        <Bottom online={this.setOnlineStt}/>
                                    </NavigationContainer>
                                }

                                {this.state.visible === true &&
                                    <Loader/>
                                }
                                <StatusBar style="auto"/>
                            </>
                        );
                    } else {
                        return (
                            <>
                                <View style={styles.view2}>
                                    <Image
                                        style={styles.logo}
                                        source={require('./assets/hyva.png')}
                                    />
                                </View>
                                <Login login={this.login}/>
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
                return (
                    <Loader/>
                )
            }
        } else {
            return null;
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
    leftSide: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontFamily: 'Lato-Bold'
    },
    fakeHeader: {
        backgroundColor: Css().root.yellow,
        alignItems: 'center',
        justifyContent: 'center',
        height: 56
    },
    fakeHeaderTitle: {
        color: Css().root.darkGrey,
        fontFamily: 'Lato-Black',
        fontSize: 24,
    },
    arrow: {
        position: 'absolute',
        top: 12,
        left: 10,
        zIndex: 2,
        width: 40,
        height: 40
    }
})