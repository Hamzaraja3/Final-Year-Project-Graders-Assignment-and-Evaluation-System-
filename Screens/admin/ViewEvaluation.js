import { View, Text,TouchableOpacity,StyleSheet,Image,FlatList } from 'react-native'
import React,{useState} from 'react';
import { Icon } from 'react-native-elements'


const ViewEvaluation = ({navigation}) => {
 
 
  return (
    <View style={styles.contaner}>
       <View style={styles.one}><TouchableOpacity onPress={()=>navigation.navigate('Teacher')}>
       <Image style={styles.image}source={require('../../assests/teach.png')} />
      <Text style={styles.text}>Teacher</Text></TouchableOpacity></View>
    <View style={styles.two}><TouchableOpacity onPress={()=>navigation.navigate('Student')}>
    <Image style={styles.image}source={require('../../assests/student.png')} />
      <Text style={styles.text}>Student</Text></TouchableOpacity></View>
    </View>
  )
}
const Item = ({item}) => {
  return (
    
      <View style={styles.paragraph}>
       <Text style={styles.itemText}>Sr: {item.Id}</Text>
    <Text style={styles.itemText}>Teacher: {item.TeacherName}</Text>
       <Text style={styles.itemText}>Grader Name: {item.Grader}</Text>
     </View>
  );
};
export default ViewEvaluation
const styles = StyleSheet.create({
  contaner:{
    backgroundColor: "#CBEDD5",
    flex:1
    
   },
  header:{
    fontSize:30,
    fontWeight:"bold",
    fontFamily:'monospace',
    padding:10
    ,backgroundColor:'blue',
    backgroundColor: "#80ED99",
    textAlign:'center'
    },
  one:{
    
    marginTop:210,
    flexDirection:'row',
    height: 175,
    width: 170,
    backgroundColor: '#CBEDD5',
    left: '1%',
  borderRadius:26, shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 12,
  },
  shadowOpacity: 0.58,
  shadowRadius: 16.00,
  elevation: 24,

  },
  two:{
    marginTop:-176,
    flexDirection:'row',
    height: 175,
    width: 168,
    borderRadius:26,
    left:'24.8%',
    // top:'-44%',
    
    
     backgroundColor: '#CBEDD5',  
  borderRadius:26, shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 12,
  },
  shadowOpacity: 0.58,
  shadowRadius: 16.00, 
  elevation: 24,
  },
  text:{
    fontSize:28,
    left:'22%',
    paddingTop:4,
    fontFamily:'Poppins-Medium',
  },
  image:{
    marginTop:20,
    left:50,
    margin:4,
  }
});