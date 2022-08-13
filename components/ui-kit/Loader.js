import React, { useState } from 'react';
import { StyleSheet, View, Text, Animated } from "react-native";
import Css from "../../utils/CSS";

export default class Loader extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            startValue: new Animated.Value(0),
            endValue: 1,
        };
    }

    animation = () => {
        return {
            transform: [
                {
                    rotate: this.state.startValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0deg', '360deg'],
                    })
                },
            ]
        }
    };

    componentDidMount() {
        Animated.loop(
            Animated.timing(this.state.startValue, {
                toValue: this.state.endValue,
                duration: 800,
                useNativeDriver: true,
            }),
            {iterations: -1},
        ).start();
    }

    render() {

        return (
            <View style={styles.page}>
                <View style={styles.view}>
                    <Animated.View style={[styles.container, this.animation()]}>
                        <Animated.View style={[styles.loader, this.animation()]}>
                            <Animated.View style={[styles.center, this.animation()]}/>
                        </Animated.View>
                    </Animated.View>
                    <Text style={styles.text}>Loading...</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    page: {
        height: '100%',
        width: '100%',
        backgroundColor: Css().root.yellow,
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    view: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: Css().root.white,
        borderRadius: 10,
        elevation: 6
    },
    container: {
        width: 60,
        height: 60,
        borderRadius: 60,
        borderWidth: 5,
        borderStyle: 'solid',
        borderTopColor: 'transparent',
        borderRightColor: 'transparent',
        borderLeftColor: Css().root.red,
        borderBottomColor: Css().root.red,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loader: {
        width: 40,
        height: 40,
        borderRadius: 40,
        borderWidth: 5,
        borderStyle: 'solid',
        borderTopColor: Css().root.red,
        borderBottomColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: Css().root.red,
        alignItems: 'center',
        justifyContent: 'center',
    },
    center: {
        width: 20,
        height: 20,
        borderRadius: 25,
        borderWidth: 4,
        borderStyle: 'solid',
        borderTopColor: 'transparent',
        borderBottomColor: Css().root.red,
        borderLeftColor: Css().root.red,
        borderRightColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontFamily: 'Lato-Bold',
        letterSpacing: 1,
        fontSize: 18,
        marginLeft: 20
    }
});