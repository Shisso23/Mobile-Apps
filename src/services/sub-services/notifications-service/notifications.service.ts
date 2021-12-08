import _ from 'lodash';

import notificationsUrls from './notifications.urls';
import authNetworkService from '../auth-network-service/auth-network.service';
import flashService from '../flash-service/flash.service';
import { constructNotificationsModels } from '../../../models/app/notifications/notifications.model';
import { mockApi } from '../../../helpers/mock-api/mock-api';

const getNotifications = async () => {
  const url = notificationsUrls.getNotifications();
  return mockApi
    .get(url)
    .then((apiResponse) => {
      return constructNotificationsModels(_.get(apiResponse, 'data.data', []));
    })
    .catch((error) => {
      flashService.error(_.get(error, 'message', 'Error fetching notifications!'));
    });
};

const makeAsRead = async (notificationId: string) => {
  const url = notificationsUrls.markAsRead(notificationId);
  return authNetworkService
    .post(url)
    .then((apiResponse) => {
      return apiResponse;
    })
    .catch((error) => {
      flashService.error(_.get(error, 'message', 'Error reading notification!'));
    });
};

export default {
  getNotifications,
  makeAsRead,
};
