import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import {WHITE, APP_MAIN_GREEN} from '../constants/colors';
import TouchableImage from './TouchableImage';
import commonStyles from '../commonStyles/commonStyles';
import {SEARCH} from '../constants/Images';

const ContainerSearch = (props) => {
	return (
		<View>
			<TouchableOpacity style={styles.searchContainer}>
				<TouchableImage
					image={SEARCH}
					imageStyle={styles.icon}
					
				/>
			</TouchableOpacity>
		</View>
	);
};

const styles = ScaledSheet.create({
	searchContainer: {
		width: moderateScale(90),
		height: moderateScale(30),
		borderWidth: 1,
		borderRadius: moderateScale(15),
		justifyContent: 'center',
	},
	icon: {
		width: moderateScale(18),
		height: moderateScale(18),
		alignSelf: 'flex-end',
		marginRight: moderateScale(10),
	},
});

export default ContainerSearch;
