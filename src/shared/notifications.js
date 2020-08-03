import * as Permissions from "expo-permissions";
import Constants from "expo-constants";
import { Notifications } from 'expo';
import AsyncStorage from '@react-native-community/async-storage';
export function showNewOrderNotification(order) {
    const { names, products } = order;
    const amount = products.reduce((total, product) => {
        return total + product.quantity * product.product.price
    }, 0)
    const body = `${names} te ha realizado un pedido de ${products.length} productos 
por un total de ${amount} pesos
    `
    Notifications.presentLocalNotificationAsync({
        title: 'Nuevo pedido!',
        body: body,
        data: order,
        android: {
            channelId: 'default',
        },
        ios: {
            sound: true,
            _displayInForeground: true
        }
    });
}
Notifications.addListener((notification) => {
    console.log('Notifications listener -> ', {
        data: {
            id: notification.data.id
        },
        origin: notification.origin
    });
});
export const processOrderNotification = async (order) => {
    const exitsId = (await AsyncStorage.getItem(order.id)) ? true : false;
    if (!exitsId) {
        //TODO validate notification order.createAt with current date no greater than x day
        console.log((new Date() - order.createdAt) / (1000 * 60 * 60 * 60 * 24));
        console.log(order);
        AsyncStorage.setItem(order.id, order.id);
        showNewOrderNotification(order);
    }
}
export async function askPermissions() {
    let hasNotificationPermission = false;
    if (Constants.isDevice) {
        const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
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