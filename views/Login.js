import React from "react";
import { View, Text, StyleSheet, TextInput, Dimensions } from "react-native";
import Css from "../utils/CSS";
import Button from "../components/ui-kit/Button";
import EyeClose from "../components/svg/EyeClose";
import EyeOpen from "../components/svg/EyeOpen";

const screenWidth = Dimensions.get('screen').width,
    screenHeight = Dimensions.get('screen').height;

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: null,
            password: null,
            visible: false,
            login: props.login
        }
    }

    connexion = () => {
        this.state.login(this.state.email, this.state.password)
    }

    render() {
        return(
            <View style={styles.view}>
                <Text style={styles.title}>Connexion</Text>
                <View style={styles.controls}>
                    <Text style={styles.label}>
                        Email
                    </Text>
                    <TextInput
                        style={[styles.input, styles.container, styles.solo]}
                        placeholder='Your email'
                        keyboardType='email-address'
                        onChangeText={(text) => this.setState({email: text})}
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
                            onChangeText={(text) => this.setState({password: text})}
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
    }
})