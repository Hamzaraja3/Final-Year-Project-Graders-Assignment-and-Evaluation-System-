import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, ToastAndroid, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Datable from '../../Components/fonts/Datable';
import ip from '../../Components/fonts/IP';
const Grid = ({ navigation }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);
  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState(null);
  const [items2, setItems2] = useState([]);
  const [select, setselect] = useState('');
  const [select2, setselect2] = useState('');
  // const courses = items.map((item) => ({ label: item.Title, value: item.Course_No }))
  useEffect(() => {
    GetCourses();
  }, []);
  const GetCourses = async () => {
    try {
      const response = await fetch(`http://${ip}/fyp/api/Admin/GetCourses`);
      const data = await response.json();
      console.log(data)
      setItems(data);
      setItems2(data);
    } catch (error) {
      console.log('Error: ', error);
    }
  };
  const coursemap=async()=>{
    try{
      const response=await fetch(`http://${ip}/fyp/api/admin/Map?MainCourse=${select}&MapCourse=${select2}`, {
          method: 'GET',
          redirect: 'follow'
        })
        console.log('Response status:', response.status);
        if (response.ok) {
          ToastAndroid.show('Course Mapped!!', ToastAndroid.SHORT,);
          const res=await response.json();
          console.log(res)
          navigation.goBack();
        } else {
          ToastAndroid.show('Course not mapped.', ToastAndroid.SHORT);
        }
    }
    catch(error){
      console.log("Error in mapping",error)
    }
  }
  const handlecoursechange = (index) => {
    const selectedcourse = items.find((item) => item.Course_No === index)
    if (selectedcourse) {
      setselect(selectedcourse.Course_No)
      console.log("old selected course", selectedcourse.Course_No)
      // setItems2(items.filter((item) => item.Course_No !== index));
    }
  }
  const handlecoursechange2 = (index) => {
    const selectedcourse2 = items2.find((item) => item.Course_No === index)
    if (selectedcourse2) {
      setselect2(selectedcourse2.Course_No)
      console.log("New selected course", selectedcourse2.Course_No)
    }
  }
  const dropdownItems = items
    .filter((item) => item.Course_No !== select)
    .map((item) => ({ label: item.Title, value: item.Course_No }));
  const onpresshandler = () => {
    coursemap()
    ToastAndroid.show('Course mapped!!.', ToastAndroid.SHORT);
  }
  
  return (
    <View style={styles.contaner}>
      <View style={styles.dropdown}>
        <DropDownPicker
          placeholder='Old Course'
          open={open}
          value={value}
          items={dropdownItems}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          style={{
            backgroundColor: '#CBEDD5',
          }}
          maxHeight={200}
          onChangeValue={handlecoursechange}
        />
      </View>
      <View style={styles.dropdown2}>
        <DropDownPicker
          placeholder='New Course'
          open={open2}
          value={value2}
          items={dropdownItems}
          setOpen={setOpen2}
          setValue={setValue2}
          setItems={setItems2}
          style={{
            backgroundColor: '#CBEDD5',
          }}
          maxHeight={200}
          onChangeValue={handlecoursechange2}
          disabled={!select}
        />
      </View>
      <View style={styles.btn}>
        <TouchableOpacity onPress={() => { onpresshandler() }}>
          <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 20 }}>Submit</Text>
        </TouchableOpacity>
      </View>

      <View>

        <Datable />
      </View>

    </View>
  );
};

export default Grid;

const styles = StyleSheet.create({
  contaner: {
    backgroundColor: "#CBEDD5", flex: 1,

  },
  dropdown: {
    marginTop: 80,
    width: 160,
    left: 10,
    alignItems: 'center'
  },
  btn: {
    marginTop: 140, alignItems: 'center',
    backgroundColor: "#54B435",
    marginLeft: 75, marginRight: 90,
    justifyContent: 'center',
    width: 180,
    height: 50,
    borderRadius: 15,
  },
  scrollView: {
    flexGrow: 1,
    padding: 15,
  },
  dropdown2: {
    marginTop: 20,
    alignItems: 'center',
    width: 160, left: 185, top: -70
  },
})