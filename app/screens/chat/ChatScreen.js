import React, {PureComponent} from 'react';
import Header from '../../components/Header';
import commonStyles from '../../commonStyles/commonStyles';
import {
  APP_LIGHT_BLUE_COLOR,
  SEMI_TRANSPARENT,
  WHITE,
  DARK_BLUE,
  NOTIFICATION_COUNT_BG_COLOR,
  APP_MAIN_GREEN,
  APP_MAIN_BLUE,
  APP_MAIN_COLOR,
  BLACK,
} from '../../constants/colors';
import {FRESH_CHAT_APP_ID, FRESH_CHAT_ID_APP_KEY} from '../../constants/config';
import {USER, BACK, TASK} from '../../constants/Images';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
// import {GiftedChat} from 'react-native-gifted-chat';
// import {
//   Freshchat,
//   FreshchatConfig,
//   FreshchatMessage,
//   FreshchatUser,
// } from 'react-native-freshchat-sdk';

import {
  View,
  Text,
  Button,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
const arrDataDesignation = ['Pending', 'Accepted', 'Rejected'];

export default class ChatScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      items: [1, 2, 3, 4],
      isRememberMe: false,
      messages: [],
    };
    this.onSend = this.onSend.bind(this);
  }
  componentDidMount = () => {
    // var freshchatConfig = new FreshchatConfig(
    //   FRESH_CHAT_APP_ID,
    //   FRESH_CHAT_ID_APP_KEY,
    // );
    // freshchatConfig.teamMemberInfoVisible = true;
    // freshchatConfig.cameraCaptureEnabled = true;
    // freshchatConfig.gallerySelectionEnabled = true;
    // freshchatConfig.responseExpectationEnabled = true;
    // Freshchat.init(freshchatConfig);
    // var freshchatUser = new FreshchatUser();
    // freshchatUser.firstName = 'John';
    // freshchatUser.lastName = 'Doe';
    // freshchatUser.email = 'johndoe@dead.man';
    // freshchatUser.phoneCountryCode = '+91';
    // freshchatUser.phone = '1234234123';
    // Freshchat.setUser(freshchatUser, (error) => {
    //   console.log(freshchatUser, error);
    // });
    // Freshchat.showConversations();
    //this.props.navigation.navigate('Cart')
  };
  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://facebook.github.io/react/img/logo_og.png',
          },
        },
      ],
    });
  }
  onSend(messages = []) {
    // var freshchatMessage = new FreshchatMessage();
    // freshchatMessage.tag = 'premium';
    // freshchatMessage.message = 'text message';
    // Freshchat.sendMessage(freshchatMessage);
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages),
      };
    });
  }

  render() {
    const {items, isRememberMe} = this.state;

    return (
      <SafeAreaView style={commonStyles.ketboardAvoidingContainer}>
        <Header
          navigation={this.props.navigation}
          rightImage={USER}
          title="Janet Fowler"
          leftImage={BACK}
        />
        <GiftedChat
          messages={this.state.messages}
          onSend={this.onSend}
          user={{
            _id: 1,
          }}
        />
      </SafeAreaView>
    );
  }
}

const styles = ScaledSheet.create({
  subHeader: {
    color: NOTIFICATION_COUNT_BG_COLOR,
  },
  bottomQuotesRow: {
    borderTopWidth: 1,
    borderColor: '#e6e6e6',
    flexDirection: 'row',
    marginHorizontal: moderateScale(10),
    alignItems: 'center',
    justifyContent: 'center',
    height: moderateScale(40),
  },

  dotBlue: {
    marginTop: moderateScale(5),
    height: moderateScale(12),
    width: moderateScale(12),
    borderRadius: moderateScale(6),
    backgroundColor: APP_MAIN_BLUE,
  },
  inputBoxStyle2: {
    marginTop: moderateScale(10),
    height: moderateScale(100),
    borderRadius: 0,
    borderWidth: 1,
    borderBottomWidth: 1,
    borderColor: DARK_BLUE,
  },

  rowContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: moderateScale(20),
    marginHorizontal: moderateScale(20),
  },
  quotesRow: {
    flexDirection: 'row',
    width: '100%',
    marginHorizontal: moderateScale(10),
    marginTop: moderateScale(10),
  },
  button: {
    backgroundColor: DARK_BLUE,
    width: moderateScale(90),
    height: moderateScale(25),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: DARK_BLUE,
    borderRadius: moderateScale(15),
  },
  labelText: {
    fontSize: moderateScale(10),
    margin: moderateScale(20),
  },
  amountText: {
    fontSize: moderateScale(10),
  },
  amountTextLast: {
    fontSize: moderateScale(12),
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: moderateScale(7),
  },
  content: {
    marginTop: moderateScale(20),
  },
  inputBoxStyle: {
    marginTop: moderateScale(-20),
    height: moderateScale(30),
  },
  input: {
    fontWeight: 'normal',
    fontSize: moderateScale(10),
  },
});
