import {
    store
} from 'react-notifications-component';

export function showNotification(type, message) {
    store.addNotification({
        title: type === "success" ? "Success!" : "Failure!",
        message: String(message),
        type: type,
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated animate__faster", "animate__fadeInDownBig"],
        animationOut: ["animate__animated animate__faster", "animate__fadeOut"],
        dismiss: {
            duration: 4000,
            onScreen: false
        },
    });
};

