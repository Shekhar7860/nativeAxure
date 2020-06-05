import React from 'react'
import {View, Text, Button} from 'react-native';

export default Home = (props) => {
	return (<View><Text>This is Home Screen </Text>
         <Button title="OpenDrawer" onPress={() => props.navigation.openDrawer()}></Button>
		</View>)
}