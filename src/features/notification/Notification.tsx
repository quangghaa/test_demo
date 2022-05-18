import { message } from "antd"


export const statusNotification = (status: any, messageNoti: string) => {
    if (status === true) {
        message.success(`${messageNoti}`);
    } else {
        message.error(`${messageNoti}`);
    }
}

export default statusNotification;
