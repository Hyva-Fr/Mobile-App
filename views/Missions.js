import React from "react";
import { Text, ScrollView, View, StyleSheet } from "react-native";

export default class Missions extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {

    }

    render() {

        return(
            <ScrollView style={styles.view}>
                <Text>
                    Missions
                </Text>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    view: {
        flex: 1
    }
})