import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Icon } from 'react-native-elements'
import ip from '../../Components/fonts/IP'

const Assigned = ({ navigation }) => {
  useEffect(() => {
    AllGraders();
  }, []);
  const [data, setData] = useState(null);
  const [empNos, setEmpNos] = useState([]);
  const [evaluationStatus, setEvaluationStatus] = useState({});
  const [registeration,setregisteration]=useState([])
  const AllGraders = async () => {
    try {
      const response = await fetch(`http://${ip}/fyp/api/Admin/GradersList`, {
        method: 'GET',

      })
      
      const json = await response.json();
      setData(json);
      const uniqueEmpNos = [...new Set(json.map(item => item.Emp_no))];
      setEmpNos(uniqueEmpNos);
      console.log(json);
    }
    catch (error) {

    }
  }
  const renderItem = ({ item }) => (
    <View style={styles.paragraph2}>
      <Text style={styles.itemText}>Student Name: {item.Student_Name}</Text>
      <Text style={styles.itemText}>REG NO: {item.REG_NO}</Text>
      <Text style={styles.itemText}>Semester: {item.SemC}</Text>
      <Text style={styles.itemText}>CGPA: {item.CGPA}</Text><View>
      <TouchableOpacity onPress={() => navigation.navigate('Graders Evaluation', {Reg:item.REG_NO
      })}>
        <Image style={styles.image} source={require('../../assests/eye.png')} /><Text style={styles.btn}>View Evaluation</Text>
      </TouchableOpacity></View>
      <View><TouchableOpacity onPress={()=>navigation.navigate('View Allocations',{Reg:item.REG_NO,Teacher_ID:item.Emp_no,Name:item.Teacher_Name,Grader:item.Student_Name})}><Text style={styles.btn2}>View Allocation</Text></TouchableOpacity></View>
    </View>
  );

  const renderEmpNos = ({ item }) => {
    const teacherData = data.filter(obj => obj.Emp_no === item);
    const uniqueTeachers = [...new Set(teacherData.map(obj => obj.Teacher_Name))];

    return (
      <View style={styles.paragraph}>
        <Text style={styles.headerText}>Employee No: {item}</Text>
        {uniqueTeachers.map((teacher, index) => (
          <View key={index}>
            <Text style={styles.headerText}>Teacher Name:{teacher}</Text>
            <View style={styles.Req}><TouchableOpacity onPress={()=>navigation.navigate('View Request',{TEACHER:item,NAME:teacher})}><Text>View Request</Text></TouchableOpacity></View>
            <FlatList
              data={teacherData.filter(obj => obj.Teacher_Name === teacher)}
              keyExtractor={(item) => item.REG_NO}
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
        <FlatList
          data={empNos}
          keyExtractor={(item) => item.toString()}
          ListHeaderComponent={() => (
            <View>

            </View>
          )}
          renderItem={renderEmpNos}
          ListFooterComponent={() => (
            <View></View>
          )} /></View>
      {/* <View style={styles.list}>
        <FlatList data={grader}
          keyExtractor={(value, item) => item}
          renderItem={({ item }) => (

            <View style={styles.paragraph}>
              <TouchableOpacity>

              </TouchableOpacity>
              <Text style={styles.itemText}>Name: {item.TeacherName}</Text>
              <Text style={styles.itemText}>Grader: {item.Grader}</Text>
              <Text style={styles.itemText}>Reg no: {item.regno}</Text>
              <Text style={styles.itemText}>Subject: {item.Subject}</Text>
            </View>

          )} /></View> */}
    </View>
  )
}

export default Assigned
const styles = StyleSheet.create({
  contaner: {
    backgroundColor: "#CBEDD5",
    flex: 1
  },
  text1: {
    marginTop: 15,
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'Poppins-Medium'
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
  list: {
    marginTop: 80
    ,
  },
  itemText: {
    fontFamily: 'Poppins-Medium', top: 10,marginTop:5
  },
  itemText1: {
    fontFamily: 'Poppins-Regular',
    fontSize: 17,
    color: "#54B435"
  }, paragraph2: {
    marginTop: 5,
    margin: 5,
    padding: 5,
    backgroundColor: '#CBEDD5',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.59,
    shadowRadius: 17.00,
    elevation: 24,
    borderRadius: 12,
  },
  headerText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 19,

  }, image: {
    left: 220, top: -45
  },
  btn: {
    left: 175, top: -30, backgroundColor: '#80ED99', width: 120, borderRadius: 15, textAlign: 'center', fontSize: 12, fontFamily: 'Poppins-Medium', height: 40
    , padding: 6,borderWidth:1
  },
  Req: {
    height:30,width:100,borderWidth:1,padding:3,backgroundColor: '#80ED99',borderRadius:14,left:212,top:-6

  },btn2: {
     backgroundColor: '#80ED99', width: 120, borderRadius: 15, textAlign: 'center', fontSize: 12, fontFamily: 'Poppins-Medium', height: 40
    , padding: 6,left:175,borderWidth:1,marginBottom:-20,top:-20
  },
});