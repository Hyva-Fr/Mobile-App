import React from "react";
import { View, SafeAreaView, Text, StyleSheet, TextInput, Dimensions } from "react-native";
import Css from "../utils/CSS";
import Button from "../components/ui-kit/Button";

const screenWidth = Dimensions.get('screen').width,
    screenHeight = Dimensions.get('screen').height;

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: null,
            password: null
        }
    }

    connexion = () => {
        console.log(this.state.email, this.state.password)
    }

    render() {
        return(
            <SafeAreaView style={styles.view}>
                <Text style={styles.title}>Connexion</Text>
                <View style={styles.controls}>
                    <Text style={styles.label}>
                        Email
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Your email'
                        keyboardType='email-address'
                        onChangeText={(text) => this.setState({email: text})}
                    />
                </View>
                <View style={styles.controls}>
                    <Text style={styles.label}>
                        Password
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Your password'
                        secureTextEntry={true}
                        onChangeText={(text) => this.setState({password: text})}
                    />
                </View>
                <Button
                    type='yellow'
                    label='Login'
                    process={() => this.connexion()}
                />
            </SafeAreaView>
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
        fontWeight: 'bold',
        fontSize: 18
    },
    label: {

    },
    controls: {
        width: screenWidth - 40
    },
    input: {
        width: '100%',
        backgroundColor: Css().root.white,
        color: Css().root.darkGrey
    }
})