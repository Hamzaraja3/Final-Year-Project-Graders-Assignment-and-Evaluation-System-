import { View, Text, StyleSheet, Image, TouchableOpacity, ToastAndroid, TextInput, FlatList, Alert, ScrollView,Modal } from 'react-native'
import React from 'react'
import DocumentPicker from 'react-native-document-picker';
import { useState } from 'react';
import ip from '../../Components/fonts/IP';

const Needbase = () => {
  const [selectedFile, setSelectedFile] = useState(null)
  const [fillename, setfilename] = useState(null)
  const [data, setdata] = useState([])
  const [empNos, setEmpNos] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const[count,setcount]=useState([])
  const [showSaveBtn, setShowSaveBtn] = useState(false); 
  const [showGraderBtn, setShowGraderBtn] = useState(false);
  const Assign = count.length > 0 ? count[0].AssignedGraders : '';
  const left = count.length > 0 ? count[0].LeftGraders : '';
  const total = count.length > 0 ? count[0].TotalGraders : '';

  const pickFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.xls, DocumentPicker.types.xlsx],
      });

      const fileName = res[0].name;
      setSelectedFile(res);
      setfilename(fileName)
      console.log('Res : ' + JSON.stringify(res));
      console.log('File Name:', fileName);
    } catch (error) {
      console.log(error);
    }
  };
  //       const uploadFile=()=>{
  //         if(selectedFile)
  //         {
  //           try{
  //             var formdata = new FormData();
  // formdata.append("grader",selectedFile[0]);

  // var requestOptions = {
  //   method: 'POST',
  //   body: formdata,
  //   redirect: 'follow'
  // };

  // fetch("http://192.168.43.238/fyp/api/Admin/AssignNeedBase", requestOptions)
  //   .then(response => response.text())
  //   .then(result => console.log(result))
  //   .catch(error => console.log('error', error));

  //           }catch(error){
  //             console.log("error",error)
  //           }
  //         }
  //       }
  const uploadFile = async () => {
    if (selectedFile) {
      try {
        const formData = new FormData();
        formData.append('file', selectedFile[0]);

        const response = await fetch(`http://${ip}/fyp/api/Admin/AssignNeedBase`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        });
        console.log('Response status:', response.status);


        if (response.ok) {
          console.log('File uploaded');
          const responseData = await response.json();
          console.log('Response body:', responseData);
          setSelectedFile(null);
          const Teacherarray=responseData.Graders
          setdata(Teacherarray)
          const Graderarray=responseData.GraderInfo
          setcount(Graderarray)
          const uniqueEmpNos = [...new Set(Teacherarray.map(item => item.Emp_no))];
          setEmpNos(uniqueEmpNos);
          ToastAndroid.show(
            'File Uploaded !',
            ToastAndroid.SHORT
          );
          setShowSaveBtn(true)
          setShowGraderBtn(true)
        } else {

          console.log('Upload failed');
        }
      } catch (error) {
        console.log('Error: ', error);
      }
    } else {

      Alert.alert('No File Selected', 'Please select a file first.');
    }
  };
  const SaveGrader = async () => {
    try {
      const send = await fetch(`http://${ip}/fyp/api/Admin/ConfirmNeedBaseGraders`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
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
  const renderItem = ({ item }) => (
    <View style={styles.paragraph2}>
      <Text style={styles.itemText}>Student Name: {item.Student_Name}</Text>
      <Text style={styles.itemText}>REG NO: {item.REG_NO}</Text>
      <Text style={styles.itemText1}>Semester: {item.SemC}</Text>
    </View>
  );

  const renderEmpNos = ({ item }) => {
    const teacherData = data.filter(obj => obj.Emp_no === item);
    const uniqueTeachers = [...new Set(teacherData.map(obj => obj.Teacher_Name))];
    const uniqueSection=[...new Set(teacherData.map(obj=>obj.SectionCount))]
    const uniquecourse=[...new Set(teacherData.map(obj=>obj.CourseCount))]
    return (
      <View style={styles.paragraph}>
        <Text style={styles.headerText}>Employee No: {item}</Text>
        {uniqueTeachers.map((teacher, index) => (
          <View key={index}>
            <Text style={styles.headerText}>Teacher Name:{teacher}</Text>
            <Text style={styles.headerText2}>Total No, of Allocated Section:{uniqueSection}</Text>
            <Text style={styles.headerText2}>Total No. of Allocated Courses:{uniquecourse}</Text>
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
        <View>
          <FlatList
            data={empNos}
            keyExtractor={(item) => item.toString()}
            ListHeaderComponent={() => (<View>
              <Text style={styles.text}>Import File</Text>
        <View><TouchableOpacity onPress={() => { pickFile() }}><Image style={styles.image} source={require('../../assests/post.png')} /></TouchableOpacity></View>
              <View style={styles.input}>
          <TextInput
            underlineColorAndroid="transparent"
            style={{ color: '#000' }}
            autoCapitalize="none"
            value={fillename}
            editable={false}
            onChangeText={setfilename} />
        </View>
              <View>
                <TouchableOpacity style={styles.Btn} onPress={() => {
                  uploadFile()
                }}>
                  <Text style={styles.Text}>Upload</Text>
                </TouchableOpacity>
              </View></View>
            )}
            ListFooterComponent={() => (
              <View>{showSaveBtn &&(
                <TouchableOpacity style={styles.Btn2} onPress={() => {
                  SaveGrader()
                }}>
                  <Text style={styles.Text}>Save</Text>
                </TouchableOpacity>
                )}
                {showGraderBtn &&(
                <TouchableOpacity style={styles.btn3} onPress={() => { setModalVisible(true) }}>
                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 20 }}>Grader Info</Text></TouchableOpacity>
                )}
              <Modal visible={isModalVisible} animationType="slide">
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',backgroundColor:"#CBEDD5"}}>
                <View style={styles.modal}>
                  <Text style={styles.headerText}>Needbase Grader</Text>
                  <Text>Total No of Graders : {total}</Text>
                  <Text>Assigned Graders : {Assign}</Text>
                  <Text>Left Graders : {left}</Text>
                  </View>
                  <TouchableOpacity style={styles.modalbtn} onPress={()=>{setModalVisible(false)}}><Text>Hide</Text></TouchableOpacity>
                </View>
              </Modal>
              </View>
            )}
            renderItem={renderEmpNos}
          />
        </View>

      
    </View>
  )
}

export default Needbase
const styles = StyleSheet.create({
  contaner: {
    backgroundColor: "#CBEDD5",
    flex: 1
  },
  image: {
    margin: 10, alignSelf: 'center'
  },
  text: {
    fontSize: 20,
    fontFamily: 'Poppins-Medium', marginTop: 80, alignSelf: 'center'
  },
  Btn: {
    width: 160,
    borderRadius: 30,
    height: 50,
    marginTop: 20,
    backgroundColor: "#3CCF4E",
    alignSelf: 'center'
  },
  Text: {
    fontSize: 25,
    fontFamily: "Poppins-Regular",
    textAlign: "center", paddingTop: 4
  },
  input: {
    marginTop: 30,
    margin: 2,
    height: 50,
    borderColor: 'black',
    borderWidth: 1,
    fontFamily: 'Poppins-Medium',
    padding: 2, borderRadius: 12,
    paddingLeft: 10,
    width: 250,
    left: 45
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
    fontFamily: 'Poppins-Bold',
    fontSize: 19,
  },
  headerText2: {
    fontFamily: 'Poppins-Bold',
    fontSize: 15,

  },
  Btn2: {
    width: 140,
    borderRadius: 30,
    height: 45,
    marginTop: 30,
    backgroundColor: "#3CCF4E",
  left:20
  },
  btn3: {
    
    backgroundColor: "#3CCF4E",
   
    justifyContent: 'center',
    width: 140,
    height: 45,
    borderRadius: 23, paddingLeft:16,left:190,top:-46
  }, 
  modal:{
    borderWidth:1,
    padding:30,
    fontFamily: 'Poppins-Regular',
  fontSize: 19,borderRadius:16
  },
  modalbtn: {
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: "#54B435",
    justifyContent: 'center',
    width: 120,
    height: 50,
    borderRadius: 23,
  },
})