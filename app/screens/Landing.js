import React, {PureComponent} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import StoreDB from '../storage/StoreDB';
import BaseScreen from '../components/BaseScreen';
import {WHITE} from '../constants/colors';
import Loading from '../components/Loading';
import {checkInternet} from '../redux/reducers/netInfo';
import NetInfo from '@react-native-community/netinfo';
import {connect} from 'react-redux';

class Landing extends PureComponent {
	componentDidMount = () => {
		this.init();
		this.checkNet();
	};

	checkNet = () => {
		// NetInfo.isConnected.addEventListener(
		// 	'connectionChange',
		// 	this.handleConnectionChange,
		// );
		NetInfo.addEventListener((state) => {
			this.handleConnectionChange(state);
		});
		NetInfo.fetch().then((state) => {
			console.log('Connection type', state.type);
			console.log('Is connected?', state.isConnected);
		});
	};

	handleConnectionChange = (state) => {
		var status = state.isConnected;
		this.props.checkInternet(status);
	};

	async init() {
		const introDone = await StoreDB.appIntroStatus();
		const userData = await StoreDB.loggedInUserData();
		if (!introDone) {
			return this.props.navigation.navigate('Help');
		} else {
			if (userData.name) {
				return this.props.navigation.navigate('Home');
			} else {
				return this.props.navigation.navigate('Login');
			}
		}
	}

	render() {
		return (
			<BaseScreen blackElements header hamburger={false}>
				<View style={styles.parent}>
					<Loading size="large" indicatorColor={WHITE} />
				</View>
			</BaseScreen>
		);
	}
}

const styles = StyleSheet.create({
	parent: {
		flex: 1,
		justifyContent: 'center',
	},
});

const mapDispatchToProps = {
	checkInternet,
};

export default connect(null, mapDispatchToProps)(Landing);
