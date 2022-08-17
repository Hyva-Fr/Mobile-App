import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key, value, callback = null) => {
    try {
        if (typeof value === 'object') {
            value = JSON.stringify(value)
        }
        await AsyncStorage.setItem(key, value)
        if (callback) {
            let resp = (isJson(value)) ? JSON.parse(value) : value;
            callback(resp)
        }
    } catch (e) {
        console.log(e)
    }
}

export const getData = async (key, callback = null) => {
    try {
        const value = await AsyncStorage.getItem(key)
        if(value !== null) {
            if (callback) {
                let resp = (isJson(value)) ? JSON.parse(value) : value;
                callback(resp)
            }
        } else {
            if (callback) {
                callback(value)
            }
        }
    } catch(e) {
        console.log(e)
    }
}

export const removeData = async (key, callback = null) => {
    try {
        await AsyncStorage.removeItem(key)
        if (callback) {
            callback()
        }
    } catch(e) {
        console.log(e)
    }
}

function isJson(str) {

    try {

        let json = JSON.parse(str)
        return true

    } catch (e) {

        return false
    }
}