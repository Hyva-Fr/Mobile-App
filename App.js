import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
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
import { SafeAreaProvider } from "react-native-safe-area-context";
import { storeData, getData } from './utils/Storage';
import XHR from "./utils/XHR";

const {StatusBarManager} = NativeModules;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isOnline: false,
            visible: false,
            start: false,
            user: null,
            fontLoaded: false,
            goToUser: false,
            goToNotifs: false,
            lastStack: 'Missions',
            headerIcon: null
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
            'Lato-Italic': require('./assets/fonts/Lato-Italic.ttf'),
            'Lato-LightItalic': require('./assets/fonts/Lato-LightItalic.ttf'),
        });
        this.setState({ fontsLoaded: true });
    }

    isOnlineChecker = () => {
        OnlineStt((stt) => {
            this.setState({isOnline: stt, visible: false, start: true})
        });
    }

    login = (data, email, pwd) => {
        this.setState({visible: true})
        storeData('init',
            JSON.stringify({'token': data.token, 'email': email, 'password': pwd, 'id': data.id, 'name': data.name, 'notifications': data.notifications}),
            (json) => {
            XHR('get', '/users/' + json.id, {'email': json.email, 'password': json.password}, (resp) => {
                if (resp.message === 'ok') {
                    this.setState({user: resp})
                    setTimeout(() => {
                        this.setState({visible: false})
                    }, 2000)
                }
            }, json.token)
        })
    }

    logout = () => {
        console.log('logout')
    }

    componentDidMount() {
        this.loadFonts()
        this.isOnlineChecker()
        getData('init', (data) => {
            this.setState({user: data})
        })
    }

    goBack = (stack) => {
        this.setState({
            goToUser: false,
            goToNotifs: false,
            lastStack: stack,
            headerIcon: null
        })
    }

    getPreviousStack = () => {
        return this.state.lastStack
    }

    setPreviousStack = (stack) => {
        this.setState({lastStack: stack})
    }

    render() {

        if (this.state.fontsLoaded) {
            if (this.state.start === true) {
                if (this.state.isOnline === true) {
                    if (this.state.user !== null) {
                        return (
                            <SafeAreaProvider
                                style={styles.safe}
                                initialMetrics={{
                                    insets: {
                                        top: 0,
                                        right: 0,
                                        bottom: 0,
                                        left: 0
                                    }
                                }}
                            >
                                <View style={styles.view}>
                                    <Image
                                        style={styles.logo}
                                        source={require('./assets/hyva.png')}
                                    />
                                    <View style={styles.leftSide}>
                                        <Notifications
                                            online={this.setOnlineStt}
                                            onPress={() => this.setState({goToUser: false, goToNotifs: true, headerIcon: 'Notifications'})}
                                            headerIcon={this.state.headerIcon}
                                        />
                                        <Account
                                            style={{marginLeft: 20}}
                                            online={this.setOnlineStt}
                                            onPress={() => this.setState({goToNotifs: false, goToUser: true, headerIcon: 'Account'})}
                                            headerIcon={this.state.headerIcon}
                                        />
                                        <Exit
                                            style={{marginLeft: 20}}
                                            onPress={() => this.logout()}
                                        />
                                    </View>
                                </View>
                                {this.state.goToUser === true &&
                                    <>
                                        <View style={styles.fakeHeader}>
                                            <Text style={styles.fakeHeaderTitle}>My Account</Text>
                                            <Arrow style={styles.arrow} onPress={() => this.goBack(this.state.lastStack)}/>
                                        </View>
                                        <User/>
                                    </>
                                }
                                {this.state.goToNotifs === true &&
                                    <>
                                        <View style={styles.fakeHeader}>
                                            <Text style={styles.fakeHeaderTitle}>Notifications</Text>
                                            <Arrow style={styles.arrow} onPress={() => this.goBack(this.state.lastStack)}/>
                                        </View>
                                        <Notifs/>
                                    </>
                                }
                                {(this.state.goToUser === false && this.state.goToNotifs === false) &&
                                    <NavigationContainer>
                                        <Bottom
                                            online={this.setOnlineStt}
                                            setPreviousStack={this.setPreviousStack}
                                            getPreviousStack={this.getPreviousStack}/>
                                    </NavigationContainer>
                                }

                                {this.state.visible === true &&
                                    <Loader/>
                                }
                                <StatusBar style="auto"/>
                            </SafeAreaProvider>
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
    safe: {
        flex: 1
    },
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