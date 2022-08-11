import React from "react";
import {
    Text,
    FlatList,
    Image,
    View,
    StyleSheet,
    TextInput,
    Dimensions,
    Linking,
    TouchableOpacity
} from "react-native";
import XHR from "../utils/XHR";

const call = 'https://api.deezer.com/search?q='

export default class Feeds extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    handleText = (text) => {

        XHR('deezer', call, text, (response) => {
            this.setState({data: response})
        })
    }

    toURL = (link) => {
        Linking.openURL(link).catch((err) =>
            console.error('An error occurred', err),
        );
    }

    render() {

        return(
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="Taper le nom d'un artiste"
                    onChangeText={text => this.handleText(text)}
                />
                <FlatList
                    numColumns={3}
                    style={styles.list}
                    data={this.state.data}
                    renderItem={( {item} ) =>
                        <TouchableOpacity
                            style={styles.album}
                            onPress={() => this.toURL(item.link)}
                        >
                            <View style={styles.imgContainer}>
                                <Image source={{uri: item.album.cover}} style={styles.img} />
                            </View>
                            <Text style={styles.title}>{item.album.title}</Text>
                        </TouchableOpacity>
                    }
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    list: {
        flex: 1,
        width: Dimensions.get('window').width
    },
    album: {
        margin: 20,
        width: Dimensions.get('window').width / 3 - 40,
        fontSize: 18,
        marginBottom: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        textAlign: 'center',
        fontSize: 12,
        height: 30
    },
    input: {
        margin: 20,
        padding: 10,
        borderStyle: 'solid',
        borderBottomWidth: 1,
        borderBottomColor: '#E1E1E1',
        backgroundColor: '#fff',
        overflow: 'hidden',
        shadowOffset: { width: 15, height: 15 },
        shadowColor: 'black',
        shadowOpacity: 1,
        elevation: 4,
        borderRadius: 8
    },
    imgContainer: {
        height: Dimensions.get('window').width / 3 - 40,
        width: Dimensions.get('window').width / 3 - 40,
        marginBottom: 10,
        borderRadius: 10,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#A1A1A1',
        overflow: 'hidden',
        shadowOffset: { width: 15, height: 15 },
        shadowColor: 'black',
        shadowOpacity: 1,
        elevation: 4,
        backgroundColor: '#fff'
    },
    img: {
        height: Dimensions.get('window').width / 3 - 40,
        width: Dimensions.get('window').width / 3 - 40
    }
})