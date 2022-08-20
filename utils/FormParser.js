import React, {useState} from "react";
import {View, Text, StyleSheet, TextInput, Pressable, Image, Dimensions} from "react-native";
import Css from "./CSS";
import {Picker} from '@react-native-picker/picker';
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";
import CheckBox from "expo-checkbox";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import XHR from "./XHR";
import Button from "../components/ui-kit/Button";
import Close from "../components/svg/Close";

const screenWidth = Dimensions.get('window').width

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
        setSelected({...selected});
    }

    const getTextarea = (value) => {

        selected.other = value
        if (value.trim() === '') {
            value = null
        }
        setOther(value)
        props.listen(selected, props.index, props.data.type)
        setSelected({...selected})
    }

    return(
        <View style={[styles.multiChoices, styles.common]}>
            <Text style={styles.label}>{props.data.label}</Text>
            <View style={styles.checkBoxContainer}>
                {options.map((option, i) => {
                    let sel = selected.check[i] && selected.check[i] === option
                    return(
                        <Pressable
                            style={styles.wrapper}
                            key={i}
                            onPressIn={() => getSelection(option, i)}
                        >
                            <CheckBox
                                value={sel}
                                color={sel ? Css().root.yellow : undefined}
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

    const [current, setCurrent] = useState(null);
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

    const allowed = ['jpg', 'jpeg', 'png'];
    let imgs = []
    let [images, setImages] = useState([])

    const loadImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            let split = result.uri.split('.'),
                ext = split[split.length-1],
                base64 = await FileSystem.readAsStringAsync(result.uri, { encoding: 'base64' });
            if (allowed.includes(ext)) {
                images.push('data:image/' + ext + ';base64,' +  base64);
                console.log(images)
                setImages([...images])
                props.listen(images, props.index, props.data.type)
            }
        } else {
            console.log('Failed to upload image')
        }
    }

    const close = (index) => {
        images.splice(index, 1);
        setImages([...images])
        props.listen(images, props.index, props.data.type)
    }

    return(
        <View style={[styles.imageBlock, styles.common]}>
            <Text style={styles.label}>{props.data.label}</Text>
            {(images.length > 0)
                ? <View style={styles.imagesContainer}>
                    {images.map((img, i) => {
                        return(
                            <View key={i} style={styles.imagePreview}>
                                <Close
                                    fill={Css().root.yellow}
                                    style={styles.close}
                                    onPress={() => close(i)}
                                />
                                <Image
                                    style={styles.image}
                                    source={{uri: img}}
                                />
                            </View>
                        )
                    })}
                </View>
                : <View>
                    <Text style={styles.noImg}>No image uploaded.</Text>
                </View>
            }
            <Button
                type='yellow'
                label='Upload'
                style={styles.button}
                process={() => loadImage()}
            />
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
    },
    button: {
        marginTop: 20,
        alignSelf: 'center'
    },
    noImg: {
        width: '100%',
        fontFamily: 'Lato-LightItalic',
        color: Css().root.thinGrey,
        textAlign: 'center'
    },
    close: {
        position: 'absolute',
        top: 0,
        right: 0,
        zIndex: 2,
        borderRadius: 24
    },
    imagesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap'
    },
    imagePreview: {
        resizeMode: 'cover',
        width: (screenWidth - 50)/2,
        height: (screenWidth - 50)/2,
        borderRadius: 6,
    },
    image: {
        resizeMode: 'cover',
        width: '100%',
        height: '100%',
        borderRadius: 6,
        marginBottom: 10
    }
})