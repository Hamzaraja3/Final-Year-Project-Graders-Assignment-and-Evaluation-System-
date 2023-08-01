import { View, Text, FlatList, StyleSheet,Alert } from 'react-native'
import React, { useState,useEffect } from 'react'
import { useRoute } from '@react-navigation/native'
import ip from '../../Components/fonts/IP';
const Viewteacher2 = ({navigation}) => {
  useEffect(()=>{
    Get_Evaluation()
  },[])
  const route=useRoute();
  const grader=route.params.Reg;
  const[data,setdata]=useState([])
    // const grader=[{ Name:route.params.Reg}]
//     console.log(typeof route.params.want)
//  console.log(route.params.comment)
const Get_Evaluation=async()=>{
  try{
const Send=await fetch(`http://${ip}/fyp/api/Admin/GetEvaluationofStudent?regno=${grader}`,{
  method:'GET',
  redirect:'follow'
})
const response=await Send.json()

  console.log(response)
setdata(response)

    
}
catch(error){
    console.log('Error in fetching ',error)
  }
}

    
  return (
   
      <View style={styles.contaner}>
        <View style={styles.paragraph}>
      <FlatList data={data}
      keyExtractor={(value,item) => item}
      renderItem={({item}) => (
        <View>
             <View><Text style={styles.itemText}>{grader.Name}</Text></View>
      <View style={styles.Req}><Text style={styles.itemText}>Grader: {item.Student_Name}</Text></View>
         <View style={styles.Req}><Text style={styles.itemText}>Reg No: {item.Reg_No}</Text></View>
         <View style={styles.Req}><Text style={styles.itemText}>Comments: {item.comments}</Text></View>
         <View style={styles.Req}><Text style={styles.itemText}>Performance: {item.performance}</Text></View>
        <View style={styles.Req}><Text style={styles.itemText}> Do You Want this grader again?:  {item.Next_semester_point==='True'? 'Yes' : 'No'}</Text></View>
   
        </View> )}/>
        
        </View>
      

      </View>
    
  )
}

export default Viewteacher2
const styles = StyleSheet.create({
  contaner: {
    backgroundColor: "#CBEDD5",
    flex:1,
  },
    itemText:{
        fontFamily:'Poppins-Medium',padding:10,fontSize:18
      },
      paragraph:{
        marginTop:150,
        margin:8,
        backgroundColor:'#CBEDD5'
        ,borderRadius:26,
       height:500
  ,      padding:20,
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
      itemText2:{
        fontFamily:'Poppins-Medium',padding:10,fontSize:18
      },
      Req:{
        borderWidth:1,borderRadius:15,borderColor:'#519C6F',margin:5
      }
})