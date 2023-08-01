import { View, Text ,StyleSheet} from 'react-native'
import React from 'react'

const ViewAllocation = () => {
  return (
    <View style={styles.container}>
      <Text>ViewAllocation</Text>
    </View>
  )
}

export default ViewAllocation
const styles=StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#CBEDD5',
      },
})