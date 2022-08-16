import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Missions from "../../views/Missions";
import Forms from "../../views/Forms";
import { SafeAreaView } from "react-native";
import Infos from "../../views/Infos";
import Css from '../../utils/CSS';
import FormSvg from '../svg/Forms';
import MissionsSvg from '../svg/Missions';
import InfosSvg from '../svg/Infos'

const BottomTab = createBottomTabNavigator()

export default class Bottom extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            getPreviousStack: props.getPreviousStack,
            setPreviousStack: props.setPreviousStack
        }
    }

    render() {

        return (
            <SafeAreaView style={{flex: 1, backgroundColor: Css().root.yellow}}>

                <BottomTab.Navigator
                    screenOptions={{
                        headerStyle: {
                            backgroundColor: Css().root.yellow,
                            height: 56
                        },
                        headerTintColor: Css().root.darkGrey,
                        headerTitleStyle: {
                            fontFamily: 'Lato-Black',
                            fontSize: 24,
                            top: -14
                        },
                        headerTitleAlign: 'center',
                        tabBarStyle: {backgroundColor: Css().root.yellow},
                        tabBarShowLabel: false,
                        animation: 'slide_from_right',
                        animationTypeForReplace: 'push',
                        backBehavior: 'history'
                    }}

                    initialRouteName={this.state.getPreviousStack()}
                >

                    <BottomTab.Screen
                        name="Missions"
                        children={() => <Missions style={{padding: 10}}/>}
                        options={{
                            tabBarIcon: (data) => (<MissionsSvg active={this.state.getPreviousStack()}/>),
                        }}
                        listeners={({ navigation, route }) => ({
                            tabPress: e => {
                                this.state.setPreviousStack(route.name)
                            },
                        })}
                    />

                    <BottomTab.Screen
                        name="Forms"
                        children={() => <Forms style={{padding: 10}}/>}
                        options={{
                            tabBarIcon: () => (<FormSvg active={this.state.getPreviousStack()}/>),
                        }}
                        listeners={({ navigation, route }) => ({
                            tabPress: e => {
                                this.state.setPreviousStack(route.name)
                            },
                        })}
                    />

                    <BottomTab.Screen
                        name="Infos"
                        children={() => <Infos style={{padding: 10}}/>}
                        options={{
                            tabBarIcon: () => (<InfosSvg active={this.state.getPreviousStack()}/>),
                        }}
                        listeners={({ navigation, route }) => ({
                            tabPress: e => {
                                this.state.setPreviousStack(route.name)
                            },
                        })}
                    />

                </BottomTab.Navigator>

            </SafeAreaView>
        )
    }
}