import React, {useState} from "react";
import {View, Text, StyleSheet, TextInput, Pressable, Platform} from "react-native";
import Css from "./CSS";
import {Picker} from '@react-native-picker/picker';
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";
import CheckBox from "expo-checkbox";

export default function FormParser(props) {

    //console.log(props.data)

    switch(props.data.title) {
        case 'Start section':
            return <StartSection data={props.data} index={props.index}/>
        case 'End section':
            return <EndSection data={props.data} index={props.index}/>
        case 'Multi-choices block':
            return <MultiChoices data={props.data} index={props.index} listen={props.listen}/>
        case 'Number block':
            return <NumberBlock data={props.data} index={props.index} listen={props.listen}/>
        case 'Single-choice block':
            return <SingleChoice data={props.data} index={props.index} listen={props.listen}/>
        case 'List block':
            return <ListBlock data={props.data} index={props.index} listen={props.listen}/>
        case 'One-line block':
            return <OneLineBlock data={props.data} index={props.index} listen={props.listen}/>
        case 'Text block':
            return <TextBlock data={props.data} index={props.index} listen={props.listen}/>
        case 'Comments block':
            return <CommentsBlock data={props.data} index={props.index} listen={props.listen}/>
        case 'Options block':
            return <OptionsBlock data={props.data} index={props.index} listen={props.listen}/>
        case 'Images block':
            return <ImageBlock data={props.data} index={props.index} listen={props.listen}/>
        default:
            return null
    }
}

function StartSection(props) {
    return(
        <View style={[styles.startSection, styles.common]}>
            <Text style={styles.startLabel}>{props.data.label}</Text>
        </View>
    )
}

function EndSection(props) {
    return(
        <View style={[styles.endSection, styles.common]}/>
    )
}

function MultiChoices(props) {

    let selection = {check: [], other: null}

    const options = props.data.options,
        [selected, setSelected] = useState(selection),
        [other, setOther] = useState(null),
        [openOther, setOpenOther] = useState(false),
        others = ['autre', 'autres', 'other', 'others', '?']

    for (let i = 0; i < options.length; i++) {
        selection.check.push(null);
    }

    const getSelection = (value, index) => {

        if (others.includes(value) === true) {
            if (openOther === true) {
                setOpenOther(false)
                setOther(null)
            } else {
                setOpenOther(true)
            }
        }

        if (selected.check[index] === null) {
            selected.check[index] = value
        } else {
            selected.check[index] = null
            if (others.includes(value) === true) {
                selected.other = null
            }
        }
        props.listen(selected, props.index, props.data.type)
        setSelected(selected);
    }

    const getTextarea = (value) => {

        selected.other = value
        if (value.trim() === '') {
            value = null
        }
        setOther(value)
        props.listen(selected, props.index, props.data.type)
        setSelected(selected)
    }

    return(
        <View style={[styles.multiChoices, styles.common]}>
            <Text style={styles.label}>{props.data.label}</Text>
            <View style={styles.checkBoxContainer}>
                {options.map((option, i) => {
                    return(
                        <Pressable
                            style={styles.wrapper}
                            key={i}
                            onPressIn={() => getSelection(option, i)}
                        >
                            <CheckBox
                                value={selected.check[i] === option}
                                color={selected.check[i] === option ? Css().root.yellow : undefined}
                            />
                            <Text style={styles.text}>
                                {option}
                            </Text>
                        </Pressable>
                    )
                })}
                {openOther === true &&
                    <TextInput
                        multiline={true}
                        style={[styles.input, styles.textarea, styles.checkboxOther]}
                        onChangeText={text => getTextarea(text)}
                        autoCorrect={false}
                        defaultValue={other}
                    />
                }
            </View>
        </View>
    )
}

function NumberBlock(props) {
    return(
        <View style={[styles.numberBlock, styles.common]}>
            <Text style={styles.label}>{props.data.label}
                {(props.data.unit && props.data.unit !== '') &&
                    <Text style={styles.unit}> ({props.data.unit})</Text>
                }
            </Text>
            <TextInput
                style={styles.input}
                onChangeText={text => props.listen(text, props.index, props.data.type)}
                autoCorrect={false}
                keyboardType='decimal-pad'
            />
        </View>
    )
}

function SingleChoice(props) {

    let start = null
    if (props.data.options.length > 0) {
        start = props.data.options[0]
    }
    const [current, setCurrent] = useState(start);
    const [other, setOther] = useState(null);
    const others = ['autre', 'autres', 'other', 'others', '?'];


    return(
        <View style={[styles.singleChoice, styles.common]}>
            <Text style={styles.label}>{props.data.label}</Text>
            <View>
                <RadioButtonGroup
                    containerStyle={{ marginBottom: 10 }}
                    selected={current}
                    onSelected={(value) => {
                        setCurrent(value)
                        if (!others.includes(value)) {
                            setOther(null)
                        }
                        props.listen([value, other], props.index, props.data.type)
                    }}
                    radioBackground={Css().root.yellow}
                >
                    {props.data.options.map((option, i) => {
                        return(
                            <RadioButtonItem
                                key={i}
                                style={styles.radioItem}
                                value={option}
                                label={<Text style={styles.radio}>{option}</Text>}
                            />
                        )
                    })}
                </RadioButtonGroup>
                {others.includes(current) === true &&
                    <TextInput
                        multiline={true}
                        style={[styles.input, styles.textarea]}
                        onChangeText={text => {
                            if (text.trim() === '') {
                                text = null
                            }
                            setOther(text)
                            props.listen([current, text], props.index, props.data.type)
                        }}
                        autoCorrect={false}
                    />
                }
            </View>
        </View>
    )
}

function ListBlock(props) {
    let [option, setOption] = useState('Select an option')
    return(
        <View style={[styles.listBlock, styles.common]}>
            <Text style={styles.label}>{props.data.label}</Text>
            <View>
                <Text
                    style={styles.fakeInput}
                >
                    {option}
                </Text>
                <Picker
                    style={styles.picker}
                    themeVariant='dark'
                    itemStyle={styles.pickerItem}
                    onValueChange={(opt) => {
                        if (opt !== null) {
                            props.listen(opt, props.index, props.data.type)
                        }
                        setOption(opt)
                    }}>
                    <Picker.Item enabled={false} label="Select an option" value="none" />
                    {props.data.options.map((option, i) => {
                        return(
                            <Picker.Item key={i} label={option} value={option} />
                        )
                    })}
                </Picker>
            </View>
        </View>
    )
}

function OneLineBlock(props) {
    return(
        <View style={[styles.oneLineBlock, styles.common]}>
            <Text style={styles.label}>{props.data.label}</Text>
            <TextInput
                style={styles.input}
                onChangeText={text => props.listen(text, props.index, props.data.type)}
                autoCorrect={false}
            />
        </View>
    )
}

function TextBlock(props) {
    return(
        <View style={[styles.textBlock, styles.common]}>
            <Text style={styles.label}>{props.data.label}</Text>
            <TextInput
                multiline={true}
                style={[styles.input, styles.textarea]}
                onChangeText={text => props.listen(text, props.index, props.data.type)}
                autoCorrect={false}
            />
        </View>
    )
}

function CommentsBlock(props) {
    return(
        <View style={[styles.commentsBlock, styles.common]}>
            <Text style={styles.label}>{props.data.label}</Text>
            <TextInput
                multiline={true}
                style={[styles.input, styles.textarea]}
                onChangeText={text => props.listen(text, props.index, props.data.type)}
                autoCorrect={false}
            />
        </View>
    )
}

function OptionsBlock(props) {
    return(
        <View style={[styles.optionsBlock, styles.common]}>
            <Text style={styles.options}>{props.data.content}</Text>
        </View>
    )
}

function ImageBlock(props) {
    return(
        <View style={[styles.imageBlock, styles.common]}>
            <Text style={styles.label}>{props.data.label}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    common: {
        width: '100%',
        marginBottom: 10
    },
    label: {
        fontFamily: 'Lato-Bold',
        fontSize: 14,
        color: Css().root.lightGrey,
        marginBottom: 5
    },
    options: {
        fontFamily: 'Lato-LightItalic',
        fontSize: 12,
        textAlign: 'center',
        color: Css().root.lightGrey
    },
    startSection: {

    },
    startLabel: {
        fontFamily: 'Lato-Bold',
        fontSize: 16,
        color: Css().root.white,
        textAlign: 'center',
        padding: 10,
        backgroundColor: Css().root.yellow,
        borderRadius: 6
    },
    endSection: {
        borderBottomWidth: 1,
        borderStyle: 'solid',
        borderBottomColor: Css().root.thinGrey
    },
    multiChoices: {

    },
    numberBlock: {

    },
    unit: {
        fontFamily: 'Lato-LightItalic',
        fontSize: 12,
        color: Css().root.thinGrey,
        fontStyle: 'italic'
    },
    singleChoice: {

    },
    listBlock: {

    },
    oneLineBlock: {

    },
    textBlock: {

    },
    commentsBlock: {

    },
    optionsBlock: {

    },
    imageBlock: {

    },
    input: {
        width: '100%',
        padding: 10,
        borderRadius: 6,
        borderStyle: 'solid',
        borderColor: Css().root.thinGrey,
        borderWidth: 1,
        fontFamily: 'Lato-Light'

    },
    fakeInput: {
        width: '100%',
        paddingTop: 18,
        paddingBottom: 18,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 6,
        borderStyle: 'solid',
        borderColor: Css().root.thinGrey,
        borderWidth: 1,
        fontFamily: 'Lato-Light'
    },
    textarea: {
        backgroundColor: Css().root.white,
        height: 100,
        justifyContent: "flex-start",
        textAlignVertical: 'top'
    },
    picker: {
        position: 'absolute',
        top: 0,
        right: 0,
        zIndex: 2,
        width: 48,
        height: 30
    },
    pickerContainer: {
        marginTop: 10,
        fontFamily: 'Lato-Light',
        padding: 0
    },
    pickerItem: {
        fontFamily: 'Lato-Light',
    },
    checkBoxContainer: {
        width: "100%",
        marginBottom: 5
    },
    wrapper: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
    },
    text: {
        marginLeft: 10,
        fontFamily: 'Lato-Light',
    },
    radioItem: {
        marginTop: 10
    },
    radio: {
        fontFamily: 'Lato-Light',
        marginTop: 10,
        alignSelf: 'center',
        marginLeft: 10
    },
    checkboxOther: {
        marginTop: 10
    }
})