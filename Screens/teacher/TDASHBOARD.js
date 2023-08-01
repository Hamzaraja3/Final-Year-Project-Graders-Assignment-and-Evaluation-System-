import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image,RefreshControl} from 'react-native'
import React, { useState,useEffect } from 'react'
import { useRoute } from '@react-navigation/native'
import DropDownPicker from 'react-native-dropdown-picker';
import ip from '../../Components/fonts/IP';
const TDASHBOARD = ({ navigation}) => {
  // useEffect(()=>{
  //   //checkgrader(student)
  //   Allocate()
  //   headername()
  //   onRefresh()
  // },[])
  const route = useRoute();
  const EmployeeId=route.params.emp
  const [user,setuser]=useState([route.params.emp])
  const[name,setname]=useState('')
  const[allocate,setallocate]=useState('')
  const [student,setstudent]=useState([])
  const [refreshing, setRefreshing] = useState(false);
  const [evaluationStatus, setEvaluationStatus] = useState({});
  const onRefresh = async () => {
    setRefreshing(true);
    await checkgrader();
    setRefreshing(false);
  };
  useEffect(() => {
    headername();
    Allocate();
    checkgrader();
    onRefresh();
  }, [student]);
  
  const headername = async () => {
    try {
      const response = await fetch(`http://${ip}/fyp/api/Teacher/Teacher_Details?Teacher_ID=${user}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = await response.json();
      console.log(data);
      const fullname=data[0].Full_Name;
      setname(fullname)
      
    } catch (error) {
      console.log('Error while retrieving teacher details:', error);
    }
  };
  const Allocate=async()=>{
    try{
      globaluri=`http://${ip}/fyp/api/Teacher/GetGraders?Teacher_id=${user}`
      const teach=await fetch(globaluri,{
        method:'GET',
        headers: {
          Accept: 'application/json',
        },redirect: 'follow'
      })
      const res=await teach.json();
      console.log(res);
      res.sort((a, b) => a.SemC - b.SemC);
      setallocate(res);
      const grader=res[0].Graderid
      setstudent(grader)
      checkgrader();
      

    }
    catch(error)
    {
      console.log('Error while allocating',error)
    }
  }
  
  const checkgrader = async () => {
    try {
      const updatedEvaluationStatus = {};
  
      for (const grader of allocate) {
        const response = await fetch(`http://${ip}/fyp/api/Teacher/CheckGraderEvaluation?graderid=${grader.Graderid}`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
          redirect: 'follow',
        });
        const result = await response.json();
        console.log(result);
  
        const isEvaluated = result === 'True';
        updatedEvaluationStatus[grader.Graderid] = isEvaluated;
        console.log(updatedEvaluationStatus)
      }
  
      setEvaluationStatus(updatedEvaluationStatus);
    } catch (error) {
      console.log('Error while checking grader', error);
    }
  };
  
  
  const renderItem = ({ item, index }) => (
    
    <View style={styles.paragraph}>
      <Image style={styles.image} source={require('../../assests/eval.png')} />
      <TouchableOpacity onPress={() =>
         navigation.navigate('Evaluate Graders', { name:item.Student_Name,regno:item.Reg_no,semc:item.SemC,sec:item.SECTION,id:item.Graderid})}
         disabled={evaluationStatus[item.Graderid]}>
        <Text style={[styles.btn,{ opacity: evaluationStatus[item.Graderid]? 0.6 : 1 }]}>{evaluationStatus[item.Graderid] ? 'Evaluated' : 'Evaluate Now'}</Text>
      </TouchableOpacity><View style={[styles.btn2]}><TouchableOpacity onPress={()=>navigation.navigate('Allocate Now',{name:item.Student_Name,regno:item.Reg_no,Employee:EmployeeId,semester:item.SemC,Grader:item.Graderid})}><Text style={styles.text} >Allocate</Text></TouchableOpacity></View>
      <View style={styles.flatlist}>
      <Text style={styles.itemText}>Name: {item.Student_Name}</Text>
      <Text style={styles.itemText}>Reg no: {item.Reg_no}</Text>
      <Text style={styles.itemText}>Semester: {item.SemC}{item.SECTION}</Text>
     </View>
    </View>
  );

  return (
    <View style={styles.contaner}>
      <View style={styles.list}>
        <FlatList 
          data={allocate}
          keyExtractor={(item) => item.Reg_no.toString()}
          ListHeaderComponent={() => (
            <Text style={styles.text1}>{EmployeeId}({name})</Text>
          )}
          ListFooterComponent={() => (
            <View></View>
          )}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh}></RefreshControl>}
        />
        <View style={styles.Request}><TouchableOpacity onPress={()=>(navigation.navigate('Request Grader',{Emp:EmployeeId}))}>
          <Image source={require('../../assests/patient.png')} style={styles.img}/><Text style={styles.btntext}>Request Grader</Text></TouchableOpacity></View>
          {/* <View style={styles.Request}><TouchableOpacity onPress={()=>(navigation.navigate('View Allocation',{Emp:EmployeeId}))}>
          <Text style={styles.btntext2}>View Allocation</Text></TouchableOpacity></View> */}
      </View>
      
    </View>
  )
}

export default TDASHBOARD
const styles = StyleSheet.create({
    contaner:{
      backgroundColor: "#CBEDD5",
      flex:1
      
     },image:{
      left:250,top:7
     },
  
    text1:{
      marginTop:55,
      fontSize:24,
      textAlign:'center',
      fontFamily:'Poppins-Medium'
    },
  
    paragraph:{
      margin:8,
      backgroundColor:'#CBEDD5'
      ,borderRadius:26,
     height:150
,      padding:10,
      width:335,
      left:'1.5%',
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 12,
      },
      shadowOpacity: 0.58,
      shadowRadius: 196.00,
      elevation: 24,
    },
    list:{
        marginTop:30
    ,},
    itemText:{
      fontFamily:'Poppins-Medium',top:-140
    },
    btn:{
      
      backgroundColor:'#80ED99',width:110,borderRadius:15,textAlign:'center',fontSize:13,fontFamily:'Poppins-Medium',height:35
    ,left:208,top:32,padding:5
    },
    btn2:{
      
      backgroundColor:'#80ED99',width:110,borderRadius:15,height:35,
    left:80,top:-2
    },
    flatlist:{
      margin:10
    },text:{
      fontSize:13,fontFamily:'Poppins-Medium',padding:5,textAlign:'center'
    },
    Request:{
      marginTop:22,
      borderWidth:2,
      height:75,
      width:210,left:70,borderRadius:14, backgroundColor:'#80ED99'

    },btntext:{
      left:85,
      top:-40,fontSize:13,fontFamily:'Poppins-Medium'
    },
    img:{
      left:15,top:3
    },
    btntext2:{
      
      fontSize:13,fontFamily:'Poppins-Medium',textAlign:'center',padding:20
    },
});