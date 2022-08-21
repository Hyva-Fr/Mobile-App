import * as Device from 'expo-device';

export default function XHR(method, uri, data, callback, token = null, files = null) {

    data['device_name'] = JSON.stringify({'os': Device.osName, 'version': Device.osVersion, 'name': Device.deviceName});
    let xhr = new XMLHttpRequest(),
        url = 'https://api-hyva.eint-sandbox.fr/api' + uri

    xhr.open(method.toUpperCase(), url, true);
    xhr.onreadystatechange = () => {

        if (isJson(xhr.response)) {
            callback(JSON.parse(xhr.response))
        } else {
            callback(xhr.response)
        }

    }

    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
    if (token) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + token)
    }

    if (files !== null) {

        xhr.setRequestHeader("Content-Type", "multipart/form-data")
        const form = new FormData();

        for (const dataKey in data) {
            form.append(dataKey, data[dataKey])
        }

        for (const key in files) {
            let block = files[key]
            for (let i = 0; i < block.length; i++) {
                let file = block[i]
                let split = file.split('.'),
                    ext = split[split.length-1],
                    split2 = file.split('/'),
                    name = split2[split2.length-1],
                    value = {
                        uri: file,
                        type: `image/${ext}`,
                        name: name
                    }
                form.append('files[]', value);
            }
        }

        xhr.send(form);

    } else {
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
        const params = serialise(data)
        xhr.send(params);
    }
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