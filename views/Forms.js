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
import Lock from "../components/svg/Lock";
import Unlock from "../components/svg/Unlock";
import CloseSvg from "../components/svg/Close";
import FormParser from "../utils/FormParser";
import Button from "../components/ui-kit/Button";
import Signature from "react-native-signature-canvas";
import Check from "../components/svg/Check";
import {Picker} from '@react-native-picker/picker';

const screenWidth = Dimensions.get('window').width

export default class Forms extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            categories: null,
            form: null,
            dropdown: null,
            formName: null,
            online: props.online,
            scrollEnabled: true,
            signature: null,
            signatureError: false,
            signatureValidate: false,
            toValidationForm: null,
            user: null,
            missions: null,
            missionToString: null,
            missionExist: true,
            selectedMissionSerial: null,
            selectedMission: null,
            countError: false,
            validated: false,
            xhrError: false,
            images: {},
            sent: false
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
            XHR('get', '/users/' + json.id, {'email': json.email, 'password': json.password}, (resp) => {
                if (resp.message === 'ok') {
                    this.setState({user: resp})
                }
            }, json.token)
            XHR('get', '/missions', {email: json.email, password: json.password}, (data) => {
                this.setState({missions: data.data})
            }, json.token)
        })
    }

    setForm = (data) => {
        let form = JSON.parse(data.form),
            translate = {
                'footer': form.footer,
                'header': form.header,
                'main': {
                    'format': form.main.format,
                    'content': []
                }
            },
            clone = [],
            contents = form.main.content;
        for (let i = 0; i < contents.length; i++) {
            translate.main.content.push(JSON.parse(contents[i]))
            clone.push(JSON.parse(contents[i]))
        }
        let toValidate = {
            'user_id': this.state.user.id,
            'agency_id': this.state.user.agency.id,
            'form_id': data.id,
            'form': translate.main.content,
            'content': clone
        }
        this.setState({form: translate, formName: data.name, toValidationForm: toValidate})
    }

    controlMission = (serial) => {
        if (serial.trim() !== '') {
            let missions = this.state.missions,
                check = false,
                mission = null;
            for (let i = 0; i < missions.length; i++) {
                if (serial === missions[i].serial) {
                    mission = missions[i]
                    check = true;
                    break;
                }
            }
            this.setState({missionExist: check, selectedMissionSerial: serial, selectedMission: mission})
        } else {
            this.setState({missionExist: true, selectedMissionSerial: serial, selectedMission: null})
        }
    }

    formModal = () => {
        let form = this.state.form
        return(
            <View style={styles.modalContainer}>
                <View style={styles.modal}>
                    {this.state.validated === false &&
                        <CloseSvg
                            style={styles.close}
                            fill={Css().root.yellow}
                            onPress={() => this.setState({
                                form: null,
                                signatureValidate: false,
                                toValidationForm: null,
                                selectedMissionSerial: null
                            })}
                        />
                    }

                    {this.state.validated === true &&
                        <View style={styles.validation}>
                            <Text style={styles.validationText}>Form validated</Text>
                        </View>
                    }
                    {this.state.xhrError === true &&
                        <View style={styles.validation}>
                            <Text style={styles.xhrError}>Something went wrong. Please try again.</Text>
                        </View>
                    }
                    <View style={styles.modalTitleContainer}>
                        <Pen style={styles.svg} fill={Css().root.yellow}/>
                        <Text style={styles.title}>{this.state.formName}</Text>
                        {(this.state.scrollEnabled === false)
                            ? <Unlock
                                style={styles.lock}
                                fill={Css().root.yellow}
                                onPress={() => this.setState({scrollEnabled: true})}
                            />
                            : <Lock
                                style={styles.lock}
                                fill={Css().root.yellow}
                                onPress={() => this.setState({scrollEnabled: false})}
                            />
                        }
                    </View>
                    <ScrollView
                        style={styles.modalScroll}
                        keyboardShouldPersistTaps='always'
                        keyboardDismissMode="on-drag"
                        contentContainerStyle={{alignItems: 'center'}}
                        scrollEnabled={this.state.scrollEnabled}
                    >
                        <View style={styles.common}>
                            {this.state.missionExist === false &&
                                <Text style={styles.signatureError}>This mission does not exist.</Text>
                            }
                            <Text style={styles.label}>
                                Search by serial or select a mission in list
                                <Text style={styles.required}> *</Text>
                            </Text>
                            <View>
                                <TextInput
                                    style={styles.input}
                                    defaultValue={this.state.selectedMissionSerial}
                                    placeholder='Mission serial'
                                    onChangeText={text => this.controlMission(text)}
                                    autoCorrect={false}
                                />
                                <Picker
                                    style={styles.picker}
                                    themeVariant='dark'
                                    selectedValue={(this.state.selectedMissionSerial === null) ? 'none' : this.state.selectedMissionSerial}
                                    itemStyle={styles.pickerItem}
                                    onValueChange={(serial) => {
                                        this.controlMission(serial)
                                    }}>
                                        <Picker.Item enabled={false} label="Select a mission" value="none" />
                                    {this.state.missions.map((mission, i) => {
                                        return(
                                            <Picker.Item key={i} label={mission.serial} value={mission.serial} />
                                        )
                                    })}
                                </Picker>
                            </View>
                        </View>
                        {form.main.content.map((row, i) => {
                            return(
                                <FormParser key={i} data={row} index={i} listen={this.rowListener}/>
                            )
                        })}
                        {this.state.signatureError === true &&
                            <Text style={styles.signatureError}>You must save your signature before validate the form.</Text>
                        }
                        <Text style={styles.label}>
                            Signature
                            <Text style={styles.required}> *</Text>
                        </Text>
                        <View style={{height: 350, width: '100%'}}>
                            {this.state.signatureValidate === true &&
                                <Check style={styles.check} fill={Css().root.green}/>
                            }
                            <Signature
                                onOK={(img) => this.setState({signature: img, signatureError: false, signatureValidate: true})}
                                onBegin={() => this.setState({scrollEnabled: false})}
                                onEnd={() => this.setState({scrollEnabled: true})}
                                onClear={() => this.setState({signature: null, signatureError: false, signatureValidate: false})}
                                onEmpty={() => this.setState({signature: null, signatureError: false, signatureValidate: false})}
                                descriptionText=""
                                clearText="Clear"
                                confirmText="Save"
                                imageType="image/png"
                                webStyle={style}
                            />
                        </View>
                        {this.state.countError === true &&
                            <Text style={styles.signatureError}>You must fill all required fields.</Text>
                        }
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

    rowListener = (data, i, type) => {
        let form = this.state.form,
            toValidate = this.state.toValidationForm,
            images = this.state.images
        if (form !== null) {
            if (type === 'file') {
                let imgs = images
                imgs['block' + i] = data
                this.setState({images: imgs})
            }
            toValidate.content[i].response = data
            this.setState({'toValidationForm': toValidate})
        }
    }

    validateForm = () => {
        let form = this.state.form,
            signature = this.state.signature,
            toValidate = this.state.toValidationForm
        if (form !== null) {
            if (this.state.selectedMission !== null) {
                if (signature !== null) {
                    this.setState({signatureError: false, missionExist: true})
                    form.signature = signature
                    let countChecker = this.counter(form.main.content, 'form')
                    let countValidate = this.counter(toValidate.content, 'validate')
                    if (countValidate < countChecker) {
                        this.setState({countError: true})
                    } else {
                        this.setState({countError: false})
                        toValidate['mission_id'] = this.state.selectedMission.id
                        toValidate['mission'] = this.state.selectedMission
                        let toXHR = {
                            'agency_id': toValidate.agency_id,
                            'user_id': toValidate.user_id,
                            'form_id': toValidate.form_id,
                            'form': JSON.stringify(toValidate.form),
                            'mission_id': toValidate.mission_id,
                            'mission': JSON.stringify(toValidate.mission),
                            'content': JSON.stringify(toValidate.content),
                            'images': JSON.stringify(this.state.images)
                        }
                        getData('init', (json) => {
                            XHR('post', '/validates', toXHR, (resp) => {
                                if (resp.message && resp.message === 'ok') {
                                    this.restore()
                                } else {
                                    setTimeout(() => {
                                        this.setState({xhrError: true})
                                    }, 7000)
                                    setTimeout(() => {
                                        this.setState({xhrError: false})
                                    }, 10000)
                                }
                            }, json.token, this.state.images)
                        })
                    }
                } else {
                    this.setState({signatureError: true})
                }
            } else {
                this.setState({missionExist: false})
            }
        }
    }

    restore = () => {
        this.setState({xhrError: false, validated: true})
        setTimeout(() => {
            this.setState({
                form: null,
                formName: null,
                signature: null,
                signatureError: false,
                signatureValidate: false,
                toValidationForm: null,
                missionToString: null,
                missionExist: true,
                selectedMissionSerial: null,
                selectedMission: null,
                countError: false,
                validated: false,
                xhrError: false,
                sent: false
            })
        }, 3000)
    }

    counter = (objects, mode) => {
        let cnt = 0

        if (mode === 'form') {
            for (let i = 0; i < objects.length; i++) {
                let object = objects[i],
                    excepts = ['options', 'start', 'end', 'images', 'comments']
                if (object.data && !excepts.includes(object.data)) {
                    cnt++
                }
            }
        } else {
            for (let i = 0; i < objects.length; i++) {
                let object = objects[i],
                    excepts = ['options', 'start', 'end', 'images', 'comments']
                if (object.response && object.data && !excepts.includes(object.data)) {
                    cnt++
                }
            }
        }
        return cnt
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
                                                                        onPress={() => this.setForm(form)}
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

const style = `.m-signature-pad--footer
    .button {
        background-color: ${Css().root.lightGrey};
        color: ${Css().root.yellow};
        font-family: 'Lato-Bold';
        font-size: 16;
        width: 49.5%;
        letter-spacing: 0.5px;
        font-weight: bold;
        border-radius: 4px;
        margin: 0;
        transition: all linear 0.08s
    }
    .button:active {
        background-color: ${Css().root.yellow};
        color: ${Css().root.lightGrey};
    }
    .m-signature-pad--footer {
        display: flex;
        padding: 0;
        justify-content: space-between;
    }`;

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
    common: {
        width: '100%',
        marginBottom: 10
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
        zIndex: 4,
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
    },
    label: {
        fontFamily: 'Lato-Bold',
        fontSize: 14,
        color: Css().root.lightGrey,
        marginBottom: 5,
        width: '100%'
    },
    signatureError: {
        color: Css().root.white,
        fontFamily: 'Lato-Light',
        marginTop: 10,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: Css().root.red,
        borderRadius: 6,
        textAlign: 'center',
        marginBottom: 10
    },
    check: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 2
    },
    input: {
        width: '100%',
        fontFamily: 'Lato-Light',
        padding: 10,
        borderRadius: 6,
        borderStyle: 'solid',
        borderColor: Css().root.thinGrey,
        borderWidth: 1
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
    lock: {
        marginLeft: 10
    },
    validation: {
        position: 'absolute',
        zIndex: 3,
        backgroundColor: Css().root.white,
        justifyContent: 'center',
        alignItems: 'center',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        borderRadius: 6,
    },
    validationText: {
        padding: 10,
        backgroundColor: Css().root.green,
        color: Css().root.white,
        fontFamily: 'Lato-Bold',
        borderRadius: 6
    },
    required: {
        color: Css().root.red,
        fontFamily: 'Lato-Light',
        fontSize: 16
    },
    xhrError: {
        padding: 10,
        backgroundColor: Css().root.red,
        color: Css().root.white,
        fontFamily: 'Lato-Bold',
        borderRadius: 6
    }
})