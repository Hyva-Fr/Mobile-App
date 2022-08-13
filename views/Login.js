import React from "react";
import { View, Text, StyleSheet, TextInput, Dimensions } from "react-native";
import Css from "../utils/CSS";

const screenWidth = Dimensions.get('screen').width,
    screenHeight = Dimensions.get('screen').height;

export default class Login extends React.Component {

    constructor(props) {
        super(props);
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
                        style={styles.input}
                        placeholder='Your email'
                    />
                </View>
                <View style={styles.controls}>
                    <Text style={styles.label}>
                        Password
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Your password'
                    />
                </View>
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