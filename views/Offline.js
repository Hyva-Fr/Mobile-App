import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default class Offline extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.content}>
                <Text>Salut</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: '#FCD833',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
    }
})