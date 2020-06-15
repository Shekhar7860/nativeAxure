import React, {PureComponent} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import StoreDB from '../storage/StoreDB';
import BaseScreen from '../components/BaseScreen';
import {WHITE} from '../constants/colors';
import Loading from '../components/Loading';

export default class Landing extends PureComponent {
	componentDidMount = () => {
		this.init();
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
