export async function requestNotificationPermission() {
    if (!("Notification" in window)) {
        console.log("This browser does not support notifications");
        return false;
    }

    const permission = await Notification.requestPermission();
    return permission === "granted";
}

export async function sendNotification(
    title: string,
    options?: NotificationOptions
) {
    if (!("Notification" in window)) {
        console.log("This browser does not support notifications");
        return;
    }

    if (Notification.permission !== "granted") {
        console.log("Notification permission not granted");
        return;
    }

    const registration = await navigator.serviceWorker.getRegistration();
    if (registration) {
        registration.showNotification(title, options);
        console.log("Notification sent from service worker");
    } else {
        new Notification(title, options);
        console.log("Notification sent from main thread");
    }
}
