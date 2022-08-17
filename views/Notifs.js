import * as Notifications from 'expo-notifications';

export function notifs(missions, notifsSettings) {

    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowAlert: (notifsSettings) ? notifsSettings.alert : true,
            shouldPlaySound: (notifsSettings) ? notifsSettings.sound : true,
            shouldSetBadge: (notifsSettings) ? notifsSettings.badge : true,
        }),
    });

    let title = (missions.length > 1) ? 'New missions available.' : 'New mission available';

    Notifications.scheduleNotificationAsync({
        content: {
            title: title + " 📬",
            body: null,
            data: {data: missions},
        },
        trigger: {seconds: 2},
    }).then(r => {
        /*console.log(r)*/
    });
}