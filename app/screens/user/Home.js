import React, {PureComponent} from 'react';
import Header from '../../components/Header';
import TouchableImage from '../../components/TouchableImage';
import commonStyles from '../../commonStyles/commonStyles';
import {
  SEARCH,
  SLIDE_1,
  SLIDE_2,
  SLIDE_3,
  SLIDE_4,
  SLIDE_5,
  SLIDE_6,
} from '../../constants/Images';
import {
  View,
  Text,
  Button,
  SafeAreaView,
  FlatList,
  BackHandler,
  Linking,
  Alert
} from 'react-native';
import BaseScreen from '../../components/BaseScreen';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import {StackActions} from '@react-navigation/native';
import {getClientsList} from '../../redux/reducers/clients';
import {getProductsList} from '../../redux/reducers/products';
import {connect} from 'react-redux';
import OverlaySpinner from '../../components/OverlaySpinner';
import {isEmailValid, showErrorPopup} from '../../util/utils';
import {WHITE} from '../../constants/colors';
class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      imagesList: [
        {image: SLIDE_1},
        {image: SLIDE_2},
        {image: SLIDE_3},
        {image: SLIDE_4},
        {image: SLIDE_5},
        {image: SLIDE_6},
      ],
      showLoading : false
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentDidMount() {
    this.init();
    this._sub = this.props.navigation.addListener('didFocus', () => {
      this.init();
    });
  }

  init = () => {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
    const {online} = this.props;

    if (online) {
      this.setState({showLoading : true})
      this.props
        .getClientsList()
        .then((response) => {
          console.group('response', response);
          if (response.code === 200) {
            this.setState({showLoading : false})
          }

        })
        .catch((error) => {
          this.setState({showLoading: false});
          if (error.code === 'unauthorized') {
            showErrorPopup(
              "Couldn't validate those credentials.\nPlease try again",
            );
          } else {
          }
        });
        this.props
          .getProductsList()
          .then((response) => {
            console.group('response', response);
            this.setState({showLoading: false});
            if (response.code === 200) {
              this.setState({items: response.data.items});
            }
          })
          .catch((error) => {
            this.setState({showLoading: false});
            if (error.code === 'unauthorized') {
              showErrorPopup(
                "Couldn't validate those credentials.\nPlease try again",
              );
            } else {
              showErrorPopup(
                'There was an unexpected error.\nPlease wait a few minutes and try again.',
              );
            }
          });
    } else {
      Alert.alert('', 'No Internet Connection');
    }
  };

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  handleBackButtonClick() {}

  openScreen = (index) => {
    switch (index) {
      case 0:
        this.props.navigation.navigate('Quotes');
        break;
      case 1:
       this.props.navigation.navigate('Orders');
      break;
      case 2:
        this.props.navigation.navigate('Users');
        break;
      case 5:
        Linking.openURL('https://resourcehub.mphgroup.uk');
        break;
      default:
      // code block
    }
  };

  getImageItem = (item, index) => {
    return (
      <View style={styles.rowItem}>
        <TouchableImage
          image={item.image}
          imageStyle={styles.image}
          onPress={() => this.openScreen(index)}
        />
      </View>
    );
  };

  render() {
    const {imagesList, showLoading} = this.state;
    return (
      <SafeAreaView style={commonStyles.ketboardAvoidingContainer}>
        <Header
          navigation={this.props.navigation}
          title="MPH GROUP"
          rightImage={SEARCH}
        />
        {/* horizontal list */}
        <FlatList
          style={styles.patientFlatList}
          horizontal={true}
          data={imagesList}
          extraData={this.state}
          keyExtractor={(item, index) => '' + index}
          renderItem={({item, index}) => this.getImageItem(item, index)}
        />
        <OverlaySpinner
          cancelable
          visible={showLoading}
          color={WHITE}
          textContent="Please wait..."
          textStyle={{color: WHITE}}
        />
      </SafeAreaView>
    );
  }
}

const styles = ScaledSheet.create({
  patientFlatList: {
    marginTop: moderateScale(10),
  },
  rowItem: {
    marginRight: moderateScale(-20),
  },
  image: {
    height: moderateScale(500),
    width: moderateScale(310),
  },
});


const mapStateToProps = (state) => ({
  online: state.netInfo.online,
});

const mapDispatchToProps = {
  getClientsList,
  getProductsList
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
