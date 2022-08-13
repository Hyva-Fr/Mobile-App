import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Missions from "../../views/Missions";
import Forms from "../../views/Forms";
import { Image, View } from "react-native";
import Utils from "../../views/Utils";
import Css from '../../utils/CSS';
import FormSvg from '../svg/Forms';
import MissionsSvg from '../svg/Missions';
import UtilsSvg from '../svg/Utils'

const BottomTab = createBottomTabNavigator()

export default class Bottom extends React.Component {

    render() {

        return(
            <View style={{ flex:1, backgroundColor: Css().root.yellow }}>

                <BottomTab.Navigator
                    screenOptions={{
                        headerStyle: {
                            backgroundColor: Css().root.yellow,
                        },
                        headerTintColor: Css().root.darkGrey,
                        headerTitleStyle: {
                            fontFamily: 'Lato-Black',
                            fontSize: 24
                        },
                        headerTitleAlign: 'center',
                        tabBarStyle: { backgroundColor: Css().root.yellow },
                        tabBarShowLabel: false,
                        animation: 'slide_from_right',
                        animationTypeForReplace: 'push'
                    }}
                >

                    <BottomTab.Screen
                        name="Missions"
                        children={() => <Missions style={{padding: 10}}/>}
                        options={{
                            tabBarIcon: () => (<MissionsSvg/>),
                        }}
                    />

                    <BottomTab.Screen
                        name="Forms"
                        children={() => <Forms style={{padding: 10}}/>}
                        options={{
                            tabBarIcon: () => (<FormSvg/>),
                        }}
                    />

                    <BottomTab.Screen
                        name="Utils"
                        children={() => <Utils style={{padding: 10}}/>}
                        options={{
                            tabBarIcon: () => (<UtilsSvg/>),
                        }}
                    />

                </BottomTab.Navigator>

            </View>
        )
    }
}