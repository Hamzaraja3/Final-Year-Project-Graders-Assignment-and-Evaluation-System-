import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView, ToastAndroid, ActivityIndicator, Modal } from 'react-native'
import React, { useState, useEffect } from 'react';
import ip from '../../Components/fonts/IP';

const Grader_assign = ({ navigation }) => {
  const [assigned, setAssigned] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [responseData, setResponseData] = useState([]);
  const [empNos, setEmpNos] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const[count,setcount]=useState([])
  const Assign = count.length > 0 ? count[0].AssignedGraders : '';
  const left = count.length > 0 ? count[0].LeftGraders : '';
  const total = count.length > 0 ? count[0].TotalGraders : '';
  
  const fetchData = async () => {
    setAssigned(true);
    try {
      setIsLoading(true);
      const response = await fetch(
        `http://${ip}/fyp/api/Admin/AssignGraders`,
      );
      setIsLoading(false);
      const data = await response.json();
      const  Graderarray=data.Graders
      setResponseData(Graderarray);
      const countArray=data.GraderInfo
      setcount(countArray)
      const uniqueEmpNos = [...new Set(Graderarray.map(item => item.Emp_no))];
      setEmpNos(uniqueEmpNos);
      console.log(data);

    } catch (error) {
      console.error("Error is " + error);
      setIsLoading(false);
    }
  };


  const SaveGrader = async () => {
    try {
      // var raw = JSON.stringify(responseData)
      //   var myHeaders = new Headers();
      // myHeaders.append("Content-Type", "application/json");
      const send = await fetch(`http://${ip}/fyp/api/Admin/ConfirmGraders`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(responseData),
        redirect: 'follow'

      });
      console.log('Response status:', send.status);
      if (send.ok) {
        const res = await send.json();
        console.log('Response body:', res);
        ToastAndroid.show(
          'All Graders Assigned Successfully!',
          ToastAndroid.SHORT
        );
      } else {
        console.log('Data not saved');
      }
    }
    catch (error) {
      console.log("upload data fail", error)
    }
  }
  const showModal = () => {
    setModalVisible(true);
  };
  const renderItem = ({ item }) => (
    <View style={styles.paragraph2}>
      <Text style={styles.itemText}>Student Name: {item.Student_Name}</Text>
      <Text style={styles.itemText}>REG NO: {item.REG_NO}</Text>
      <Text style={styles.itemText1}>Semester: {item.SemC}</Text>
    </View>
  );

  const renderEmpNos = ({ item }) => {
    const teacherData = responseData.filter(obj => obj.Emp_no === item);
    const uniqueTeachers = [...new Set(teacherData.map(obj => obj.Teacher_Name))];
    const uniqueSection=[...new Set(teacherData.map(obj=>obj.SectionCount))]
    const uniquecourse=[...new Set(teacherData.map(obj=>obj.CourseCount))]

    return (
      <View style={styles.paragraph}>
        <Text style={styles.headerText}>Employee No: {item}</Text>
        {uniqueTeachers.map((teacher, index) => (
          <View key={index}>
            <Text style={styles.headerText}>Teacher Name:{teacher}</Text>
            <Text style={styles.headerText2}>Total No of Allocated Section:{uniqueSection}</Text>
            <Text style={styles.headerText2}>Total No of Allocated Courses:{uniquecourse}</Text>
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
    <View style={styles.container}>
      <FlatList
        data={empNos}
        keyExtractor={(item) => item.toString()}
        ListHeaderComponent={() => (
          <View style={styles.btn}>
            {isLoading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <TouchableOpacity onPress={fetchData}>
                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 20 }}>Assign Now</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
        renderItem={renderEmpNos}
        ListFooterComponent={() => (
          assigned && (
            <View style={styles.btn2}>
              <TouchableOpacity onPress={() => { SaveGrader() }}>
                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 20 }}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btn3} onPress={() => { setModalVisible(true) }}>
                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 20 }}>Grader Info</Text></TouchableOpacity>
              <Modal visible={isModalVisible} animationType="slide">
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',backgroundColor:"#CBEDD5"}}>
                <View style={styles.modal}>
                  <Text style={styles.headerText}>Performance base Grader</Text>
                  <Text>Total No of Graders : {total}</Text>
                  <Text>Assigned Graders : {Assign}</Text>
                  <Text>Left Graders : {left}</Text>
                  </View>
                  <TouchableOpacity style={styles.modalbtn} onPress={()=>{setModalVisible(false)}}><Text>Hide</Text></TouchableOpacity>
                </View>
              </Modal>
            </View>

          )
        )}
      />
      <View style={styles.bogus}></View>
    </View>
  );
}
export default Grader_assign

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#CBEDD5",
    flex: 1
  },
  btn: {
    marginTop: 75,
    alignItems: 'center',
    backgroundColor: "#54B435",
    marginLeft: 80,
    marginRight: 90,
    justifyContent: 'center',
    width: 200,
    height: 50,
    borderRadius: 23,
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
  itemText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 17
  }, headerText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 19,

  },headerText2: {
    fontFamily: 'Poppins-Bold',
    fontSize: 15,

  }
  , btn2: {
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: "#54B435",
    marginLeft: 20,
    marginRight: 90,
    justifyContent: 'center',
    width: 150,
    height: 50,
    borderRadius: 23,

  }, itemText1: {
    fontFamily: 'Poppins-Regular',
    fontSize: 17,
    color: "#54B435"
  }, paragraph2: {
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
  btn3: {
    alignItems: 'center',
    backgroundColor: "#54B435",
    marginLeft: 315,
    justifyContent: 'center',
    width: 150,
    height: 50,
    borderRadius: 23, margin: -25, top: -16
  }, 
  bogus: {
    margin: 10 },
    modalbtn: {
      marginTop: 20,
      alignItems: 'center',
      backgroundColor: "#54B435",
      justifyContent: 'center',
      width: 120,
      height: 50,
      borderRadius: 23,
    },
    modal:{
      borderWidth:1,
      padding:30,
      fontFamily: 'Poppins-Regular',
    fontSize: 19,borderRadius:16
    }
});