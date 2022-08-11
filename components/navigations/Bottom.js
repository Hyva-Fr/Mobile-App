import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Settings from "../../views/Settings";
import Options from "../../views/Options";
import { Image } from "react-native";

const BottomTab = createBottomTabNavigator()

export default class Bottom extends React.Component {

    render() {

        return(
            <BottomTab.Navigator>

                <BottomTab.Screen
                    name="Settings"
                    children={() => <Settings/>}
                    options={{
                        tabBarIcon: () => (<Image source={require('../../assets/cog.png')} style={{width: 20, height: 20}}/>)
                    }}
                />

                <BottomTab.Screen
                    name="Options"
                    children={() => <Options/>}
                    options={{
                        tabBarIcon: () => (<Image source={require('../../assets/tools.png')} style={{width: 20, height: 20}}/>)
                    }}
                />

            </BottomTab.Navigator>
        )
    }
}