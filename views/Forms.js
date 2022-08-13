import React from "react";
import { Text, FlatList, Image, View, StyleSheet } from "react-native";
import XHR from "../utils/XHR";
import DateHumanizer from '../utils/DateHumanizer';

const call = 'http://api.eint-sandbox.fr?token=1234&'

export default class Forms extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount() {

        XHR('fred', call, {table: 'articles'}, (response) => {
            this.setState({data: response.data})
        })
    }

    render() {

        return(
            <View style={styles.container}>
                <FlatList
                    data={this.state.data}
                    renderItem={( {item} ) =>
                        <View style={styles.article}>
                            <Text
                                style={styles.title}
                            >
                                {item.title}
                            </Text>
                            <View style={styles.author_date}>
                                <Text style={styles.details}>
                                    Publié par {item.author}
                                </Text>
                                <Text style={styles.details}>
                                    le {DateHumanizer(item.date)}
                                </Text>
                            </View>
                            <Text
                                style={styles.chapo}
                            >
                                {item.chapo}
                            </Text>
                            <View style={styles.imgContainer}>
                                <Image
                                    source={{uri: item.image}}
                                    style={styles.img}
                                />
                            </View>
                            <Text
                                style={styles.content}
                            >
                                {item.content}
                            </Text>
                        </View>
                    }
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20
    },
    article: {
        padding: 20,
        margin: 20,
        fontSize: 18,
        marginBottom: 30,
        backgroundColor: '#E7E7E7',
        borderRadius: 10,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#fff',
        shadowOffset: { width: 15, height: 15 },
        shadowColor: 'black',
        shadowOpacity: 1,
        elevation: 4,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
        textAlign: 'center',
        paddingBottom: 20,
        borderStyle: 'solid',
        borderBottomWidth: 1,
        borderBottomColor: '#fff',
    },
    author_date: {
        marginTop: 10,
        marginBottom: 20,
        paddingBottom: 10,
        borderStyle: 'solid',
        borderBottomWidth: 1,
        borderBottomColor: '#fff',
    },
    details: {
        opacity: 0.5,
        fontStyle: 'italic',
        fontSize: 12,
        textAlign: 'center'
    },
    chapo: {
        fontWeight: 'bold',
        textAlign: 'justify',
        fontSize: 18,
    },
    imgContainer: {
        height: 200,
        width: '100%',
        marginTop: 20,
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
        height: 200
    },
    content: {
        textAlign: 'justify',
        marginTop: 20
    }
})