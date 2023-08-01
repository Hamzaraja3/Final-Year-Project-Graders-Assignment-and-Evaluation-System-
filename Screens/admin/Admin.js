import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  ToastAndroid
} from "react-native";
import { TextInput } from "react-native-paper";
import ip from "../../Components/fonts/IP";


export default function Admin({ navigation }) {
  const [user, setuser] = useState("");
  const [password, setPassword] = useState();
  const handleFormSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('username', user);
      formData.append('password', password);

      const response = await fetch(`http://${ip}/fyp/api/Login/Login`, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },

      });
      const result = await response.json();
      console.log(result);
      //const [{ role, username }] = result
      const role = result?.[0]?.role;
      if (role === "Admin") {
        navigation.navigate("Dashboard")
        ToastAndroid.show(
          'Login Sucessfully!',
          ToastAndroid.SHORT)
      }
      else if (role === "Teacher") {
        navigation.navigate("Teacher Dashboard", { emp: user })
        ToastAndroid.show(
          'Login Sucessfully!',
          ToastAndroid.SHORT)
      }
      else if (role === "Student") {
        navigation.navigate("Student Dashboard", { emp: user})
        ToastAndroid.show(
          'Login Sucessfully!',
          ToastAndroid.SHORT)
      }

      else {
        // show error message for invalid credentials
        Alert.alert("Invalid credentials", "Please check your username and password and try again.");
        clear()
      }

    } catch (error) {
      console.error("Error is " + error);
    }

    //   else {
    //     Alert.alert("invalid login")
    //     setuser("");
    //     setPassword("");
    //   }
  }
  const clear = () => {
    // if (user === '2019-arid-3025') {
    //   navigation.navigate("Student Dashboard", { emp: user, name: 'M Hamza' })
    // }
     setuser("");
    setPassword("");
  }
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../../assests/biit.png')} />
      <View style={styles.inputView}>
        <TextInput
          value={user}
          style={styles.TextInput}
          mode="outlined"
          label="ID"
          activeOutlineColor='#54B435' outlineColor="#ffff"
          onChangeText={(value) => setuser(value)}

        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          value={password}
          style={styles.TextInput}
          mode="outlined"
          label="Password"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
          activeOutlineColor='#54B435' outlineColor="#ffff"
        />
      </View>
      <TouchableOpacity style={styles.loginBtn} onPress={() => {
        handleFormSubmit()
      }}>
        <Text style={styles.loginText}>LOGIN</Text>

      </TouchableOpacity>
      <Text style={styles.emp}></Text>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: "#CBEDD5",
    flex: 1,
    alignItems: "center",
  },

  image: {
    marginTop: 70,
    marginBottom: 40,
    width: 210,
    height: 210,
  },

  inputView: {
    marginTop: 9,
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
    width: "70%",
    borderRadius: 30,
    height: 60,
    alignItems: 'center',
    justifyContent: "center",
    marginTop: 45,
    backgroundColor: "#3CCF4E",
  },
  loginText: {
    fontSize: 25,
    fontFamily: "Poppins-Regular",
    textAlign: "center"
  },

});