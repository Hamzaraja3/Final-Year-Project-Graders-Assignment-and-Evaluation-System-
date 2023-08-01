import { View, Text ,TouchableOpacity,StyleSheet,FlatList, Image,ScrollView} from 'react-native'
import React from 'react'
import { Icon } from 'react-native-elements'
;


const Dashboard = ({navigation}) => {
  const [active, setActive] = React.useState('');
  return (
    <View style={styles.contaner}>
      <ScrollView>
    <View style={styles.one}><TouchableOpacity onPress={()=>navigation.navigate('Assign Grader')}>
    <Image style={styles.image}source={require('../../assests/add-user.png')} />
      <Text style={styles.text}>Assign Grader</Text></TouchableOpacity></View>
      <View style={styles.two}><TouchableOpacity onPress={()=>navigation.navigate('Assign Manually')}><Image style={styles.image}source={require('../../assests/rules.png')} />
      <Text style={styles.text2}>Assign Manually</Text></TouchableOpacity></View>
    <View style={styles.three}><TouchableOpacity onPress={()=>navigation.navigate('View Evaluation')}>
    <Image style={styles.image}source={require('../../assests/file.png')} />
      <Text style={styles.text}>View        Evaluation</Text>
      </TouchableOpacity></View>
      <View style={styles.create}><TouchableOpacity onPress={()=>navigation.navigate('Graders List')}><Image style={styles.image}source={require('../../assests/list.png')} />
      <Text style={styles.text2}>Assigned Graders</Text></TouchableOpacity></View>
      <View style={styles.five}><TouchableOpacity onPress={()=>navigation.navigate('Equivalent Courses')}><Image style={styles.image}source={require('../../assests/menu.png')} />
      <Text style={styles.text2}>Grid</Text></TouchableOpacity></View>
      <View style={styles.six}><TouchableOpacity onPress={()=>navigation.navigate('Needbase Student')}><Image style={styles.image}source={require('../../assests/scholarship.png')} />
      <Text style={styles.text2}>Need Base</Text></TouchableOpacity></View>
      <View style={styles.seven}><TouchableOpacity onPress={()=>navigation.navigate('Rules')}><Image style={styles.image}source={require('../../assests/book.png')} />
      <Text style={styles.text2}>Rules</Text></TouchableOpacity></View>
    <View style={styles.bogus}></View>
    </ScrollView>
    </View>
    
  )
}

export default Dashboard
const styles = StyleSheet.create({
  contaner:{
    backgroundColor: "#CBEDD5",flex:1,
    
   },

  image:{
    left:50,
    margin:6

  },
  one:{
    
    marginTop:130,
    flexDirection:'column',justifyContent:'center',
    height: 172,
    width: 158,
    backgroundColor: '#CBEDD5',
    left: '5%',
  borderRadius:25,
  
  shadowColor: "#000",
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
    textAlign:'center',
    paddingTop:2,
   
    fontFamily:'Poppins-Medium',
  },
  two:{
    marginTop:-170,
    flexDirection:'column',justifyContent:'center',
    height: 172,
    width: 160,
    backgroundColor: '#CBEDD5',
    borderRadius:25,
    left: '52.2%',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    
    elevation: 24,
   
  },
three:{
    marginTop:25,
    flexDirection:'column',justifyContent:'center',
    height: 172,
    width: 160,
    backgroundColor: '#CBEDD5',
    borderRadius:25,
    left: '5%',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    
    elevation: 24,
   
  },
  create:{
   
    marginTop:-172, 
    flexDirection:'column',justifyContent:'center',
    height: 172,
    width: 160,
    backgroundColor: '#CBEDD5',
    left: '52.5%'
    ,borderRadius:25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    
    elevation: 24,
  },  
  five:{
   
    marginTop:20, 
    flexDirection:'column',justifyContent:'center',
    height: 172,
    width: 160,
    backgroundColor: '#CBEDD5',
    left: '5%'
    ,borderRadius:25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    
    elevation: 24,
  }, 
  six:{
    marginTop:-172, 
    flexDirection:'column',justifyContent:'center',
    height: 172,
    width: 160,
    backgroundColor: '#CBEDD5',
    left: '52.5%'
    ,borderRadius:25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    
    elevation: 24,
  },
  text2:{
    fontSize:28,
    textAlign:'center',
    paddingTop:2,
    fontFamily:'Poppins-Medium'
  },
  bogus:{
    
  },seven:{
   
    marginTop:20, 
    flexDirection:'column',justifyContent:'center',
    height: 172,
    width: 160,
    backgroundColor: '#CBEDD5',
    left: '5%'
    ,borderRadius:25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    
    elevation: 24,
  }, 

 
});
