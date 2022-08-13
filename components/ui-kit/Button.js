import React from "react";
import Css from '../../utils/CSS';
import { View, StyleSheet, Text, Pressable } from "react-native";

export default class Button extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            style: 'initial'
        }
    }

    type() {

        if (this.props.type === 'yellow') {
            return {
                initial: styles.yellowBtnInitial,
                focused: styles.yellowBtnFocused
            };
        } else if (this.props.type === 'white') {
            return {
                initial: styles.whiteBtnInitial,
                focused: styles.whiteBtnFocused
            };
        } else if (this.props.type === 'red') {
            return {
                initial: styles.redBtnInitial,
                focused: styles.redBtnFocused
            };
        }
    }

    render() {

        return(
            <Pressable
                style={[this.type()[this.state.style], styles.button]}
                onPressIn={() => {
                    this.props.process();
                    this.setState({style: 'focused'})
                }}
                onPressOut={() => this.setState({style: 'initial'})}
            >
                <Text style={[this.type()[this.state.style], styles.text]}>
                    {this.props.label}
                </Text>
            </Pressable>
        )
    }
}

const styles = StyleSheet.create({
    yellowBtnInitial: {
        backgroundColor: Css().root.yellow,
        color: Css().root.darkGrey
    },
    yellowBtnFocused: {
        backgroundColor: Css().root.white,
        color: Css().root.yellow
    },
    whiteBtnInitial: {
        backgroundColor: Css().root.white,
        color: Css().root.lightGrey
    },
    whiteBtnFocused: {
        backgroundColor: Css().root.lightGrey,
        color: Css().root.white
    },
    redBtnInitial: {
        backgroundColor: Css().root.red,
        color: Css().root.white
    },
    redBtnFocused: {
        backgroundColor: Css().root.white,
        color: Css().root.red
    },
    button: {
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 50,
        paddingRight: 50,
        borderRadius: 2000,
        fontWeight: 'bold',
        fontSize: 20
    },
    text: {
        fontWeight: 'bold',
        fontSize: 18
    }
})