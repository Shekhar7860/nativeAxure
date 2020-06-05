import SendBird from 'sendbird';
import {application_id} from './SendBirdActions';

class SendBirdClient {
  constructor() {
    this.client = new SendBird({
      appId: application_id,
      guest_id: 'demo',
      user_name: 'demo',
      image_url: '',
      access_token: '',
    });
    // this.connectToServer();
  }

  connectToServer = () => {
    //get user id here from reducers
    this.client.connect('USER_ID', function(user, error) {});
  };

  userMessage = () => {
    this.client.UserMessage();
  };

  getUsers = () => {
    return this.client.User.buildFromSerializedData({});
  };
  getUnreadCount = () => {
    return this.client.getUnreadItemCount();
  };
}
var SB = new SendBirdClient();
export default SB;
