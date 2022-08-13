import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Css from '../utils/CSS';
import Button from "../components/ui-kit/Button";

export default class Offline extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            setOnlineStt: props.online,
            visible: props.visible
        }
    }

    render() {
        return (
            <View style={styles.content}>
                <Text
                    style={styles.text}
                >
                    <Text style={styles.warning}>You are offline.</Text>
                    {"\n\n"}
                    You must be online to access the app.
                    {"\n\n"}
                    Please click on the button below to refresh connexion statement.
                </Text>
                <Button
                    type='red'
                    label='Refresh'
                    process={() => this.state.setOnlineStt()}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: Css().root.yellow,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        padding: 20,
        backgroundColor: Css().root.white,
        color: Css().root.darkGrey,
        textAlign: 'center',
        marginBottom: 40,
        borderRadius: 10
    },
    warning: {
        color: Css().root.red,
        fontWeight: 'bold',
        fontSize: 18
    }
})