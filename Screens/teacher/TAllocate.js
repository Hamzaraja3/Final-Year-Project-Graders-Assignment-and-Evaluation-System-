import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ToastAndroid, FlatList, RefreshControl } from 'react-native';
import { useRoute } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import ip from '../../Components/fonts/IP';
const TAllocate = ({ navigation }) => {
  const route = useRoute();
  const id = route.params.Employee;
  const semester = route.params.semester;
  const Grader_id = route.params.Grader;
  const [data, setdata] = useState('')
  const [status, setstatus] = useState({})
  const [ID, setID] = useState('')
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    await Check_Allocation_status();
    setRefreshing(false);
  };
  useEffect(() => {
    onRefresh()
    Allocate_Grader()
    Check_Allocation_status()
  }, [Grader_id])
  const Allocate_Grader = async () => {
    try {
      const send = await fetch(`http://${ip}/fyp/api/Teacher/AllocateGrader?teacherid=${id}&semester=${semester}`, {
        method: 'GET',
        redirect: 'follow'
      })
      const result = await send.json();
      console.log(result);
      setdata(result);
      // const A_id = result[0].Allocate_ID
      // setID(A_id);
      // console.log (A_id)
    }
    catch (error) {
      console.log("Error While Allocate Grader :", error)
    }
  }
  const save_Allocation = async (Allocate_ID) => {
    try {
      const Send = await fetch(`http://${ip}/fyp/api/Teacher/SaveAllocation?graderid=${Grader_id}&allocationid=${Allocate_ID}`, {
        method: 'GET',
        redirect: 'follow'
      })
      const response = await Send.json()
      console.log(response)
      ToastAndroid.show('Grader Allocated Successfully!', ToastAndroid.SHORT);
    }
    catch (error) {
      console.log("Error While Allocating Section", error)
    }
  }
  const Check_Allocation_status = async () => {
    try {
      const updateStatus = { ...status };
      for (const course of data) {
        const Send = await fetch(`http://${ip}/fyp/api/Teacher/checkAllocation?graderid=${Grader_id}&allocationid=${course.Allocate_ID}`, {
          method: 'GET',
          redirect: 'follow'
        });
        const response = await Send.json();
        console.log(response);
        const isAllocated = response === 'True';
        updateStatus[course.Allocate_ID] = isAllocated;
      }
      setstatus(updateStatus);
    } catch (error) {
      console.log("Error While Checking", error);
    }
  };

  const ITEMS = ({ item }) => {
    const isAllocated = status[item.Allocate_ID];

    return (
      <View style={styles.paragraph}>
        <Text style={styles.itemText}>Course Title: {item.Title}</Text>
        <Text style={styles.itemText}>Discipline: {item.DISCIPLINE}</Text>
        <Text style={styles.itemText}>Semester & Section: {item.SemC}{item.SECTION}</Text>
        <TouchableOpacity onPress={() => { save_Allocation(item.Allocate_ID) }} disabled={isAllocated}>
          <Text style={[styles.btn, { opacity: isAllocated ? 0.6 : 1 }]}>
            {isAllocated ? 'Already Allocated' : 'Allocate Section'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.list}>
        <FlatList data={data}
          keyExtractor={(item) => item.Allocate_ID.toString()}
          ListHeaderComponent={() => (
            <View style={styles.header}>
              <Text style={styles.text1}>{route.params.name}</Text>
              <Text style={styles.text2}>{route.params.regno}</Text>
            </View>
          )}

          ListFooterComponent={() => (
            <View></View>
          )} renderItem={ITEMS}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh}></RefreshControl>}
        />

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CBEDD5',
  }, header: {
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
  Btn: {
    width: 160,
    borderRadius: 30,
    height: 50,
    backgroundColor: "#3CCF4E",
    alignSelf: 'center'
  },
  btn: {
    left: 175, backgroundColor: '#80ED99', width: 150, borderRadius: 18, textAlign: 'center', fontSize: 15, fontFamily: 'Poppins-Medium', height: 40
    , padding: 6, top: -5
  },
  paragraph: {
    marginTop: 14,
    margin: 8,
    padding: 15,
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

});

export default TAllocate;
