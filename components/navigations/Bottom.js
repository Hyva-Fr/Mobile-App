import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Settings from "../../views/Settings";
import Options from "../../views/Options";
import { Image, View, StyleSheet } from "react-native";
import Articles from "../../views/Articles";
import Feeds from "../../views/Feeds";

const BottomTab = createBottomTabNavigator()

export default class Bottom extends React.Component {

    render() {

        return(
            <View style={{ flex:1, backgroundColor: '#FCD833' }}>

                <BottomTab.Navigator
                    screenOptions={{
                        headerStyle: {
                            backgroundColor: '#FCD833',
                        },
                        headerTintColor: '#273238',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                        headerTitleAlign: 'center',
                        tabBarStyle: { backgroundColor: '#FCD833' },
                        tabBarShowLabel: false,
                        animation: 'slide_from_right',
                        animationTypeForReplace: 'push'
                    }}
                >

                    <BottomTab.Screen
                        name="Settings"
                        children={() => <Settings style={{padding: 10}}/>}
                        options={{
                            tabBarIcon: () => (<Image source={require('../../assets/cog.png')} style={{width: 20, height: 20}}/>),
                        }}
                    />

                    <BottomTab.Screen
                        name="Articles"
                        children={() => <Articles style={{padding: 10}}/>}
                        options={{
                            tabBarIcon: () => (<Image source={require('../../assets/tools.png')} style={{width: 20, height: 20}}/>),
                        }}
                    />

                    <BottomTab.Screen
                        name="Feeds"
                        children={() => <Feeds style={{padding: 10}}/>}
                        options={{
                            tabBarIcon: () => (<Image source={require('../../assets/bath.png')} style={{width: 20, height: 20}}/>),
                        }}
                    />

                    <BottomTab.Screen
                        name="Options"
                        children={() => <Options style={{padding: 10}}/>}
                        options={{
                            tabBarIcon: () => (<Image source={require('../../assets/tools.png')} style={{width: 20, height: 20}}/>),
                        }}
                    />

                    <BottomTab.Screen
                        name="Options2"
                        children={() => <Feeds style={{padding: 10}}/>}
                        options={{
                            tabBarIcon: () => (<Image source={require('../../assets/thermometer.png')} style={{width: 10, height: 20}}/>),
                        }}
                    />

                </BottomTab.Navigator>

            </View>
        )
    }
}

const style = StyleSheet.create({
    label: { display: 'none' }
});