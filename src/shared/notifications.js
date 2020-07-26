import * as Permissions from "expo-permissions";
import Constants from "expo-constants";
import {Notifications} from 'expo';

export async function askPermissions() {
    let hasNotificationPermission = false;
    if (Constants.isDevice) {
        const {status: existingStatus} = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }
        console.log('Notification permission: ', finalStatus);
        if (finalStatus !== 'granted') {
            alert('Habilita las notificaciones para que recibas nuevos pedidos!');
        }
        hasNotificationPermission = existingStatus === 'granted';
    } else {
        alert('Must use physical device for Push Notifications');
    }
    if (Platform.OS === 'android') {
        await Notifications.createChannelAndroidAsync('default', {
            name: 'default',
            sound: true,
            priority: 'max',
            vibrate: [0, 250, 250, 250],
            badge: true,
            _displayInForeground: true
        });
    }
    return hasNotificationPermission;
}