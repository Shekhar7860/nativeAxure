import React, {Component} from 'react';
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
import {USER, leftArrow, BACK} from '../../constants/Images';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import AddNewButtonGroup from '../../components/AddNewButtonGroup';
import ContainerSearch from '../../components/ContainerSearch';
import CardWithIcon from '../../components/CardWithIcon';
import HR from '../../components/HR';
import {connect} from 'react-redux';
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


class AllUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeUsers: [],
      inActiveUsers: []
    };
  }
  componentDidMount = () => {
 // console.log('allusers', this.props.users);
  for (var i = 0; i < this.props.users.items.length; i++) {
    if (this.props.users.items[i].is_active == 1) {
      this.state.activeUsers.push(this.props.users.items[i]);
    } else  {
      this.state.inActiveUsers.push(this.props.users.items[i]);
    }
  }

  this.setState({
    activeUsers: this.state.activeUsers,
    inActiveUsers: this.state.inActiveUsers
  });
  };

  openScreen = (screen, param) => {
    this.props.navigation.navigate(screen, {userData: param});
  };

  listItem = (item, index, status) => {
    return (
      <TouchableOpacity style={styles.rowItem} onPress={() => this.openScreen('UserDetail', item)}>
        <View style={styles.bottomQuotesRow}>
          <View
            style={
              status == 'ACTIVE'
                ? styles.dotGreen
                : status == 'INACTIVE'
                ? styles.dotRed
                : styles.dotBlue
            }
          />
          <View style={{width: '5%'}} />
          <View style={{width: '50%', justifyContent: 'center'}}>
            <Text style={styles.labelText}>{item.name}</Text>
          </View>
          <View style={{width: '35%'}} />
          <View style={{width: '5%'}}>
            {/* <Image source={leftArrow} style={commonStyles.icon} /> */}
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  render() {
    const {activeUsers, inActiveUsers} = this.state;

    return (
      <SafeAreaView style={commonStyles.ketboardAvoidingContainer}>
        <Header
          navigation={this.props.navigation}
          rightImage={USER}
          title="ALL USERS"
          leftImage={BACK}
        />
        <TouchableOpacity style={commonStyles.content}>
          <View style={styles.rowContent}>
            <View style={{marginLeft: moderateScale(-20)}}>
              <AddNewButtonGroup
                color={APP_MAIN_GREEN}
                onPress={() => this.openScreen('UserDetail')}
              />
            </View>
            <View style={{marginRight: moderateScale(-10)}}>
              {/* <ContainerSearch /> */}
            </View>
          </View>

          <TouchableOpacity style={styles.quotesRow}>
            <View style={{width: '60%'}}>
              <Text style={styles.recentText}>ACTIVE</Text>
            </View>
            <View style={{width: '10%'}} />
            <View style={{width: '30%'}}></View>
          </TouchableOpacity>
          <FlatList
            style={styles.parentFlatList}
            data={activeUsers}
            extraData={this.state}
            keyExtractor={(item, index) => '' + index}
            renderItem={({item, index}) => this.listItem(item, index, 'ACTIVE')}
          />

          <TouchableOpacity style={styles.quotesRow}>
            <View style={{width: '60%'}}>
              <Text style={styles.recentText}>INACTIVE</Text>
            </View>
            <View style={{width: '10%'}} />
            <View style={{width: '30%'}}></View>
          </TouchableOpacity>

          <FlatList
            style={styles.parentFlatList}
            data={inActiveUsers}
            extraData={this.state}
            keyExtractor={(item, index) => '' + index}
            renderItem={({item, index}) =>
              this.listItem(item, index, 'INACTIVE')
            }
          />
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const styles = ScaledSheet.create({
  subHeader: {
    color: NOTIFICATION_COUNT_BG_COLOR,
  },
  bottomQuotesRow: {
    flexDirection: 'row',
    marginHorizontal: moderateScale(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  parentFlatList: {
    marginTop: moderateScale(10),
  },
  rowItem: {
    height: moderateScale(30),
  },
  dotBlue: {
    marginTop: moderateScale(5),
    height: moderateScale(12),
    width: moderateScale(12),
    borderRadius: moderateScale(6),
    backgroundColor: APP_MAIN_BLUE,
  },
  dotGreen: {
    marginTop: moderateScale(5),
    height: moderateScale(12),
    width: moderateScale(12),
    borderRadius: moderateScale(6),
    backgroundColor: APP_MAIN_GREEN,
  },
  dotRed: {
    marginTop: moderateScale(5),
    height: moderateScale(12),
    width: moderateScale(12),
    borderRadius: moderateScale(6),
    backgroundColor: APP_MAIN_COLOR,
  },

  rowContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: moderateScale(20),
    marginHorizontal: moderateScale(20),
  },
  recentText: {
    fontSize: moderateScale(12),
    fontWeight: 'bold',
  },
  seeText: {
    fontSize: moderateScale(11),
    color: WHITE,
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
  },
  amountText: {
    fontSize: moderateScale(10),
  },
  rowItem: {
    borderTopWidth: 1,
    borderColor: '#e6e6e6',
    height: moderateScale(30),
    justifyContent: 'center',
  },
});

const mapStateToProps = (state) => ({
  users: state.users.usersList,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers);
