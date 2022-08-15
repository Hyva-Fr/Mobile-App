import React, {useCallback} from "react";
import { Text, ScrollView, View, StyleSheet, Dimensions, Image, TouchableHighlight, TextInput } from "react-native";
import XHR from "../utils/XHR";
import {getData} from "../utils/Storage";
import Loader from "../components/ui-kit/Loader";
import Css from '../utils/CSS';
import MissionSvg from "../components/svg/Missions";
import FolderSvg from "../components/svg/Folder";
import CloseSvg from "../components/svg/Close";
import {dateHumanizer, getSqlDate} from "../utils/DateHumanizer";
import * as Linking from 'expo-linking';
import Pdf from "../components/svg/Pdf";
import Excel from "../components/svg/Excel";
import Button from "../components/ui-kit/Button";

const screenWidth = Dimensions.get('window').width,
    webSiteURL = 'https://hyva.eint-sandbox.fr/',
    storageURL = webSiteURL + 'storage/';

export default class Missions extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            missions: null,
            mission: null,
            init: null,
            comment: null,
            comments: []
        }
    }

    componentDidMount() {
        getData('init', (json) => {
            XHR('get', '/missions', {email: json.email, password: json.password}, (data) => {
                this.setState({missions: data.data, init: json})
            }, json.token)
        })
    }

    sendComment = (mission_id) => {
        let comment = this.state.comment;
        if (this.state.comment && this.state.comment.trim() !== '') {
            let json = {
                'user_id': this.state.init.id,
                'mission_id': mission_id,
            },
                date = getSqlDate();

            json['created_at'] = dateHumanizer(date)
            console.log(json)
        }
    }

    renderImages = (images) => {
        let imgs = JSON.parse(images)
        return imgs.map((image, i) => {
            let url = storageURL + image
            return(
                <TouchableHighlight
                    key={i}
                    activeOpacity={1}
                    underlayColor={Css().root.white}
                    style={styles.imageView}
                    onPress={() => {
                        Linking.openURL(url)
                    }}
                >
                    <Image
                        style={styles.images}
                        source={{
                            uri: storageURL + image
                        }}
                    />
                </TouchableHighlight>
            )
        })
    }

    renderList = (uri, title, type) => {
        if (uri !== null && uri !== '') {
            return (
                <View
                    style={styles.docList}
                >
                    {(type === 'pdf')
                        ? <Pdf style={styles.icon} fill={Css().root.red}/>
                        : <Excel style={styles.icon} fill={Css().root.green}/>
                    }
                    <TouchableHighlight
                        activeOpacity={1}
                        underlayColor={Css().root.white}
                        onPress={() => Linking.openURL(storageURL + uri)}
                    >
                        <Text style={styles.sideIconText}>{title}</Text>
                    </TouchableHighlight>
                </View>
            )
        } else {
            return (
                <Text style={styles.noDocList}>No {title} available</Text>
            )
        }
    }

    missionModal = () => {
        let mission = this.state.mission
        return(
            <View style={styles.modalContainer}>
                <View style={styles.modal}>
                    <CloseSvg
                        style={styles.close}
                        fill={Css().root.yellow}
                        onPress={() => this.setState({mission: null})}
                    />
                    <View style={styles.modalTitleContainer}>
                        <MissionSvg style={styles.svg} fill={Css().root.yellow}/>
                        <Text style={styles.title}>{mission.serial}</Text>
                    </View>
                    <ScrollView style={styles.modalScroll}>
                        <View style={styles.sections}>
                            <Text style={styles.sectionTitle}>Customer information</Text>
                            <Text style={styles.societyName}>{mission.society.name}</Text>
                            {(mission.society.description !== null && mission.society.description !== '') &&
                                <Text style={styles.small}>{mission.society.description}</Text>
                            }
                            <Text style={styles.societyAddress}>
                                {mission.society.street}
                                {"\n"}
                                {mission.society.zip} {mission.society.city}
                                {"\n"}
                                {mission.society.country.toUpperCase()}
                            </Text>
                        </View>
                        <View style={[styles.sections, styles.notFirstSection]}>
                            <Text style={styles.sectionTitle}>Documents</Text>
                            {this.renderList(mission.distribution_plan, 'Distribution plan', 'pdf')}
                            {this.renderList(mission.clamping_plan, 'Clamping plan', 'pdf')}
                            {this.renderList(mission.electrical_diagram, 'Electrical diagram', 'excel')}
                            {this.renderList(mission.workshops_help, 'Workshops help', 'pdf')}
                            {this.renderList(mission.delivery_note, 'Delivery note', 'pdf')}
                            {this.renderList(mission.receipt, 'Receipt', 'pdf')}
                        </View>
                        {(mission.images !== null && mission.images !== '') &&
                            <View style={[styles.sections, styles.notFirstSection]}>
                                <Text style={styles.sectionTitle}>Images</Text>
                                <View style={styles.imagesContainer}>
                                    {this.renderImages(mission.images)}
                                </View>
                            </View>
                        }
                        <View style={[styles.sections, styles.notFirstSection]}>
                            <Text style={[styles.sectionTitle, styles.commentsContainer]}>Comments</Text>
                            {mission.comments.map((comment, i) => {
                                return(
                                    <View
                                        key={i}
                                    >
                                        <Text style={styles.infos}>The {dateHumanizer(comment.created_at, 'date')} by {comment.user}</Text>
                                        <Text style={styles.comment}>{comment.comment}</Text>
                                    </View>
                                )
                            })}
                            {this.state.comments.map((comment, i) => {
                                return(
                                    <View
                                        key={i}
                                    >
                                        <Text style={styles.infos}>The {dateHumanizer(comment.created_at, 'date')} by {comment.user}</Text>
                                        <Text style={styles.comment}>{comment.comment}</Text>
                                    </View>
                                )
                            })}
                            <View style={styles.commentMaster}>
                                <TextInput
                                    multiline
                                    style={styles.textarea}
                                    onChangeText={text => this.setState({comment: text})}
                                    placeholder="Add your comment"
                                />
                                <Button
                                    style={styles.button}
                                    type='yellow'
                                    label='Send comment'
                                    autoCorrect={false}
                                    process={() => this.sendComment(mission.id)}
                                />
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>
        )
    }

    render() {

        let missions = this.state.missions;
        if (missions !== null && typeof missions !== 'undefined') {
            if (missions.length > 0) {
                return (
                    <>
                        {this.state.mission &&
                            this.missionModal()
                        }
                        <ScrollView style={styles.view} keyboardShouldPersistTaps='always'>
                            {missions.map((mission, i) =>
                                <View style={styles.master} key={i}>
                                    <Text style={styles.infos}>The {dateHumanizer(mission.created_at, 'date')}</Text>
                                    <View style={styles.container}>
                                        <View style={styles.titleContainer}>
                                            <MissionSvg style={styles.svg} fill={Css().root.yellow}/>
                                            <Text style={styles.title}>{mission.serial}</Text>
                                        </View>
                                        <FolderSvg
                                            fill={Css().root.darkGrey}
                                            onPress={() => this.setState({mission: mission})}
                                        />
                                    </View>
                                </View>
                            )}
                        </ScrollView>
                    </>
                )
            } else {
                return(
                    <View style={styles.view}>
                        <View style={styles.container}>
                            <View style={styles.titleContainer}>
                                <Text style={styles.noData}>No mission available yet.</Text>
                            </View>
                        </View>
                    </View>
                )
            }
        } else {
            return (
                <Loader/>
            )
        }
    }
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        padding: 20
    },
    master: {
      alignItems: 'flex-end',
        marginBottom: 20
    },
    infos: {
        fontFamily: 'Lato-Italic',
        fontSize: 10
    },
    container: {
        width: '100%',
        backgroundColor: Css().root.white,
        borderRadius: 6,
        padding: 10,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: Css().root.thinGrey,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20
    },
    title: {
        fontFamily: 'Lato-Bold',
    },
    svg: {
        marginRight: 10
    },
    noData: {
        fontFamily: 'Lato-Italic',
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
    sections: {
        marginBottom: 20
    },
    notFirstSection: {
        borderStyle: 'solid',
        borderTopWidth: 1,
        borderTopColor: Css().root.thinGrey,
        paddingTop: 10
    },
    sectionTitle: {
        fontFamily: 'Lato-Black',
        fontSize: 16,
        marginBottom: 10
    },
    societyName: {
        fontFamily: 'Lato-Bold',
        fontSize: 15
    },
    societyAddress: {
        fontFamily: 'Lato-Light'
    },
    small: {
        fontFamily: 'Lato-Light',
        fontSize: 12,
        marginBottom: 10,
        marginTop: 5
    },
    imagesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 10
    },
    imageView: {
        backgroundColor: Css().root.white,
        marginTop: 10,
        marginBottom: 10
    },
    images: {
        resizeMode: 'cover',
        width: (screenWidth - 50)/2,
        height: (screenWidth - 50)/2,
        borderRadius: 6,
    },
    icon: {
        paddingRight: 10,
        width: 20,
        height: 20
    },
    sideIconText: {
        fontFamily: 'Lato-Light',
        marginLeft: 5
    },
    docList: {
        marginTop: 10,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 6,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: Css().root.thinGrey
    },
    noDocList: {
        marginTop: 10,
        marginBottom: 10,
        alignItems: 'center',
        flexDirection: 'row',
        fontFamily: 'Lato-Light',
        color: Css().root.red,
        width: '100%',
        textAlign: 'center',
    },
    commentsContainer: {
        marginBottom: 20
    },
    comment: {
        padding: 10,
        borderRadius: 6,
        backgroundColor: '#F9F9F9',
        fontFamily: 'Lato-Light',
        marginBottom: 20,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: Css().root.thinGrey
    },
    textarea: {
        padding: 10,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: Css().root.thinGrey,
        fontFamily: 'Lato-Light',
        borderRadius: 6,
        width: '100%'
    },
    commentMaster: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        marginTop: 20,
        marginBottom: 10
    }
})