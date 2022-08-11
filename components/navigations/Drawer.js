import React from "react";
import { createDrawerNavigator, DrawerItemList } from "@react-navigation/drawer";
import Articles from "../../views/Articles";
import Feeds from "../../views/Feeds";
import { SafeAreaView, View, Image, Dimensions } from "react-native";
import Swiper from "./Swiper";
import Bottom from "./Bottom";

const MyDrawer = createDrawerNavigator(),
    winHeight = Dimensions.get("window").height;

export default class Drawer extends React.Component {

    render() {

        return (
            <MyDrawer.Navigator
                drawerContent={(props) => {
                    return(
                        <SafeAreaView>
                            <View
                                style={{
                                    height: winHeight/3,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    overflow: 'hidden',
                                    marginTop: winHeight/15,
                                    marginBottom: winHeight/20
                                }}
                            >
                                <Image
                                    source={require('../../assets/dragon.jpg')}
                                    style={{
                                        height: '100%',
                                        resizeMode: 'contain'
                                    }}
                                />
                            </View>
                            <DrawerItemList {...props} />
                        </SafeAreaView>
                    )
                }}
            >

                <MyDrawer.Screen
                    name="Articles"
                    children={() => <Articles />}
                />

                <MyDrawer.Screen
                    name="Feeds"
                    children={() => <Feeds />}
                />

                <MyDrawer.Screen
                    name="Swiper"
                    children={() => <Swiper />}
                />

                <MyDrawer.Screen
                    name="Bottom"
                    children={() => <Bottom />}
                />

            </MyDrawer.Navigator>
        )
    }
}