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
} from '../../constants/colors';
import {USER, BACK, TASK} from '../../constants/Images';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import AddNewButtonGroup from '../../components/AddNewButtonGroup';
import ContainerSearch from '../../components/ContainerSearch';
import CardWithIcon from '../../components/CardWithIcon';
import HR from '../../components/HR';
import TouchableImage from '../../components/TouchableImage';
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
import {getClientDetails} from '../../redux/reducers/clients';
import OverlaySpinner from '../../components/OverlaySpinner';
import {connect} from 'react-redux';

class Client extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      items: [1, 2, 3, 4],
      clientId: '',
      client: {},
      showLoading: false,
    };
  }
  componentDidMount = () => {
    if (this.props.route.params) {
      this.setState({clientId: this.props.route.params.clientData.id});
      this.getClientDetails(this.props.route.params.clientData.id);
    }

    //this.props.navigation.navigate('Cart')
  };

  getClientDetails = (id) => {
    const {online} = this.props;
    if (online) {
      this.setState({showLoading: true});
      this.props
        .getClientDetails(id)
        .then((response) => {
          // console.log('response', response);
          this.setState({showLoading: false});
          if (response.code === 200) {
            this.setState({client: response.data});
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

  openScreen = (screen, param) => {
    this.props.navigation.navigate(screen, {clientData: param});
  };

  render() {
    const {items, client, showLoading} = this.state;

    return (
      <SafeAreaView style={commonStyles.ketboardAvoidingContainer}>
        <Header
          navigation={this.props.navigation}
          rightImage={USER}
          title="CLIENT"
          leftImage={BACK}
        />
        <View style={commonStyles.content}>
          <View style={styles.rowContent}>
            <View style={{marginLeft: moderateScale(-20)}}>
              <AddNewButtonGroup
                color={APP_MAIN_GREEN}
                onPress={() => this.openScreen('AddClient')}
              />
            </View>
            <View style={{marginRight: moderateScale(-10)}}></View>
          </View>

          <View style={styles.content}>
            <View style={styles.bottomQuotesRow}>
              <View style={styles.blueContentWidth}>
                <View style={styles.dotBlue} />
              </View>
              <View style={styles.blueContentWidth} />
              <View style={styles.mainContentWidth}>
                <Text style={styles.labelText}>Denmark HQ</Text>
              </View>
              <View style={styles.emptyWidth} />
              <View style={styles.lastTextWidth}>
                <TouchableOpacity
                  onPress={() =>
                    this.openScreen('EditClient', {clientDetail: client})
                  }>
                  <Image source={TASK} style={commonStyles.icon} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.bottomQuotesRow}>
              <View style={styles.blueContentWidth}></View>
              <View style={styles.blueContentWidth} />
              <View style={styles.mainContentWidth}>
                <Text style={styles.labelText}>ID</Text>
              </View>
              <View style={styles.emptyWidth} />
              <View style={styles.lastTextWidth}>
                <Text style={styles.amountText}>{client.id}</Text>
              </View>
            </View>

            <View style={styles.bottomQuotesRow}>
              <View style={styles.blueContentWidth}></View>
              <View style={styles.blueContentWidth} />
              <View style={styles.mainContentWidth}>
                <Text style={styles.labelText}>Name</Text>
              </View>
              <View style={styles.emptyWidth} />
              <View style={styles.lastTextWidth}>
                <Text style={styles.amountText}>{client.name}</Text>
              </View>
            </View>

            <View style={styles.bottomQuotesRow}>
              <View style={styles.blueContentWidth}></View>
              <View style={styles.blueContentWidth} />
              <View style={styles.mainContentWidth}>
                <Text style={styles.labelText}>Email</Text>
              </View>
              <View style={styles.emptyWidth} />
              <View style={styles.lastTextWidth}>
                <Text style={styles.amountText}>{client.email}</Text>
              </View>
            </View>

            <View style={styles.bottomQuotesRow}>
              <View style={styles.blueContentWidth}></View>
              <View style={styles.blueContentWidth} />
              <View style={styles.mainContentWidth}>
                <Text style={styles.labelText}>Phone</Text>
              </View>
              <View style={styles.emptyWidth} />
              <View style={styles.lastTextWidth}>
                <Text style={styles.dateText}>{client.phone}</Text>
              </View>
            </View>

            <View style={styles.bottomQuotesRow}>
              <View style={styles.blueContentWidth}></View>
              <View style={styles.blueContentWidth} />
              <View style={styles.mainContentWidth}>
                <Text style={styles.labelText}>Partner </Text>
              </View>
              <View style={styles.emptyWidth} />
              <View style={styles.lastTextWidth}>
                <Text style={styles.amountText}>Yantra Test Reseller</Text>
              </View>
            </View>

            <View style={styles.bottomQuotesRow}>
              <View style={styles.blueContentWidth}></View>
              <View style={styles.blueContentWidth} />
              <View style={styles.mainContentWidth}>
                <Text style={styles.labelText}>Updater </Text>
              </View>
              <View style={styles.emptyWidth} />
              <View style={styles.lastTextWidth}>
                <Text style={styles.amountText}>MPH Demo</Text>
              </View>
            </View>

            <View style={styles.bottomQuotesRow}>
              <View style={styles.blueContentWidth}></View>
              <View style={styles.blueContentWidth} />
              <View style={styles.mainContentWidth}>
                <Text style={styles.labelText}>Updated at</Text>
              </View>
              <View style={styles.emptyWidth} />
              <View style={styles.lastTextWidth}>
                <Text style={styles.dateText}>{client.updated_at}</Text>
              </View>
            </View>

            <View style={styles.bottomQuotesRow}>
              <View style={styles.blueContentWidth}></View>
              <View style={styles.blueContentWidth} />
              <View style={styles.mainContentWidth}>
                <Text style={styles.labelText}>Active</Text>
              </View>
              <View style={styles.emptyWidth} />
              <View style={styles.lastTextWidth}>
                <Text style={styles.amountText}>Yes</Text>
              </View>
            </View>
          </View>
        </View>
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
    fontWeight: 'bold',
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
  blueContentWidth: {
    width: '5%',
  },
  emptyWidth: {
    width: '10%',
  },
  emptyWidth2: {
    width: '10%',
  },

  mainContentWidth: {
    width: '50%',
    justifyContent: 'center',
  },
  lastTextWidth: {
    width: '30%',
  },
  lastTextWidth2: {
    width: '30%',
  },
});

const mapState = (state) => ({
  online: state.userData.online.online,
});

const mapDispatchToProps = {
  getClientDetails,
};

export default connect(mapState, mapDispatchToProps)(Client);
