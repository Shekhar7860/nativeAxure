import AsyncStorage from '@react-native-community/async-storage';

const IS_APP_INTRO = 'IS_APP_INTRO';
const EMAIL = 'EMAIL';
const PASSWORD = 'PASSWORD';
const USER_DATA = 'USER_DATA';
const NURSE_APPOINTMENT_DATA = 'NURSE_APPOINTMENT_DATA';
const CHANNELLIST_DATA = 'CHANNELLIST_DATA';
const StoreDB = {
  appIntroStatus(status = undefined) {
    if (status) {
      return AsyncStorage.setItem(IS_APP_INTRO, JSON.stringify(status));
    }
    return AsyncStorage.getItem(IS_APP_INTRO);
  },

  logoutUser() {
    this.loggedInUserData(undefined, true);
  },

  userEmail(email = undefined) {
    if (email) {
      return AsyncStorage.setItem(EMAIL, email);
    }
    return AsyncStorage.getItem(EMAIL);
  },

  userPassword(password = undefined) {
    if (password) {
      return AsyncStorage.setItem(PASSWORD, password);
    }
    return AsyncStorage.getItem(PASSWORD);
  },

  async loggedInUserData(userData = undefined, isClear = false) {
    if (userData) {
      return AsyncStorage.setItem(USER_DATA, JSON.stringify(userData));
    }
    if (isClear) {
      return AsyncStorage.removeItem(USER_DATA);
    }
    let savedData = await AsyncStorage.getItem(USER_DATA);
    return savedData ? JSON.parse(savedData) : {};
  },

  async ChannelList(ChannelList = undefined, isClear = false) {
    console.log('savedData.ChannelList************', ChannelList);
    if (ChannelList) {
      return AsyncStorage.setItem(
        CHANNELLIST_DATA,
        JSON.stringify(ChannelList),
      );
    }
    let savedData = await AsyncStorage.getItem(CHANNELLIST_DATA);
    return savedData ? JSON.parse(savedData) : {};
  },

  async nurseAppointmentData(
    nurseAppointmentData = undefined,
    isClear = false,
  ) {
    if (nurseAppointmentData) {
      return AsyncStorage.setItem(
        NURSE_APPOINTMENT_DATA,
        JSON.stringify(nurseAppointmentData),
      );
    }
    let savedData = await AsyncStorage.getItem(NURSE_APPOINTMENT_DATA);
    return savedData ? JSON.parse(savedData) : {};
  },
};
export default StoreDB;
