import React from "react";
import { View, Text, StyleSheet, TextInput, Dimensions } from "react-native";
import Css from "../utils/CSS";
import Button from "../components/ui-kit/Button";
import EyeClose from "../components/svg/EyeClose";
import EyeOpen from "../components/svg/EyeOpen";
import { emailValidator } from "../utils/Validators";
import XHR from "../utils/XHR";

const screenWidth = Dimensions.get('screen').width,
    screenHeight = Dimensions.get('screen').height;

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: null,
            password: null,
            visible: false,
            login: props.login,
            emailCheck: null,
            message: null
        }
    }

    emailChecker = (email) => {
        if (email.length > 0) {
            let check = !!emailValidator(email);
            let mess = check === false ? 'Email format is incorrect' : null
            this.setState({emailCheck: check, message: mess, email: email})
        } else {
            this.setState({emailCheck: null, mess: null, email: email})
        }
    }

    passwordChecker = (pwd) => {

        if (pwd.length > 0) {
            let mess = this.state.emailCheck !== true ? 'Email format is incorrect' : null
            this.setState({password: pwd, message: mess})
        } else {
            this.setState({password: pwd, mess: null})
        }
    }

    connexion = () => {

        if (this.state.message === null
            && this.state.emailCheck === true
            && this.state.password
            && this.state.password.length > 0) {
            XHR('post', '/authorization-request', {'email': this.state.email, 'password': this.state.password }, (data) => {
                if (data.message) {
                    this.setState({message: data.message})
                } else {
                    this.state.login(data, this.state.email, this.state.password)
                }
            })

        } else {
            this.setState({message: 'Please fill all fields correctly'})
        }
    }

    render() {
        return(
            <View style={styles.view}>
                <Text style={styles.title}>Connexion</Text>
                {this.state.message !== null &&
                    <Text style={styles.warning}>
                        {this.state.message}
                    </Text>
                }
                <View style={styles.controls}>
                    <Text style={styles.label}>
                        Email
                    </Text>
                    <TextInput
                        style={[styles.input, styles.container, styles.solo]}
                        placeholder='Your email'
                        keyboardType='email-address'
                        autoCapitalize='none'
                        onChangeText={(text) => {
                            this.emailChecker(text)
                        }}
                    />
                </View>
                <View style={styles.controls}>
                    <Text style={styles.label}>
                        Password
                    </Text>
                    <View style={styles.container}>
                        <TextInput
                            style={[styles.input, styles.password]}
                            placeholder='Your password'
                            secureTextEntry={!this.state.visible}
                            autoCapitalize='none'
                            onChangeText={(text) => {
                                this.passwordChecker(text)
                            }}
                        />
                        {this.state.visible === false &&
                            <EyeOpen
                                onPress={() => this.setState({visible: true})}
                            />
                        }
                        {this.state.visible === true &&
                            <EyeClose
                                onPress={() => this.setState({visible: false})}
                            />
                        }
                    </View>
                </View>
                <Button
                    type='white'
                    label='Login'
                    style={styles.button}
                    process={() => this.connexion()}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Css().root.yellow
    },
    title: {
        fontFamily: 'Lato-Black',
        fontSize: 22
    },
    label: {
        marginBottom: 5,
        fontFamily: 'Lato-Bold'
    },
    controls: {
        width: screenWidth - 40,
        padding: 10,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        width: screenWidth - 60,
        padding: 10,
        backgroundColor: Css().root.white,
        borderRadius: 10
    },
    solo: {
        width: screenWidth - 60,
    },
    password: {
        width: screenWidth - 104
    },
    input: {
        backgroundColor: Css().root.white,
        color: Css().root.darkGrey,
        fontFamily: 'Lato-Light'
    },
    button: {
        marginTop: 20
    },
    warning: {
        color: Css().root.white,
        fontFamily: 'Lato-Light',
        marginTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        backgroundColor: Css().root.red,
        borderRadius: 6
    }
})