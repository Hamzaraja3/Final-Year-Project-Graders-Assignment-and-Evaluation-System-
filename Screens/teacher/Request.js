import { View, Text, StyleSheet, TouchableOpacity, ToastAndroid, } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from "react-native-paper";
import { useRoute } from '@react-navigation/native';
import ip from '../../Components/fonts/IP';

const Request = ({ navigation }) => {
  const route = useRoute();
  const [grader, setgrader] = useState('')
  const handleSubmit = () => {
    sendRequest()
    ToastAndroid.show(
      'Request Send!',
      ToastAndroid.SHORT
    );
    navigation.goBack()
  }
    const sendRequest = async () => {
      try {
        var data = JSON.stringify([{
          "Emp_no": route.params.Emp,
          "REG_NO": grader
        }])
        const Send = await fetch(`http://${ip}/fyp/api/Teacher/Request_Grader`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: data,
          redirect: 'follow'
        })
        const response=await Send.json()
        console.log(response)

      } catch (error) {
        console.log('Error while Request Grader', error)
      }
    }

 
  return (
    <View style={styles.container}>
      <View style={styles.inputView}>
        <TextInput
          value={grader}
          style={styles.TextInput}
          mode="outlined"
          label="Reg No"
          activeOutlineColor='#54B435' outlineColor="#ffff"
          onChangeText={(value) => setgrader(value)}
        />
      </View>
      <View>
        <TouchableOpacity style={styles.loginBtn} onPress={() => {
          handleSubmit()
        }}>
          <Text style={styles.loginText}>SEND</Text>

        </TouchableOpacity></View>

    </View>
  )
}

export default Request
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#CBEDD5",
    flex: 1,
    alignItems: "center",
  },
  inputView: {
    marginTop: 90,
    width: "80%",
    height: 36,
    marginBottom: 20,
    marginRight: -12,
  },
  TextInput: {
    fontSize: 19,
    marginHorizontal: 25,
    marginVertical: 5,
    height: 50,
    marginLeft: 20,
    backgroundColor: '#CBEDD5',
    fontFamily: 'Poppins-Medium'
  },
  loginBtn: {

    borderRadius: 15,
    height: 65,
    alignItems: 'center',
    justifyContent: "center",
    marginTop: 45,
    backgroundColor: "#3CCF4E",
    width: 100
  },
  loginText: {
    fontSize: 22,
    fontFamily: "Poppins-Regular",
    textAlign: "center"
  },

});