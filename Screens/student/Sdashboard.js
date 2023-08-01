import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image,RefreshControl} from 'react-native'
import React, { useState, useEffect } from 'react'
import { useRoute } from '@react-navigation/native'
import ip from '../../Components/fonts/IP'
const Sdashboard = ({ navigation }) => {
  const route = useRoute();
  const registeration = route.params.emp;
  const [Name, setName] = useState('')
  const [data,setdata]=useState([])
  const[status,setstatus]=useState([])
  const[GraderId,setGraderId]=useState('')
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    await checkEvaluation();
    setRefreshing(false);
  };
  useEffect(() => {
    header()
    Get_course()
    checkEvaluation()
    onRefresh()
  }, [GraderId])
  const header = async () => {
    try {
      const send = await fetch(`http://${ip}/fyp/api/Student/Student_Details?Student_Reg_No=${registeration}`, {
        method: 'GET',
        redirect: 'follow'
      })
      const response = await send.json()
      console.log(response)
      const name = response[0].Full_Name
      setName(name);
    } catch (error) {
      console.log("error while fetching name", error)
    }
  }
  const Get_course=async()=>{
    try{
      const Get_All_courses=await fetch(`http://${ip}/fyp/api/Student/GetGraders?Regno=${registeration}`,{
        method:'Get',
        redirect:'follow'
      })
      const response=await Get_All_courses.json()
      console.log(response)
      setdata(response)
      const Grader=response[0].Graderid;
      setGraderId(Grader)
    }catch(error){
      console.log("Error while Get Courses",error)
    }
  }
  const checkEvaluation=async()=>{
    try{
      const updateStatus={}
      for (const grader of data) {
        const response = await fetch(`http://${ip}/fyp/api/Student/CheckGraderEvaluation?graderid=${grader.Graderid}`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
          redirect: 'follow',
        });
        const result = await response.json();
        console.log(result);
  
        const isEvaluated = result === 'True';
        updateStatus[grader.Graderid] = isEvaluated;
        console.log(updateStatus)
      }
  
      setstatus(updateStatus);
      

    }catch(error){
      console.log('error While checking status',error)
    }
  }
  const renderItem=({item})=>{
    return(
    <View style={styles.paragraph}>
    <View><TouchableOpacity onPress={() => navigation.navigate('Evaluate Grader',
     {subject: item.Title, Reg: item.Reg_No, Grader: item.Student_Name,id:item.Graderid})}disabled={status[item.Graderid]}>
      <Image style={styles.image} source={require('../../assests/eval.png')} />
      <Text style={[styles.btn,{ opacity: status[item.Graderid]? 0.6 : 1 }]}>{status[item.Graderid] ? 'Evaluated' : 'Evaluate Now'}</Text>
    </TouchableOpacity></View>
    <Text style={styles.itemText}>Course: {item.Title}</Text>
    <Text style={styles.itemText}>Reg No: {item.Reg_No}</Text>
    <Text style={styles.itemText}>Grader Name: {item.Student_Name}</Text>
    
    {/* <Text style={styles.itemText}>Grader Name: {item.Grader}</Text>
    <Text style={styles.itemText}>Reg No: {item.regno}</Text> */}
  </View>
    )
  }
  return (

    <View style={styles.contaner}>
     
      <View style={styles.list}>
        <FlatList data={data}
          keyExtractor={(item) => item.Reg_No.toString()}
          ListHeaderComponent={() => (
            <Text style={styles.text1}>{route.params.emp}({Name})</Text>
          )}
          renderItem={renderItem} 
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh}></RefreshControl>}
          ListFooterComponent={() => (
            <View></View>
          )}
          /></View>
    </View>
  )
}

export default Sdashboard
const styles = StyleSheet.create({
  contaner: {
    backgroundColor: "#CBEDD5",
    flex: 1

  }, image: {
    left: 252, top: 10
  },

  text1: {
    marginTop: 65,
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Poppins-Medium'
  },

  paragraph: {
    margin: 8,
    backgroundColor: '#CBEDD5'
    , borderRadius: 26,
    height: 150
    , padding: 10,
    width: 335,
    left: '1.5%',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 196.00,

    elevation: 24,
  },
  list: {
    marginTop: 28
    ,
  },
  itemText: {
    fontFamily: 'Poppins-Medium', top:-80
  },
  btn: {

    backgroundColor: '#80ED99', width: 110, borderRadius: 15, textAlign: 'center', fontSize: 13, fontFamily: 'Poppins-Medium', height: 35
    , left: 208, top: 32, padding: 4
  },

});