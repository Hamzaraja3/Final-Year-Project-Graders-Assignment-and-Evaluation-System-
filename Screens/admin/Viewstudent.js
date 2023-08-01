import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Icon } from 'react-native-elements'
import { ScrollView } from 'react-native'
import ip from '../../Components/fonts/IP'

const Viewstudent = ({ navigation }) => {
  useEffect(() => {
    teacherevaluation()
  }, [])
  const [data, setdata] = useState([]);
  const [GraderNos, setGraderNos] = useState([]);
  const teacherevaluation = async () => {
    try {
      const response = await fetch(`http://${ip}/fyp/api/admin/EvaluationListStudent`,
        {
          method: 'GET'
          , headers: {
            Accept: 'application/json',
          }, redirect: 'follow'
        })
      const res = await response.json()
      console.log(res)
      setdata(res)
      const uniqueGrader = [...new Set(res.map(item => item.Reg_No))];
      setGraderNos(uniqueGrader);
    } catch (error) {
      console.log('error while reteriving evaluation', error)
    }
  }
  const renderItem = ({ item }) => (
    <View style={styles.paragraph2}>
      {/* <Text style={styles.itemText}>Student Name: {item.Student_Name}</Text>
      <Text style={styles.itemText}>REG NO: {item.Reg_No}</Text> */}
      <View>
        <TouchableOpacity onPress={() => navigation.navigate('Grader Evaluation', {
          Grader: item.Student_Name,
          reg: item.Reg_No,
          comment: item.comments,
          perf: item.performance
        })}>
          <Image style={styles.image} source={require('../../assests/eye.png')} /><Text style={styles.btn}>View</Text>
        </TouchableOpacity></View>
    </View>
  );

  const renderGraderNos = ({ item }) => {
    const GraderData = data.filter(obj => obj.Reg_No === item);
    const uniqueGraders = [...new Set(GraderData.map(obj => obj.Student_Name))];

    return (
      <View style={styles.paragraph}>
        <Text style={styles.headerText}>Reg_No: {item}</Text>
        {uniqueGraders.map((Grader, index) => (
          <View key={index}>
            <Text style={styles.headerText}>Grader Name:{Grader}</Text>
            <FlatList
              data={GraderData.filter(obj => obj.Student_Name === Grader)}
              keyExtractor={(item) => item.Reg_No}
              renderItem={renderItem}
            />
          </View>
        ))}
      </View>
    );
  };
  return (

    <View style={styles.contaner}>

      <View style={styles.list}>
        <FlatList data={GraderNos}
          keyExtractor={(item) => item.toString()}
          ListHeaderComponent={() => (
            <View>

            </View>
          )} ListFooterComponent={() => (
            <View></View>
          )} renderItem={renderGraderNos}
        /></View>

    </View>
  )
}

export default Viewstudent
const styles = StyleSheet.create({
  contaner: {
    backgroundColor: "#CBEDD5",
    flex: 1

  }, image: {
    left: 220, top: -20
  },

  paragraph: {
    marginTop: 14,
    margin: 15,
    padding: 10,
    backgroundColor: '#CBEDD5',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.59,
    shadowRadius: 17.00,
    elevation: 24,
    borderRadius: 16
  },
  list: {
    marginTop: 50,

  },
  itemText: {
    fontFamily: 'Poppins-Medium', top: -90
  },
  btn: {

    left: 202, top: -10, backgroundColor: '#80ED99', width: 90, borderRadius: 18, textAlign: 'center', fontSize: 15, fontFamily: 'Poppins-Medium', height: 40
    , padding: 6
  },
  itemText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 17
  }, itemText1: {
    fontFamily: 'Poppins-Regular',
    fontSize: 17,
    color: "#54B435"
  },
  paragraph2: {
    marginTop: 5,
    margin: 5,
    padding: 10,
    backgroundColor: '#CBEDD5',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.59,
    shadowRadius: 17.00,
    elevation: 24,
    borderRadius: 12
  },
  headerText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
  }

});