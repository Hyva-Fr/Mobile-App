import React from "react";
import {Text, ScrollView, View, StyleSheet, Dimensions, TouchableHighlight, Switch} from "react-native";
import {getData, storeData} from "../utils/Storage";
import XHR from "../utils/XHR";
import Bell from "../components/svg/Bell";
import Users from "../components/svg/Users";
import Agency from "../components/svg/Agency";
import Email from "../components/svg/Email";
import Css from "../utils/CSS";
import * as Linking from 'expo-linking';
import Loader from "../components/ui-kit/Loader";

const screenWidth = Dimensions.get('window').width

export default class Infos extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            agency: null,
            users: null,
            sound: true,
            alert: true,
            badge: true,
            online: props.online
        }
    }

    componentDidMount() {
        this.state.online()
        getData('init', (json) => {
            XHR('get', '/users/' + json.id, {'email': json.email, 'password': json.password}, (resp) => {
                if (resp.message === 'ok') {
                    this.setState({agency: resp.agency})
                }
            }, json.token)
            XHR('get', '/users', {'email': json.email, 'password': json.password}, (resp) => {
                if (resp.message === 'ok') {
                    this.setState({users: resp.data})
                }
            }, json.token)
        })
        getData('notifs', (json) => {
            if (json !== null) {
                this.setState({
                    sound: json.sound,
                    alert: json.alert,
                    badge: json.badge
                })
            }
        })
    }

    setNotifications = () => {
        setTimeout(() => {
            storeData('notifs', JSON.stringify({sound: this.state.sound, alert: this.state.alert, badge: this.state.badge}))
        }, 500)
    }

    render() {

        if (this.state.users && this.state.agency) {
            return (
                <ScrollView style={styles.view}>
                    <View style={styles.container}>
                        <View style={styles.titleContainer}>
                            <Agency style={styles.svg} fill={Css().root.yellow}/>
                            <Text style={styles.title}>My Agency</Text>
                        </View>
                        <View style={styles.content}>
                            <Text style={styles.agencyName}>{this.state.agency.name}</Text>
                            <Text style={styles.agencyAddress}>
                                {this.state.agency.street}
                                {"\n"}
                                {this.state.agency.zip} {this.state.agency.city} - {this.state.agency.state}
                                {"\n"}
                                {this.state.agency.country.toUpperCase()} - {this.state.agency.zone.toUpperCase()}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.container}>
                        <View style={styles.titleContainer}>
                            <Users style={styles.svg} fill={Css().root.yellow}/>
                            <Text style={styles.title}>My Collaborators</Text>
                        </View>
                        <View style={styles.content}>
                            {this.state.users.map((user, i) => {
                                let url = 'mailto:' + user.email
                                return(
                                    <View key={i} style={styles.list}>
                                        <View>
                                            <Text style={styles.userName}>{user.name}</Text>
                                            <Text style={styles.userEmail}>{user.email}</Text>
                                        </View>
                                        <TouchableHighlight
                                            key={i}
                                            activeOpacity={1}
                                            underlayColor={Css().root.white}
                                            style={styles.imageView}
                                            onPress={() => {
                                                Linking.openURL(url)
                                            }}
                                        >
                                            <Email style={styles.svg} fill={Css().root.yellow}/>
                                        </TouchableHighlight>
                                    </View>

                                )
                            })}
                        </View>
                    </View>
                    <View style={styles.container}>
                        <View style={styles.titleContainer}>
                            <Bell style={styles.svg} fill={Css().root.yellow}/>
                            <Text style={styles.title}>Notifications Settings</Text>
                        </View>
                        <View style={styles.content}>
                            <Text style={styles.reboot}>Modifications will take effect on reboot.</Text>
                            <View style={styles.switch}>
                                <Switch
                                    trackColor={{ false: Css().root.thinGrey, true: Css().root.yellow }}
                                    thumbColor={this.state.sound ? Css().root.white : '#f4f3f4'}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={() => {
                                        this.setState({sound: !this.state.sound})
                                        this.setNotifications()
                                    }}
                                    value={this.state.sound}
                                />
                                <Text style={styles.switchLabel}>{(this.state.sound) ? 'Disable' : 'Enable'} notification sound</Text>
                            </View>
                            <View style={styles.switch}>
                                <Switch
                                    trackColor={{ false: Css().root.thinGrey, true: Css().root.yellow }}
                                    thumbColor={this.state.alert ? Css().root.white : '#f4f3f4'}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={() => {
                                        this.setState({alert: !this.state.alert})
                                        this.setNotifications()
                                    }}
                                    value={this.state.alert}
                                />
                                <Text style={styles.switchLabel}>{(this.state.alert) ? 'Display' : 'Hide'} notification alert</Text>
                            </View>
                            <View style={styles.switch}>
                                <Switch
                                    trackColor={{ false: Css().root.thinGrey, true: Css().root.yellow }}
                                    thumbColor={this.state.badge ? Css().root.white : '#f4f3f4'}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={() => {
                                        this.setState({badge: !this.state.badge})
                                        this.setNotifications()
                                    }}
                                    value={this.state.badge}
                                />
                                <Text style={styles.switchLabel}>{(this.state.badge) ? 'Display' : 'Hide'} notification badge</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            )
        } else {
            return null
        }
    }
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        padding: 20
    },
    container: {
        width: '100%',
        backgroundColor: Css().root.white,
        borderRadius: 6,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: Css().root.thinGrey,
        marginBottom: 20
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
        padding: 10,
    },
    title: {
        fontFamily: 'Lato-Black',
        fontSize: 16
    },
    svg: {
        marginRight: 10
    },
    content: {
        borderStyle: 'solid',
        borderTopWidth: 1,
        borderTopColor: Css().root.yellow,
        padding: 10,
    },
    agencyName: {
        fontFamily: 'Lato-Bold',
        fontSize: 16,
        marginBottom: 10
    },
    agencyAddress: {
        fontFamily: 'Lato-Light',
        fontSize: 14
    },
    list: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
        marginTop: 10,
    },
    userName: {
        fontFamily: 'Lato-Light',
    },
    userEmail: {
        fontFamily: 'Lato-LightItalic',
        fontSize: 10
    },
    switch: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    switchLabel: {
        fontFamily: 'Lato-Light',
        marginLeft: 5
    },
    reboot: {
        textAlign: 'center',
        fontFamily: 'Lato-LightItalic',
        fontSize: 14,
        color: Css().root.yellow,
        backgroundColor: Css().root.darkGrey,
        borderRadius: 6,
        padding: 10,
        marginTop: 10,
        marginBottom: 10
    }
})