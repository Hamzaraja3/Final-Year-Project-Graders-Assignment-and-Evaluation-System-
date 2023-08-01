import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput,ToastAndroid,Switch} from 'react-native'
import React, { useState ,useEffect} from 'react'
import { Rating, AirbnbRating } from 'react-native-elements'
import { RadioButton } from 'react-native-paper'
import { useRoute } from '@react-navigation/native'
import ip from '../../Components/fonts/IP'
const Tevaluate = ({navigation}) => {
  useEffect(()=>{
    runtime()
  },[])
  const route=useRoute();
  const [grader, setgrader] = useState(route.params.name)
  const [reg, setreg] = useState(route.params.regno)
  const [semester, setsemester] = useState()
  const [performance, setperformance] = useState(0);
  const [comment, setcomment] = useState();
  const [nextSemesterPoint, setnextSemesterPoint] = useState(false);
 const Grader=route.params.id;
 const reviews = ["Poor","Bad", "Average", "Good", "Excellent"];
  const runtime=()=>{
    const semster=`${route.params.semc}${route.params.sec}`
    setsemester(semster)
  }
  const sendevaluation=async()=>{
    try{
var evaluationData = JSON.stringify([
  {
    "graderid":route.params.id,
    "nextSemesterPoint":nextSemesterPoint.toString(),
    "comments":comment,
    "performance":performance
  }
]);
const response=await fetch(`http://${ip}/fyp/api/Teacher/EvaluateGrader`, {
  method: 'POST',
  headers: {"Content-Type": "application/json"},
  body: evaluationData,
  redirect: 'follow'
})
  console.log('Response status:', response.status);
      if (response.ok) {
        ToastAndroid.show('Evaluation submitted successfully!', ToastAndroid.SHORT,);
        const res=await response.json()
        console.log(evaluationData)
        console.log(res)
      } else {
        ToastAndroid.show('Failed to submit evaluation.', ToastAndroid.SHORT);
      }

    } catch (error) {
      console.log('Error while sending evaluation:', error);
      ToastAndroid.show('Error while sending evaluation.', ToastAndroid.SHORT);
    }
  };
  const onPressHandler = () => {
    sendevaluation()
    ToastAndroid.show(
      'Evaluation submitted Sucessfully!',
      ToastAndroid.SHORT);
      navigation.goBack();
    }
    const renderSwitchText = () => {
      return nextSemesterPoint ? 'Yes' : 'No';
    };
    const handleRating = (value) => {
      setperformance(reviews[value-1]);
    };
    const toggleSwitch = () => {
      setnextSemesterPoint((previousState) => !previousState);
    };
  return (
    <ScrollView style={styles.contaner}>
      <View>
      <View style={styles.input1}>
  <TextInput
    style={{color:'#000'}}
    placeholder="Grader Name"
    autoCapitalize="none"
    onChangeText={setgrader}
    value={grader}
    editable={false}
  />
</View>
        <View style={styles.input}>
          <TextInput
          style={{color:'#000'}}
            underlineColorAndroid="transparent"
            placeholder="Reg No "
            placeholderTextColor="black"
            autoCapitalize="none"
            onChangeText={setreg}
            editable={false}
            value={reg} />
        </View><View style={styles.input}>
          <TextInput
            underlineColorAndroid="transparent"
            style={{color:'#000'}}
            placeholder="Semester"
            placeholderTextColor="black"
            autoCapitalize="none"
            onChangeText={setsemester}
            editable={false}
            value={semester}/></View>
        <View style={styles.rate}>
          <Text style={styles.font}> Grader Performance</Text>
         <AirbnbRating
            count={5}
            reviews={reviews}
            defaultRating={performance}
            size={30}
            selectedColor="#50c878"
            reviewColor='#50c878'
            onFinishRating={handleRating}
          />
        </View>
        <View style={styles.input2}>
          <TextInput
            underlineColorAndroid="transparent"
            placeholder="Comment..."
            multiline={true}
            placeholderTextColor="black"
            autoCapitalize="none"
            onChangeText={setcomment}
            value={comment} /></View><View style={styles.radio1}><Text></Text>
            <View ><Text style ={styles.font2}>Do you want this grader again?</Text></View>
            <View><Text style={styles.render}>{renderSwitchText()}</Text></View>
           <View style={styles.switch}>
            <Switch
        trackColor={{ false: '#767577', true: '#50c878' }}
        thumbColor={nextSemesterPoint ? '#f5dd4b' : '#f4f3f4'}
        onValueChange={toggleSwitch}
        value={nextSemesterPoint}
      /></View></View> 
        <View style={styles.btn}><TouchableOpacity onPress={onPressHandler}>  
    <Text style={{fontFamily:'Poppins-Regular',fontSize:20}}>Evaluate</Text></TouchableOpacity></View>

      </View></ScrollView>
    
  )
}

export default Tevaluate
const styles = StyleSheet.create({
  contaner: {
    backgroundColor: "#CBEDD5",
    flex:1,
  },
  
  font:{
    marginLeft:10,
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    
  },
  text: {
    marginTop: 20,
    fontSize: 28,
    textAlign: 'center',
    padding: 10,
    backgroundColor: '#80ED99',
    fontFamily: 'Poppins-Medium', borderRadius: 10,
    
  },
  input1: {
    marginTop: 85,
    margin: 7.5,
    height: 50,
    borderColor: '#54B435',
    borderWidth: 1,
    fontFamily: 'Poppins-Medium',
    padding: 2, borderRadius: 22,
    paddingLeft: 10,
    width:330,
    left:15
  },
  input: {
    marginTop: 25,
    margin: 7.5,
    height: 50,
    borderColor: '#54B435',
    borderWidth: 1,
    fontFamily: 'Poppins-Medium',
    padding: 2, borderRadius: 22,
    paddingLeft: 10,
    width:330,
    left:15
  },
  rate: {
    marginTop: 25,
    borderWidth:2,
    borderRadius:15,
    backgroundColor:'#CBEDD5',
    borderColor:'white',margin:6,
    shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 12,
      },
      shadowOpacity: 0.58,
      shadowRadius: 196.00,
      elevation: 24,
  }
  ,input2:{
    marginTop: 25,
    height: 120,
    margin:7,
    borderColor: 'white',
    borderWidth: 2,
    fontFamily: 'Poppins-Medium',
    padding: 2, borderRadius: 15,
    paddingLeft: 10
  },
  switch:{
    margin:1.5,
    flexDirection:'row',
    alignItems:'center',left:260,top:-75
  }
  ,font2:{
    margin:1,
    padding:2,
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
    top:-1
  },
   btn:{marginTop:22,alignItems:'center',
  backgroundColor: "#54B435",  
  marginLeft:95,marginRight:90,
  justifyContent: 'center',
   width: 200,
   height: 50,
   borderRadius:15,
 },
 radio1:{
  marginTop: 25,
  borderWidth:2,
  borderRadius:16,
  borderColor:'white',margin:6

 },
 render:{
  left:268,padding:5,fontFamily:'Poppins-Regular',fontSize:18,color:"#54B435",top:-6
 }
})