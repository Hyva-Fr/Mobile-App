import React from "react";
import {Text, ScrollView, View, StyleSheet, Image, Pressable, TextInput, Dimensions} from "react-native";
import Css from "../utils/CSS";
import Perso from "../components/svg/Perso";
import Password from "../components/svg/Password";
import DeviceSvg from "../components/svg/Device";
import Camera from "../components/svg/Camera";
import * as Device from 'expo-device';
import Avatar from "../utils/Avatar.json";
import XHR from "../utils/XHR";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import {PlaceholderContainer, Placeholder} from 'react-native-loading-placeholder';
import { LinearGradient } from 'expo-linear-gradient';
import Others from "../components/svg/Others";
import Button from "../components/ui-kit/Button";
import EyeOpen from "../components/svg/EyeOpen";
import EyeClose from "../components/svg/EyeClose";
import { getData } from '../utils/Storage';

const allowed = ['jpg', 'jpeg', 'png'];
const screenWidth = Dimensions.get('screen').width

const Gradient = () => {
    return (
        <LinearGradient
            colors={['#eeeeee', '#dddddd', '#eeeeee']}
            start={{ x: 1.0, y: 0.0 }}
            end={{ x: 0.0, y: 0.0 }}
            style={{
                flex: 1,
                width: 120
            }}
        />
    );
};

const ImageLoader = () => {
    return (
        <PlaceholderContainer
            style={styles.avatarContent}
            animatedComponent={<Gradient />}
            duration={1000}
            delay={500}
        >
            <Placeholder style={[styles.avatar, styles.placeholder, { width: 74, height: 74, borderRadius: 74 }]} />
        </PlaceholderContainer>
    );
};

const ConnectedDevices = () => {
    return (
        <PlaceholderContainer
            animatedComponent={<Gradient />}
            duration={1000}
            delay={1000}
        >
            <Placeholder style={[styles.device, styles.placeholder, { width: '100%', height: 20 }]} />
            <Placeholder style={[styles.device, styles.placeholder, { width: '100%', height: 20 }]} />
        </PlaceholderContainer>
    );
};

export default class User extends React.Component {

    timeOut;

    constructor(props) {
        super(props);
        this.state = {
            user: props.user,
            avatar: null,
            device: {'os': Device.osName, 'version': Device.osVersion, 'name': Device.deviceName},
            devices: [],
            pwd: null,
            newPwd: null,
            confirmPwd: null,
            errorPwd: null,
            pwdVisible: false,
            newPwdVisible: false,
            confirmPwdVisible: false,
            disconnect: props.logout,
            online: props.online
        }
    }

    componentDidMount() {
        this.state.online()
        getData('init', (data) => {
            XHR('post', '/profile/get-avatar/' + this.state.user.id, {}, (resp) => {
                console.log(resp)
                let avatar = (resp.data === null || resp.data === '') ? Avatar["default-avatar"] : resp.data
                this.setState({avatar: avatar})
            }, data.token)
            XHR('post', '/profile/get-devices/' + this.state.user.id, {}, (resp) => {
                let devices = resp.data,
                    parsed = [];
                if (devices) {
                    for (let i = 0; i < devices.length; i++) {
                        parsed.push(JSON.parse(devices[i]))
                    }
                }
                this.setState({devices: parsed})
            }, data.token)
        })
    }

    loadImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            let split = result.uri.split('.'),
                ext = split[split.length-1],
                base64 = await FileSystem.readAsStringAsync(result.uri, { encoding: 'base64' });
            if (allowed.includes(ext)) {
                let avatar = 'data:image/' + ext + ';base64,' +  base64;
                this.setState({avatar: avatar})
                XHR('post', '/profile/set-avatar/' + this.state.user.id, {'avatar': avatar}, () => {
                }, this.state.user.token)
            }
        } else {
            console.log('Failed to upload image')
        }
    }

    logout = () => {
        XHR('post', '/disconnect-from-all', {'device_name': JSON.stringify(this.state.device), 'email': this.state.user.email}, (resp) => {
            if (resp.data) {
                this.setState({devices: [JSON.parse(resp.data)]})
            }
        }, this.state.user.token)
    }

    changePassword = () => {
        if (this.state.errorPwd === null && this.state.pwd && this.state.pwd !== '' && this.state.newPwd && this.state.newPwd !== '' && this.state.confirmPwd && this.state.confirmPwd !== '') {
            XHR('post', '/profile/password/' + this.state.user.id, {'password': this.state.newPwd, 'old_password': this.state.pwd}, (resp) => {
                this.state.disconnect()
            }, this.state.user.token)
        } else {
            this.setState({errorPwd: 'Both fields must be filled.'})
        }
    }

    comparePwds = () => {
        clearTimeout(this.timeOut)
        this.timeOut = setTimeout(() => {
            if (this.state.newPwd && this.state.newPwd !== '' && this.state.confirmPwd && this.state.confirmPwd !== '') {
                if (this.state.newPwd !== this.state.confirmPwd) {
                    this.setState({errorPwd: 'Passwords must match.'})
                } else {
                    this.setState({errorPwd: null})
                }
            } else {
                this.setState({errorPwd: null})
            }
        }, 200)
    }

    render() {

        return (
            <ScrollView style={styles.view} contentContainerStyle={{alignItems: 'center'}}>
                <View style={styles.container}>
                    <View style={styles.titleContainer}>
                        <Perso style={styles.svg} fill={Css().root.yellow}/>
                        <Text style={styles.title}>My Personal Data</Text>
                    </View>
                    <View style={[styles.content, styles.avatarContainer]}>
                        {(this.state.avatar)
                            ? <>
                                <Pressable
                                    style={styles.avatarContent}
                                    onPressIn={() => this.loadImage()}
                                >
                                    <Image
                                        style={styles.avatar}
                                        source={{uri: this.state.avatar}}
                                    />
                                </Pressable>
                                <Text style={styles.formats}>Only {allowed.join(', ')} formats are allowed</Text>
                            </>
                            : <ImageLoader />

                        }
                    </View>
                </View>

                <View style={styles.container}>
                    <View style={styles.titleContainer}>
                        <Password style={styles.svg} fill={Css().root.yellow}/>
                        <Text style={styles.title}>My Password</Text>
                    </View>
                    <View style={styles.content}>
                        <Text style={styles.formats}>Once changed, you'll be logged out.</Text>
                        {this.state.errorPwd &&
                            <Text style={styles.errorPwd}>{this.state.errorPwd}</Text>
                        }
                        <View style={styles.control}>
                            <Text style={styles.label}>Current password</Text>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    placeholder='Your current password'
                                    style={styles.input}
                                    defaultValue={this.state.pwd}
                                    secureTextEntry={!this.state.pwdVisible}
                                    onChangeText={text => {
                                        this.setState({pwd: text})
                                        this.comparePwds()
                                    }}
                                />
                                {this.state.pwdVisible === false &&
                                    <EyeOpen
                                        onPress={() => this.setState({pwdVisible: true})}
                                    />
                                }
                                {this.state.pwdVisible === true &&
                                    <EyeClose
                                        onPress={() => this.setState({pwdVisible: false})}
                                    />
                                }
                            </View>
                        </View>
                        <View style={styles.control}>
                            <Text style={styles.label}>New password</Text>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    placeholder='Your new password'
                                    style={styles.input}
                                    defaultValue={this.state.newPwd}
                                    secureTextEntry={!this.state.newPwdVisible}
                                    onChangeText={text => {
                                        this.setState({newPwd: text})
                                        this.comparePwds()
                                    }}
                                />
                                {this.state.newPwdVisible === false &&
                                    <EyeOpen
                                        onPress={() => this.setState({newPwdVisible: true})}
                                    />
                                }
                                {this.state.newPwdVisible === true &&
                                    <EyeClose
                                        onPress={() => this.setState({newPwdVisible: false})}
                                    />
                                }
                            </View>
                        </View>
                        <View style={styles.control}>
                            <Text style={styles.label}>Confirm new password</Text>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    placeholder='Your new password confirmation'
                                    style={styles.input}
                                    secureTextEntry={!this.state.confirmPwdVisible}
                                    defaultValue={this.state.confirmPwd}
                                    onChangeText={text => {
                                        this.setState({confirmPwd: text})
                                        this.comparePwds()
                                    }}
                                />
                                {this.state.confirmPwdVisible === false &&
                                    <EyeOpen
                                        onPress={() => this.setState({confirmPwdVisible: true})}
                                    />
                                }
                                {this.state.confirmPwdVisible === true &&
                                    <EyeClose
                                        onPress={() => this.setState({confirmPwdVisible: false})}
                                    />
                                }
                            </View>
                        </View>
                        <Button
                            type='yellow'
                            label='Change password'
                            style={styles.button}
                            process={() => this.changePassword()}
                        />
                    </View>
                </View>

                <View style={styles.container}>
                    <View style={styles.titleContainer}>
                        <DeviceSvg style={styles.svg} fill={Css().root.yellow}/>
                        <Text style={styles.title}>My Connected Devices</Text>
                    </View>
                    <View style={styles.content}>
                        {this.state.devices.length > 0
                            ? this.state.devices.map((device, i) => {
                                return(
                                    <View key={i} style={styles.device}>
                                        <Others style={{marginLeft: 10}} fill={Css().root.green}/>
                                        <Text style={styles.deviceText}>{device.name}</Text>
                                    </View>
                                )
                            })
                            : <ConnectedDevices />
                        }
                        {this.state.devices.length > 0 &&
                            <Button
                                type='yellow'
                                label='Logout from all'
                                style={styles.button}
                                process={() => this.logout()}
                            />
                        }
                    </View>
                </View>
            </ScrollView>
        )
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
        alignItems: 'center'
    },
    avatarContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    avatarContent: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 80,
        height: 80,
        borderRadius: 80,
        resizeMode: 'cover',
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: Css().root.yellow,
        elevation: 3,
        backgroundColor: Css().root.white
    },
    avatar: {
        width: 74,
        height: 74,
        resizeMode: 'cover',
        borderRadius: 74,
    },
    placeholder: {
        backgroundColor: '#eeeeee'
    },
    device: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 5,
        width: '100%'
    },
    deviceText: {
        fontFamily: 'Lato-Light',
        fontSize: 14,
        marginLeft: 10
    },
    formats: {
        textAlign: 'center',
        fontFamily: 'Lato-LightItalic',
        fontSize: 14,
        color: Css().root.yellow,
        backgroundColor: Css().root.darkGrey,
        borderRadius: 6,
        padding: 10,
        marginTop: 10,
        marginBottom: 10
    },
    button: {
        marginTop: 20,
        marginBottom: 10
    },
    errorPwd: {
        backgroundColor: Css().root.red,
        color: Css().root.white,
        padding: 5,
        borderRadius: 6,
        fontFamily: 'Lato-LightItalic'
    },
    control: {
        width: '100%',
        marginTop: 10
    },
    label: {
        marginBottom: 5,
        fontFamily: 'Lato-Bold'
    },
    input: {
        backgroundColor: Css().root.white,
        color: Css().root.darkGrey,
        fontFamily: 'Lato-Light',
        width: screenWidth - 106
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        padding: 10,
        backgroundColor: Css().root.white,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: Css().root.thinGrey,
        borderRadius: 6
    }
})