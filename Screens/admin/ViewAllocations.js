import { View, Text,StyleSheet,FlatList } from 'react-native'
import React,{useState,useEffect} from 'react'
import { useRoute } from '@react-navigation/native'
import ip from '../../Components/fonts/IP'

const ViewAllocations = () => {
    useEffect(()=>{
        Get_Allocation()
    },[])
    const route=useRoute();
const[data,setdata]=useState([])
const Student=route.params.Reg;
const Teacher=route.params.Teacher_ID;
const Get_Allocation=async()=>{
    try{
const send=await fetch(`http://${ip}/fyp/api/Admin/GetAllocationTask?teacherid=${Teacher}&regno=${Student}`,{
    method:'GET',
    redirect:'follow'
})
const response=await send.json()
console.log(response)
setdata(response)
    }
    catch(error){
        console.log('Error in Fetching Allocation',error)
    }
}
const ITEMS = ({ item }) => {
   
    return(
    <View style={styles.paragraph}>
        <Text style={styles.itemText}>Course No: {item.COURSE_NO}</Text>
        <Text style={styles.itemText}>Course No: {item.Title}</Text>
        <Text style={styles.itemText}>Discipline: {item.DISCIPLINE}</Text>
        <Text style={styles.itemText}>Semester & Section: {item.SemC}{item.SECTION}</Text>
    </View>
)}
  return (
    <View style={styles.container}>
   <View style={styles.list}></View>
   <FlatList 
   data={data}
   keyExtractor={(item) => item.Allocate_ID}
   ListHeaderComponent={() => (
    <View style={styles.header}>
    <Text style={styles.text1}>{route.params.Name}</Text>
    <Text style={styles.text2}>{route.params.Grader}</Text>
  </View>
   )}
   ListFooterComponent={() => (
    <View></View>
   )}
   renderItem={ITEMS}
   />
    </View>
  )
}

export default ViewAllocations
const styles=StyleSheet.create({
    container:{
        backgroundColor: "#CBEDD5",
    flex: 1
    },
    paragraph: {
        marginTop: 14,
        margin: 15,
        padding: 5,
        backgroundColor: '#CBEDD5',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 12,
        },
        shadowOpacity: 0.59,
        shadowRadius: 17.00,
        elevation: 24,
        borderRadius: 16,
      },
      itemText:{
        fontFamily:'Poppins-Medium',padding:2,fontSize:18
      },
      list:{
        marginTop:10
      },
      header: {
        marginTop: 80,
        left: 60
      },
      text1: {
        fontSize: 18,
        marginBottom: 10, fontSize: 24,
        textAlign: 'center',
        fontFamily: 'Poppins-Medium', borderWidth: 1, width: 250, borderRadius: 14
      },
      text2: {
        fontSize: 16,
        marginBottom: 20, fontSize: 24,
        textAlign: 'center',
        fontFamily: 'Poppins-Medium', borderWidth: 1, width: 250, borderRadius: 14, margin: 10
      },
})