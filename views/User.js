import React from "react";
import { Text, ScrollView, View, StyleSheet } from "react-native";
import Css from "../utils/CSS";
import Perso from "../components/svg/Perso";
import Password from "../components/svg/Password";
import Device from "../components/svg/Device";
import Avatar from "../utils/Avatar.json";

export default class User extends React.Component {

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
                <View style={styles.container}>
                    <View style={styles.titleContainer}>
                        <Perso style={styles.svg} fill={Css().root.yellow}/>
                        <Text style={styles.title}>My Personal Data</Text>
                    </View>
                    <View style={styles.content}>

                    </View>
                </View>

                <View style={styles.container}>
                    <View style={styles.titleContainer}>
                        <Password style={styles.svg} fill={Css().root.yellow}/>
                        <Text style={styles.title}>My Password</Text>
                    </View>
                    <View style={styles.content}>

                    </View>
                </View>

                <View style={styles.container}>
                    <View style={styles.titleContainer}>
                        <Device style={styles.svg} fill={Css().root.yellow}/>
                        <Text style={styles.title}>My Connected Devices</Text>
                    </View>
                    <View style={styles.content}>

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
    },
})