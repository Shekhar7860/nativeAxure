import React from 'react'
import {View, Text, Button} from 'react-native';

export default Cart = (props) => {
	return (<View><Text>This is Cart Screen </Text>
         <Button title="OpenDrawer" onPress={() => props.navigation.openDrawer()}></Button>
		</View>)
}