
import { notification } from 'antd';

export const statusNotification = (status: any, messageNoti: string) => {
    if (status === true) {
        notification.success({
            message: "Thành công",
            description: messageNoti,
            placement: 'top'
        });
    } else {
        notification.error({
            message: "Thất bại",
            description: messageNoti,
            placement: 'top'
        });
    }
}

export default statusNotification;
