import React, {Component} from 'react';
import Header from '../../components/Header';
import commonStyles from '../../commonStyles/commonStyles';
import {
  APP_LIGHT_BLUE_COLOR,
  DARK_GRAY,
  ORANGE_COLOR,
  LIGHTEST_GRAY,
  FOREST_COLOR,
  SEMI_TRANSPARENT,
  WHITE,
  DARK_BLUE,
  LINE_COLOR,
  NOTIFICATION_COUNT_BG_COLOR,
  APP_MAIN_GREEN,
  APP_MAIN_BLUE,
  APP_MAIN_COLOR,
} from '../../constants/colors';
import {USER, USER_PHONE, MAIL, PHONE} from '../../constants/Images';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import AddNewButtonGroup from '../../components/AddNewButtonGroup';
import ContainerSearch from '../../components/ContainerSearch';
import CardWithIcon from '../../components/CardWithIcon';
import HR from '../../components/HR';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  View,
  Text,
  Button,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';

export default class Requests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [1, 2],
    };
  }
  componentDidMount = () => {
    //this.props.navigation.navigate('Cart')
  };

  addQuote = () => {
    this.props.navigation.navigate('AddQuote');
  };

  openQuote = () => {
    this.props.navigation.navigate('Quote');
  };

  listItem = (item, index) => {
    return (
      <TouchableOpacity style={styles.rowItem}>
        <View style={styles.card}>
          {index === 0 ? (
            <View style={styles.newTextBackground}>
              <Text style={styles.textColor}>New</Text>
            </View>
          ) : null}
          <View
            style={index === 0 ? styles.cardRow : styles.cardRowWithoutButton}>
            <View style={styles.roundBackground} />
            <View style={{width: '5%'}} />
            <View style={{width: '10%'}}>
              <Image
                source={PHONE}
                style={{...commonStyles.smallIcon, marginTop: moderateScale(5)}}
              />
            </View>
            <View style={{width: '40%'}}>
              <Text style={styles.labelText}>James Dean</Text>
            </View>
            <View style={{width: '10%'}} />
          </View>

          <View style={styles.secondRow}>
            <Text>Payment failed? </Text>
            <Text> # 1</Text>
          </View>

          <View style={styles.secondRow}>
            <Text style={styles.labelText}>Created 36 minutes ago? </Text>
            <Text style={styles.labelText}>
              | First Response Due in 5 hours
            </Text>
          </View>
          <HR lineStyle={styles.lineStyle} />

          <View style={styles.threeButtonsRow}>
            <View style={{width: '4%'}} />
            <View style={styles.containerButtons}>
              <View style={styles.orangeDot} />
              <Text style={styles.smallTextStyle}>High</Text>
            </View>
            <View style={styles.emptyWidth} />
            <View style={styles.containerButtons}>
              <Image source={USER_PHONE} style={commonStyles.smallIcon} />
              <Text style={styles.smallTextStyle}>Billing</Text>
            </View>
            <View style={styles.emptyWidth} />
            <View style={styles.containerButtons}>
              <Image source={USER_PHONE} style={commonStyles.smallIcon} />
              <Text style={styles.smallTextStyle}>Open</Text>
            </View>
            <View style={{width: '2%'}} />
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  render() {
    const {items} = this.state;

    return (
      <SafeAreaView
        style={{
          ...commonStyles.ketboardAvoidingContainer,
          backgroundColor: LIGHTEST_GRAY,
        }}>
        <Header
          navigation={this.props.navigation}
          rightImage={USER}
          title="SUPPORT REQUESTS"
        />

        <View style={styles.rowContent}>
          <View
            style={{marginLeft: moderateScale(20), justifyContent: 'center'}}>
            <Text style={{fontSize: moderateScale(10)}}> Data Created </Text>
          </View>
          <View style={{marginRight: moderateScale(-10)}}></View>
        </View>
        <TouchableOpacity style={commonStyles.content}>
          <FlatList
            style={styles.parentFlatList}
            data={items}
            extraData={this.state}
            keyExtractor={(item, index) => '' + index}
            renderItem={({item, index}) => this.listItem(item, index)}
          />

          <Text style={styles.middleText}>That's All Folks </Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          {/* start of  bottom add button */}
          <ActionButton buttonColor={APP_MAIN_GREEN} spacing={moderateScale(5)}>
            <ActionButton.Item
              buttonColor={FOREST_COLOR}
              title="New Contact"
              textContainerStyle={styles.buttonContainer}
              textStyle={styles.textStyle}
              onPress={() => console.log('notes tapped!')}>
              <Icon name="md-create" style={styles.actionButtonIcon} />
            </ActionButton.Item>
            <ActionButton.Item
              buttonColor={FOREST_COLOR}
              textContainerStyle={styles.buttonContainer}
              title="New email"
              textStyle={styles.textStyle}
              onPress={() => {}}>
              <Icon
                name="md-notifications-off"
                style={styles.actionButtonIcon}
              />
            </ActionButton.Item>
            <ActionButton.Item
              buttonColor={FOREST_COLOR}
              textContainerStyle={styles.buttonContainer}
              title="New ticket"
              textStyle={styles.textStyle}
              onPress={() => {}}>
              <Icon name="md-done-all" style={styles.actionButtonIcon} />
            </ActionButton.Item>
          </ActionButton>
          {/* end of  bottom add button */}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = ScaledSheet.create({
  subHeader: {
    color: NOTIFICATION_COUNT_BG_COLOR,
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  footer: {
    flex: 1,
    width: '100%',
    position: 'relative',
    top: moderateScale(20),
  },
  buttonContainer: {
    backgroundColor: FOREST_COLOR,
  },
  textStyle: {
    color: WHITE,
  },
  bottomQuotesRow: {
    flexDirection: 'row',
    marginHorizontal: moderateScale(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  roundBackground: {
    height: moderateScale(30),
    width: moderateScale(30),
    borderRadius: moderateScale(15),
    backgroundColor: APP_MAIN_BLUE,
  },
  parentFlatList: {
    marginTop: moderateScale(10),
  },
  threeButtonsRow: {
    flexDirection: 'row',
    marginTop: moderateScale(10),
  },
  rowContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: moderateScale(10),
    backgroundColor: WHITE,
    height: moderateScale(40),
  },
  cardRow: {
    flexDirection: 'row',
    width: '100%',
    marginHorizontal: moderateScale(10),
    marginTop: moderateScale(-5),
  },
  cardRowWithoutButton: {
    flexDirection: 'row',
    width: '100%',
    marginHorizontal: moderateScale(10),
    marginTop: moderateScale(15),
  },

  labelText: {
    fontSize: moderateScale(8),
  },
  amountText: {
    fontSize: moderateScale(10),
  },
  rowItem: {
    borderTopWidth: 1,
    borderColor: '#e6e6e6',
    justifyContent: 'center',
    marginTop: moderateScale(10),
  },
  card: {
    backgroundColor: WHITE,
    height: moderateScale(150),
  },
  newTextBackground: {
    alignSelf: 'flex-end',
    marginRight: moderateScale(10),
    backgroundColor: APP_MAIN_GREEN,
    width: moderateScale(40),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: moderateScale(10),
  },
  textColor: {
    color: WHITE,
    fontSize: moderateScale(8),
  },
  secondRow: {
    flexDirection: 'row',
    marginHorizontal: moderateScale(10),
  },
  lineStyle: {
    borderWidth: 1,
    marginTop: moderateScale(5),
    width: '95%',
    marginLeft: moderateScale(20),
    borderColor: LINE_COLOR,
  },
  containerButtons: {
    width: '20%',
    backgroundColor: LIGHTEST_GRAY,
    height: moderateScale(20),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyWidth: {
    width: '5%',
  },
  orangeDot: {
    backgroundColor: ORANGE_COLOR,
    width: moderateScale(6),
    height: moderateScale(6),
    borderRadius: 3,
  },
  smallTextStyle: {
    margin: moderateScale(5),
    fontSize: moderateScale(10),
  },
  middleText: {
    textAlign: 'center',
    marginTop: moderateScale(10),
    fontSize: moderateScale(12),
    color: DARK_GRAY,
  },
});
