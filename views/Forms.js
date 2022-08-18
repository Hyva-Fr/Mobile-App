import React from "react";
import {Text, ScrollView, View, StyleSheet, TouchableHighlight, TextInput, Dimensions} from "react-native";
import Categories from "../components/svg/Categories";
import Css from "../utils/CSS";
import {getData} from "../utils/Storage";
import XHR from "../utils/XHR";
import * as Linking from "expo-linking";
import Mark from "../components/svg/Mark";
import Plus from "../components/svg/Plus";
import Minus from "../components/svg/Minus";
import Pen from "../components/svg/Pen";
import CloseSvg from "../components/svg/Close";
import FormParser from "../utils/FormParser";
import Button from "../components/ui-kit/Button";

const screenWidth = Dimensions.get('window').width

export default class Forms extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            categories: null,
            form: null,
            dropdown: null,
            formName: null,
            online: props.online
        }
    }

    componentDidMount() {
        this.state.online()
        getData('init', (json) => {
            XHR('get', '/forms', {'email': json.email, 'password': json.password}, (resp) => {
                if (resp.message === 'ok') {
                    this.setState({categories: resp.data})
                }
            }, json.token)
        })
    }

    setForm = (data, name) => {
        let form = JSON.parse(data),
            translate = {
                'footer': form.footer,
                'header': form.header,
                'main': {
                    'format': form.main.format,
                    'content': []
                }
            }
        let contents = form.main.content;
        for (let i = 0; i < contents.length; i++) {
            translate.main.content.push(JSON.parse(contents[i]))
        }
        this.setState({form: translate, formName: name})
    }

    formModal = () => {
        let form = this.state.form
        return(
            <View style={styles.modalContainer}>
                <View style={styles.modal}>
                    <CloseSvg
                        style={styles.close}
                        fill={Css().root.yellow}
                        onPress={() => this.setState({form: null})}
                    />
                    <View style={styles.modalTitleContainer}>
                        <Pen style={styles.svg} fill={Css().root.yellow}/>
                        <Text style={styles.title}>{this.state.formName}</Text>
                    </View>
                    <ScrollView
                        style={styles.modalScroll}
                        keyboardShouldPersistTaps='always'
                        keyboardDismissMode="on-drag"
                        contentContainerStyle={{alignItems: 'center'}}
                    >
                        {form.main.content.map((row, i) => {
                            return(
                                <FormParser key={i} data={row} index={i} listen={this.rowListener}/>
                            )
                        })}
                        <Button
                            type='yellow'
                            label='Validate'
                            style={styles.button}
                            process={() => this.validateForm()}
                        />
                    </ScrollView>
                </View>
            </View>
        )
    }

    rowListener = (data, i) => {
        let form = this.state.form
        if (form !== null) {
            console.log(data, form.main.content[i])
        }
    }

    validateForm = () => {
        let form = this.state.form
        if (form !== null) {
            console.log(form)
        }
    }

    render() {

        if (this.state.categories) {
            return (
                <>
                    {this.state.form &&
                        this.formModal()
                    }
                    <ScrollView style={styles.view}>
                        <View style={styles.container}>
                            <View style={styles.titleContainer}>
                                <Categories style={styles.svg} fill={Css().root.yellow}/>
                                <Text style={styles.title}>Categories</Text>
                            </View>
                            <View style={styles.content}>
                                {this.state.categories.map((category, i) => {
                                    if (category.forms.length > 0) {
                                        return (
                                            <View key={i} >
                                                <View style={styles.list}>
                                                    <View style={styles.cats}>
                                                        <Mark fill={Css().root.yellow}/>
                                                        <Text style={styles.text}>{category.name}</Text>
                                                    </View>
                                                    <View
                                                        style={(this.state.dropdown !== i) ? styles.action : styles.noAction}
                                                    >
                                                        {(this.state.dropdown !== i)
                                                            ? <Plus
                                                                onPress={() => this.setState({dropdown: i})}
                                                                fill={Css().root.white}
                                                            />
                                                            : <Minus
                                                                onPress={() => this.setState({dropdown: null})}
                                                                fill={Css().root.yellow}
                                                            />
                                                        }
                                                    </View>
                                                </View>
                                                {this.state.dropdown === i &&
                                                    <ScrollView>
                                                        {category.forms.map((form, j) => {
                                                            return (
                                                                <View
                                                                    key={j}
                                                                    style={styles.formContainer}
                                                                >
                                                                    <Pen fill={Css().root.white}/>
                                                                    <Text
                                                                        style={styles.form}
                                                                        onPress={() => this.setForm(form.form, form.name)}
                                                                    >
                                                                        {form.name}
                                                                    </Text>
                                                                </View>
                                                            )
                                                        })}
                                                    </ScrollView>
                                                }
                                            </View>
                                        )
                                    }
                                })}
                            </View>
                        </View>
                    </ScrollView>
                </>
            )
        } else {
            return null;
        }
    }
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        padding: 20
    },
    container: {
        width: '100%',
        backgroundColor: Css().root.white,
        borderRadius: 6,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: Css().root.thinGrey,
        marginBottom: 20
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
        padding: 10,
    },
    title: {
        fontFamily: 'Lato-Black',
        fontSize: 16
    },
    svg: {
        marginRight: 10
    },
    content: {
        borderStyle: 'solid',
        borderTopWidth: 1,
        borderTopColor: Css().root.yellow,
        padding: 10,
    },
    list: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
        marginTop: 10,
        flexWrap: 'wrap'
    },
    cats: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10
    },
    text: {
        marginLeft: 5,
        fontFamily: 'Lato-Light'
    },
    action: {
        marginRight: 10,
        borderRadius: 24,
        borderColor: Css().root.thinGrey,
        borderWidth: 1,
        borderStyle: 'solid',
        backgroundColor: Css().root.yellow,
    },
    noAction: {
        marginRight: 10,
        borderRadius: 24,
        borderColor: Css().root.thinGrey,
        borderWidth: 1,
        borderStyle: 'solid',
        backgroundColor: Css().root.lightGrey,
    },
    dropdown: {

    },
    formContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        padding: 10,
        justifyContent: 'center',
        backgroundColor: Css().root.yellow,
        borderRadius: 6,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: Css().root.lightGrey,
        marginBottom: 10
    },
    form: {
        fontFamily: 'Lato-Black',
        color: Css().root.white,
        marginLeft: 5,
        paddingBottom: 2
    },
    modalContainer: {
        position: 'absolute',
        flex: 1,
        top: 0,
        left: 0,
        zIndex: 3,
        width: screenWidth,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    modal: {
        width: screenWidth - 20,
        flex: 1,
        backgroundColor: Css().root.white,
        borderRadius: 6,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: Css().root.thinGrey,
    },
    close: {
        position: 'absolute',
        top: -7,
        right: -7,
        zIndex: 2,
        borderRadius: 24,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: Css().root.thinGrey,
        backgroundColor: Css().root.white
    },
    modalTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
        padding: 10,
    },
    modalScroll: {
        borderTopWidth: 1,
        borderStyle: 'solid',
        borderTopColor: Css().root.yellow,
        padding: 10
    },
    button: {
        marginTop: 20,
        marginBottom: 20
    }
})