import * as Permissions from "expo-permissions";
import Constants from "expo-constants";
import { Notifications } from "expo";
export function showNewOrderNotification(order) {
  const { names, products } = order;
  const amount = products.reduce((total, product) => {
    return total + product.quantity * product.product.price;
  }, 0);
  const body = `${names} te ha realizado un pedido de ${products.length} productos 
por un total de ${amount} pesos
    `;
  Notifications.presentLocalNotificationAsync({
    title: "Nuevo pedido!",
    body: body,
    data: order,
    android: {
      channelId: "default",
    },
    ios: {
      sound: true,
      _displayInForeground: true,
    },
  });
}
export async function askPermissions() {
  let hasNotificationPermission = false;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    console.log("Notification permission: ", finalStatus);
    if (finalStatus !== "granted") {
      alert("Habilita las notificaciones para que recibas nuevos pedidos!");
    }
    hasNotificationPermission = existingStatus === "granted";
  } else {
    alert("Must use physical device for Push Notifications");
  }
  if (Platform.OS === "android") {
    await Notifications.createChannelAndroidAsync("default", {
      name: "default",
      sound: true,
      priority: "max",
      vibrate: [0, 250, 250, 250],
      badge: true,
      _displayInForeground: true,
    });
  }
  return hasNotificationPermission;
}
