import React, {useState, PureComponent} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
  Linking
} from 'react-native';
import commonStyles from '../commonStyles/commonStyles';
import BoldText from '../components/ClickableText';
import {
  APP_MAIN_COLOR,
  WHITE,
  APP_MAIN_COLOR_DISABLE,
} from '../constants/colors';
import {PROFILE_PIC} from '../constants/Images';
import {showErrorPopup} from '../util/utils';
import Toast from 'react-native-simple-toast';
import OverlaySpinner from '../components/OverlaySpinner';
import {useIsDrawerOpen} from '@react-navigation/drawer';
import Clients from './client/Clients';
import StoreDB from '../storage/StoreDB';
import {connect} from 'react-redux';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import ImagePicker from 'react-native-image-picker';
import {updateProfilePic} from '../redux/reducers/session';
import {DEFAULT_IMG_URL} from '../constants/const';

const ITEMS = [
  {name: 'Profile'},
  {name: 'Clients'},
  {name: 'Quotes'},
  {name: 'Orders'},
  {name: 'Products'},
  {name: 'Support Requests'},
  {name: 'Upload Orders'},
  {name: 'Users'},
  {name: 'Reports'},
  {name: 'Resource Hub'},
  {name: 'Logout'},
];

logOut = (props) => {
  StoreDB.logoutUser();
  props.navigation.reset({
    routes: [{name: 'Login'}],
  });
  props.navigation.navigate('Login');
};

openScreen = (screenName, props) => {
  if (
    screenName == 'Clients' ||
    screenName == 'Quotes' ||
    screenName == 'Users' ||
    screenName == 'Orders' ||
    screenName == 'Products'
  ) {
    props.navigation.navigate(screenName);
  }
  else if(screenName == "Resource Hub"){
    Linking.openURL('https://resourcehub.mphgroup.uk')
  }
  else if(screenName == "Upload Orders"){
    props.navigation.navigate('UploadOrders');
  } else if (screenName == 'Logout') {
    Alert.alert('', 'Are you sure to logout?', [
      {
        text: 'No',
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => logOut(props),
      },
    ]);
  }
};

openImagePicker = (setProfilePic, props) => {
  const {online} = props;

  if (online) {
    const options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      //console.group('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};
        setProfilePic(response.uri);

        let image = {uri: response.uri, name: 'image.jpg', type: 'image/jpeg'};
        profilePicApi(image, props);
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
      }
    });
  } else {
    Alert.alert('', 'No Internet Connection');
  }
};

getRowItem = (item, index, props) => {
  return (
    <TouchableOpacity
      style={styles.rowItem}
      onPress={() => openScreen(item.name, props)}>
      <Text style={styles.itemText}>{item.name}</Text>
    </TouchableOpacity>
  );
};
const Sidebar = (props) => {
  const [SHOW_LOADING, SET_LOADING] = useState(false);
  profilePicApi = (image, props) => {
    SET_LOADING(true);
    props
      .updateProfilePic(image)
      .then((response) => {
        console.log('insideApi', response);
        if (response.code === 200) {
          SET_LOADING(false);
          Toast.show('Profile Pic Updated Successfully');
        }
      })
      .catch((error) => {
        SET_LOADING(false);
        if (error.code === 'unauthorized') {
          showErrorPopup(
            "Couldn't validate those credentials.\nPlease try again",
          );
        } else {
          // showErrorPopup(
          //   'There was an unexpected error.\nPlease wait a few minutes and try again.',
          // );
        }
      });
  };
  console.log('mypoo', props.userInfo);
  const {userInfo} = props;
  const isDrawerOpen = useIsDrawerOpen();
  const [USER_PROFILE_PIC, setProfilePic] = useState(userInfo.profile_pic);
  return (
    <SafeAreaView style={commonStyles.ketboardAvoidingContainer}>
      <View style={styles.menuMargin}>
        <View style={styles.imageTextRow}>
          <View style={styles.columnStyle}>
            <Text style={styles.boldText}>{userInfo.name}</Text>
            <Text style={styles.partnerText}>Partner</Text>
          </View>
          <View style={{width: '0%'}} />
          {/* showing profile only when drawe is open*/}
          {isDrawerOpen ? (
            <TouchableOpacity
              onPress={() => openImagePicker(setProfilePic, props)}>
              {USER_PROFILE_PIC ? (
                <Image
                  source={{uri: USER_PROFILE_PIC}}
                  style={styles.profilePic}
                />
              ) : (
                <Image source={PROFILE_PIC} style={styles.profilePic} />
              )}
            </TouchableOpacity>
          ) : null}
        </View>
        <FlatList
          style={styles.patientFlatList}
          showsVerticalScrollIndicator={false}
          data={ITEMS}
          keyExtractor={(item, index) => '' + index}
          renderItem={({item, index}) => getRowItem(item, index, props)}
        />
      </View>
      <OverlaySpinner
        cancelable
        visible={SHOW_LOADING}
        color={WHITE}
        textContent="Please wait..."
        textStyle={{color: WHITE}}
      />
    </SafeAreaView>
  );
};

const styles = ScaledSheet.create({
  imageTextRow: {
    flexDirection: 'row',
    marginHorizontal: moderateScale(20),
  },
  boldText: {
    color: WHITE,
    fontWeight: 'bold',
    fontSize: moderateScale(20),
  },
  partnerText: {
    color: WHITE,
    fontWeight: 'normal',
    fontSize: moderateScale(15),
    marginTop: moderateScale(5),
  },
  signInText: {
    marginTop: moderateScale(10),
    textAlign: 'center',
    fontSize: moderateScale(18),
    fontWeight: 'normal',
  },
  menuMargin: {
    marginTop: moderateScale(50),
  },
  rowItem: {
    marginHorizontal: moderateScale(20),
    marginBottom: moderateScale(15),
  },
  itemText: {
    color: WHITE,
    fontSize: moderateScale(15),
  },
  patientFlatList: {
    marginTop: moderateScale(10),
  },
  columnStyle: {
    flexDirection: 'column',
    width: '70%',
  },
  profilePic: {
    width: moderateScale(80),
    height: moderateScale(80),
    borderRadius: moderateScale(40),
  },
});

const mapDispatchToProps = {
  updateProfilePic,
};

const mapStateToProps = (state) => ({
  online: state.netInfo.online,
  userInfo: state.session.userInfo,
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
