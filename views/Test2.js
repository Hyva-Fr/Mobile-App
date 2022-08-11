import React from "react";
import { View, Text } from "react-native";

export default class Test2 extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return(
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>Test 2</Text>
            </View>
        )
    }
}