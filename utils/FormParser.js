import React from "react";
import {View, Text, StyleSheet} from "react-native";
import Css from "./CSS";

export default function FormParser(props) {

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
    return(
        <View style={[styles.multiChoices, styles.common]}>
            <Text style={styles.label}>{props.data.label}</Text>
        </View>
    )
}

function NumberBlock(props) {
    return(
        <View style={[styles.numberBlock, styles.common]}>
            <Text style={styles.label}>{props.data.label}</Text>
        </View>
    )
}

function SingleChoice(props) {
    return(
        <View style={[styles.singleChoice, styles.common]}>
            <Text style={styles.label}>{props.data.label}</Text>
        </View>
    )
}

function ListBlock(props) {
    return(
        <View style={[styles.listBlock, styles.common]}>
            <Text style={styles.label}>{props.data.label}</Text>
        </View>
    )
}

function OneLineBlock(props) {
    return(
        <View style={[styles.oneLineBlock, styles.common]}>
            <Text style={styles.label}>{props.data.label}</Text>
        </View>
    )
}

function TextBlock(props) {
    return(
        <View style={[styles.textBlock, styles.common]}>
            <Text style={styles.label}>{props.data.label}</Text>
        </View>
    )
}

function CommentsBlock(props) {
    return(
        <View style={[styles.commentsBlock, styles.common]}>
            <Text style={styles.label}>{props.data.label}</Text>
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
        color: Css().root.lightGrey
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
})