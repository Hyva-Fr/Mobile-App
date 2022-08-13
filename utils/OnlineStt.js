import NetInfo from "@react-native-community/netinfo";

export default function isOnline(callback) {

    NetInfo.fetch().then( state => {
        return callback(state.isConnected)
    });
}