import {Platform, Linking, Alert} from 'react-native';
import moment from 'moment';
import StoreDB from '../storage/StoreDB';
import Toast from 'react-native-simple-toast';

let REFERENCE = moment();
let TODAY = REFERENCE.clone().startOf('day');
let YESTERDAY = REFERENCE.clone().subtract(1, 'days').startOf('day');

export function isEmailValid(emailAddress) {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  return reg.test(emailAddress);
}

/*
This function converts date into time. E.g: Hours:Minutes AM/PM format.
 */
export function formatAMPM(date) {
  var hours = date.getHours();

  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}
export function format24(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();
  hours = hours % 24;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = hours + ':' + minutes + ':' + seconds;
  return strTime;
}

/*
This function converts milliseconds into Hours:Minutes format.
 */
export function convertHourMinutes(milliseconds) {
  let minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
  let hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24);
  minutes = minutes < 10 ? '0' + minutes : minutes;
  return hours + ':' + minutes;
}

export function getChatDate(date) {
  let momentDate = moment.utc(date).utcOffset(moment().utcOffset());
  if (isToday(momentDate)) {
    return momentDate.format(' hh:mm A');
  } else if (isYesterday(momentDate)) {
    return 'Yesterday';
  } else {
    return momentDate.format('MMM Do YY[, ]hh:mm A');
  }
}

export function formatDate(date, format = 'MMM Do YY') {
  let momentDate = moment.utc(date);
  // let momentDate = moment.utc(date).utcOffset(moment().utcOffset());
  return momentDate.format(format);
}

export function isToday(momentDate) {
  return momentDate.isSame(TODAY, 'd');
}

export function isYesterday(momentDate) {
  return momentDate.isSame(YESTERDAY, 'd');
}

export function commafy(num) {
  var str = num.toString().split('.');
  if (str[0].length >= 5) {
      str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
  }
  if (str[1] && str[1].length >= 5) {
      str[1] = str[1].replace(/(\d{3})/g, '$1 ');
  }
  return str.join('.');
}

export function callNumber(phone) {
  let phoneNumber = phone;
  if (Platform.OS !== 'android') {
    phoneNumber = `telprompt:${phone}`;
  } else {
    phoneNumber = `tel:${phone}`;
  }
  Linking.canOpenURL(phoneNumber)
    .then((supported) => {
      if (!supported) {
        Alert.alert('Phone number is not available');
      } else {
        return Linking.openURL(phoneNumber);
      }
    })
    .catch((err) => console.log(err));
}

export function isSameDay(currentMessage = {}, diffMessage = {}) {
  const currentCreatedAt = moment(currentMessage.createdAt);
  const diffCreatedAt = moment(diffMessage.createdAt);

  if (!currentCreatedAt.isValid() || !diffCreatedAt.isValid()) {
    return false;
  }

  return currentCreatedAt.isSame(diffCreatedAt, 'day');
}

export function isSameUser(currentMessage = {}, diffMessage = {}) {
  return !!(
    diffMessage.user &&
    currentMessage.user &&
    diffMessage.user._id === currentMessage.user._id
  );
}

export const showErrorPopup = (errorMessage) => {
  let messageText = '';
  if (errorMessage != null && typeof errorMessage === 'object') {
    let allKeys = Object.keys(errorMessage);
    allKeys.forEach((key) => {
      let messageList = errorMessage[key];
      messageList.forEach((message) => {
        messageText += message + '\n';
      });
    });
  } else {
    messageText = errorMessage;
  }
  Alert.alert('', messageText);
};

export const siguOutUser = () => {
  Alert.alert('', 'Are you sure to logout?', [
    {
      text: 'No',
      style: 'cancel',
    },
    {
      text: 'Yes',
      onPress: () => logoutWithAlert(),
    },
  ]);
};

export const calculateAppointmentTimeStatus = (apptFromDate, apptTillDate) => {
  let currentDate = new Date();
  let dateFrom = moment(apptFromDate);
  let dateTill = moment(apptTillDate);
  let appointmentTime = '';
  if (currentDate < dateFrom) {
    let milliseconds = dateFrom - currentDate;
    let minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
    let hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24);
    let days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));
    minutes = minutes < 10 ? '0' + minutes : minutes;
    appointmentTime =
      (days > 0 ? days + ' days ' : '') +
      hours +
      ' hr ' +
      minutes +
      ' mins until appointment';
  } else if (currentDate > dateFrom && currentDate < dateTill) {
    appointmentTime = 'In progress';
  } else if (currentDate > dateTill) {
    appointmentTime = 'Past Appointment';
  }
  return appointmentTime;
};

/*
  This function used to clear user data, when auth_token expired.
*/
export function logoutWithAlert(isShowAlert = false, isSessionExpired = false) {
  StoreDB.logoutUser();
  if (isShowAlert) {
    Alert.alert(
      'Alert!',
      'Your login session has been expired. Please login again.',
    );
  }
  if (isSessionExpired) {
    Toast.show('Login session expired.');
  }
  NavigationService.navigate('Login');
}
