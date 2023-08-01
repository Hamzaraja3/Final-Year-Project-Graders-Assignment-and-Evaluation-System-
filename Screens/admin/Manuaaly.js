import { View, Text, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useState, useEffect } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import ip from '../../Components/fonts/IP';
const Manuaaly = ({ navigation }) => {
  useEffect(() => {
    mannual()
    // GetSemcTeacher()
  }, [])
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [value, setValue] = useState(null);
  const [value2, setValue2] = useState(null);
  const [teacher, setteacher] = useState([]);
  const [grader, setgrader] = useState([]);
  const [teachselect, setteachselect] = useState(null)
  const [gradeselect, setgradeselect] = useState(null)
  const [semcTeacherResponse, setSemcTeacherResponse] = useState('')
  const [semcGraderResponse, setSemcGraderResponse] = useState('')
  const teach = teacher.map((item) => ({ label: item.Teacher_Name, value: item.Emp_no, key: item.Emp_no }))
  const grade = grader.map((item) => ({ label: item.Student_Name, value: item.REG_NO, key: item.REG_NO }))

  const mannual = async () => {
    try {
      const response = await fetch(`http://${ip}/fyp/api/admin/AssigningManually`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        }, redirect: 'follow'
      })
      const res = await response.json()
      console.log(res)
      const teacherarray = res.Teachers
      // console.log(teacherarray)
      setteacher(teacherarray)
      const studentarray = res.LeftGraders
      setgrader(studentarray)
    } catch (error) {
      console.log('error while fetching', error)
    }
  }
  const assign = async () => {
    try {
      const record = JSON.stringify([
        {
          "Emp_no": teachselect,
          "REG_NO": gradeselect
        }
      ])
      const response = await fetch(`http://${ip}/fyp/api/admin/AssigningManually`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: record,
        redirect: 'follow'
      })
      console.log('Response status:', response.status);
      if (response.ok) {
        ToastAndroid.show('Grader Assigned successfully!', ToastAndroid.SHORT,);
        const res = await response.json()
        console.log(record)
        console.log(res)
      } else {
        ToastAndroid.show('Grader Not assigned.', ToastAndroid.SHORT);
      }

    } catch (error) {
      console.log('error while uploading', error)
    }
  }
  const GetSemcTeacher = async () => {
    try {
      const send = await fetch(`http://${ip}/fyp/api/admin/AssigningManuallyTeacher?teacherid=${teachselect}`, {
        method: 'GET',
        headers: { "Content-Type": "application/json" },
        redirect: 'follow'

      })
      const response = await send.json();
      console.log(response)
      setSemcTeacherResponse(response)


    } catch (error) {
      console.log("Error while Get Allocated semester", error)
    }
  }
  const GetSemcGrader = async () => {
    try {
      const send = await fetch(`http://${ip}/fyp/api/admin/AssigningManuallyStudent?studentid=${gradeselect}`, {
        method: 'GET',
        headers: { "Content-Type": "application/json" },
        redirect: 'follow'

      })
      const response = await send.json();
      console.log(response)
      setSemcGraderResponse(response)


    } catch (error) {
      console.log("Error while Get grader semester", error)
    }
  }
  function onSave() {
    ToastAndroid.show(
      'Grader Assigned Successfully!',
      ToastAndroid.SHORT
    );
  }
  const handleteacher = (index) => {
    const selectedteacher = teacher.find((item) => item.Emp_no === index)
    if (selectedteacher) {
      setteachselect(selectedteacher.Emp_no)
      console.log('Teacher no is', selectedteacher.Emp_no)
      GetSemcTeacher(selectedteacher.Emp_no)
    }
  }
  const handlegrader = (index) => {
    const selectedgrader = grader.find((item) => item.REG_NO === index)
    if (selectedgrader) {
      setgradeselect(selectedgrader.REG_NO)
      console.log('grader no is', selectedgrader.REG_NO)
      GetSemcGrader(selectedgrader.REG_NO)
    }
  }
  return (

    <View style={styles.contaner}>
      <View><Text style={styles.text1}>Select Teacher</Text></View>
      <View style={styles.dropdown}>
        <DropDownPicker
          placeholder='Select Teacher'
          open={open}
          value={value}
          items={teach}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setteacher}
          style={{ backgroundColor: "#CBEDD5", }}
          maxHeight={200}
          onChangeValue={handleteacher}
          keyExtractor={(item) => item.key}
        />
      </View>
      <View><Text style={styles.text2}>Select Grader</Text></View>
      <View style={styles.dropdown2}>
        <DropDownPicker
          placeholder='Select Grader'
          open={open2}
          value={value2}
          items={grade}
          setOpen={setOpen2}
          setValue={setValue2}
          setItems={setgrader}
          style={{ backgroundColor: "#CBEDD5", }}
          maxHeight={200}
          onChangeValue={handlegrader}
          keyExtractor={(item) => item.key}
        />
      </View>
      <View style={styles.Txt}><Text style={styles.txt2}>Teacher Allocated Semester: {semcTeacherResponse}</Text></View>
      <View style={styles.Txt2}><Text style={styles.txt2}>Grader Current Semester: {semcGraderResponse}</Text></View>
      <View>
        <TouchableOpacity style={styles.Btn} onPress={() => {
          assign()
        }}>
          <Text style={styles.Text}>Assign</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Manuaaly
const styles = StyleSheet.create({
  contaner: {
    backgroundColor: "#CBEDD5",
    flex: 1

  },
  dropdown: {
    marginTop: 10,
    width: 160,
    left: 10,
  },
  dropdown2: {
    marginTop: -49,
    width: 160,
    left: 185,
  },
  text1: {
    marginTop: 120,
    left: 22,
    fontFamily: 'Poppins-Regular',
    fontSize: 16
  }, text2: {
    marginTop: -86,
    left: 200,
    fontFamily: 'Poppins-Regular',
    fontSize: 16
  }, Btn: {
    width: 160,
    borderRadius: 30,
    height: 50,
    marginTop: 50,
    backgroundColor: "#3CCF4E",
    alignSelf: 'center'
  },
  Text: {
    fontSize: 25,
    fontFamily: "Poppins-Regular",
    textAlign: "center", paddingTop: 4
  },
  Txt: {
    marginTop: 220,
    left: 22,
   
  },
  txt2:{
    fontFamily: 'Poppins-Regular',
    fontSize: 14,borderWidth:1,height:40,padding:8,width:300,borderRadius:14
  },  Txt2: {
    marginTop: 20,
    left: 22,
   
  },
});