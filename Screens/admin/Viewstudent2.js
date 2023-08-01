import { View, Text, FlatList, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { useRoute } from '@react-navigation/native'



const Viewstudent2 = ({navigation}) => {
  const route=useRoute();
    const grader=[{ Name:route.params.Grader}]
//     console.log(typeof route.params.want)
//  console.log(route.params.comment)
    
  return (
   
      <View style={styles.contaner}>
        <View style={styles.paragraph}>
      <FlatList data={grader}
      keyExtractor={(value,item) => item}
      renderItem={({item}) => (
        <View>
             
      <Text style={styles.itemText}>Grader Name: {route.params.Grader}</Text>
         <Text style={styles.itemText}>Reg No: {route.params.reg}</Text>
         <Text style={styles.itemText}>Comments: {route.params.comment}</Text>
         <Text style={styles.itemText}>Performance: {route.params.perf}</Text>
        
        </View> )}/>
        
        </View>
      

      </View>
    
  )
}

export default Viewstudent2
const styles = StyleSheet.create({
  contaner: {
    backgroundColor: "#CBEDD5",
    flex:1,
  },
    itemText:{
        fontFamily:'Poppins-Medium',padding:10,fontSize:18,margin:2
      },
      paragraph:{
        marginTop:150,
        margin:8,
        backgroundColor:'#CBEDD5'
        ,borderRadius:26,
       height:450
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
})