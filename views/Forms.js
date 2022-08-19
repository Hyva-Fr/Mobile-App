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
            mission: null,
            missionToString: null,
            missionExist: true,
            selectedMissionSerial: null,
            selectedMission: null
        }
    }

    componentDidMount() {
        this.state.online()
        getData('init', (json) => {
            console.log(json)
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
            contents = form.main.content,
            toValidate = {
                'user_id': this.state.user.id,
                'agency_id': this.state.user.agency.id,
                'form_id': data.id,
                'form': data.form
            }
        for (let i = 0; i < contents.length; i++) {
            translate.main.content.push(JSON.parse(contents[i]))
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
                    <CloseSvg
                        style={styles.close}
                        fill={Css().root.yellow}
                        onPress={() => this.setState({form: null, signatureValidate: false, toValidationForm: null, selectedMissionSerial: null})}
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
                        scrollEnabled={this.state.scrollEnabled}
                    >
                        <View style={styles.common}>
                            {this.state.missionExist === false &&
                                <Text style={styles.signatureError}>This mission does not exist.</Text>
                            }
                            <Text style={styles.label}>Search by serial or select a mission in list</Text>
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
                                    onValueChange={(serial) =>
                                        this.setState({selectedMissionSerial: serial, missionExist: true})
                                    }>
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
                        <Text style={styles.label}>Signature</Text>
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
        let form = this.state.form,
            signature = this.state.signature,
            toValidate = this.state.toValidationForm
        if (form !== null) {
            if (this.state.mission !== null) {
                if (signature !== null) {
                    this.setState({signatureError: false, missionExist: false})
                    form.signature = signature
                    console.log(form)
                } else {
                    this.setState({signatureError: true})
                }
            } else {
                this.setState({missionExist: true})
            }
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
                                                            console.log(form)
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
      letter-spacing: 0.5px;
      font-weight: bold;
      border-radius: 500px
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
    }
})