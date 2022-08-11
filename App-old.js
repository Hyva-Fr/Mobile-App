import React from "react";
import { StatusBar } from 'expo-status-bar';
import CSS from "./utils/CSS";

const windowWidth = Dimensions.get('window').width,
    windowHeight = Dimensions.get('window').height;

export default class App extends React.Component {

    render() {

        let css = CSS();

        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text style={[styles.text, css.class1]}>Je suis ravi que ça fonctionne !</Text>
                    <Image
                        source={require("./assets/studio-chiffo.jpg")}
                        /*style={{width: windowWidth, resizeMode: 'contain'}}*/
                        style={ [ {resizeMode: 'contain'}, styles.image ] }
                    />
                </View>
                <View style={styles.container}>
                    <Text style={css.class2}>Je suis la deuxième View !</Text>
                    <Image
                        source={require("./assets/studio-chiffo.jpg")}
                        /*style={{width: windowWidth, resizeMode: 'contain'}}*/
                        style={ [ {resizeMode: 'contain'}, styles.image ] }
                    />
                </View>
                <View style={styles.container}>
                    <Text style={styles.text}>Je suis la troisième View !</Text>
                    <Image
                        source={require("./assets/studio-chiffo.jpg")}
                        /*style={{width: windowWidth, resizeMode: 'contain'}}*/
                        style={ [ {resizeMode: 'contain'}, styles.image ] }
                    />
                </View>
                <StatusBar style="auto"/>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        /*flex: 1,*/
        height: windowHeight/2,
        backgroundColor: '#141414',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#fff'
    },
    image: {
        height: 200
    }
});
