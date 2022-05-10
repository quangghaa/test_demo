import { message } from "antd"


export const statusNotification = (status: any) => {
    if (status === true) {
        message.success('This is a success message');
    } else {
        message.error('This is an error message');
    }
}

export default statusNotification;
