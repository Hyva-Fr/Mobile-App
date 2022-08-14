import * as Device from 'expo-device';

export default function XHR(method, uri, data, callback, token = null) {

    data['device_name'] = JSON.stringify({'os': Device.osName, 'version': Device.osVersion, 'name': Device.deviceName});
    let xhr = new XMLHttpRequest(),
        url = 'https://api-hyva.eint-sandbox.fr/api' + uri,
        params = serialise(data);

    xhr.open(method.toUpperCase(), url, true);
    xhr.onreadystatechange = () => {

        if (isJson(xhr.response)) {
            callback(JSON.parse(xhr.response))
        } else {
            callback(xhr.response)
        }

    }

    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    if (token) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + token)
    }
    xhr.send(params);

}

function serialise(obj) {
    let serialised = '';
    Object.keys(obj).forEach(function(key) {
        serialised += encodeURIComponent(key).replace(/%20/g, '+') + '=' + encodeURIComponent(obj[key]).replace(/%20/g, '+') + '&';
    });
    return serialised.slice(0, -1);
}

function isJson(str) {

    try {

        let json = JSON.parse(str)
        return true

    } catch (e) {

        return false
    }
}