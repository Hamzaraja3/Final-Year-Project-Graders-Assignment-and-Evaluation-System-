import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { DataTable } from 'react-native-paper';
import ip from './IP';
const Datable = () => {
  const [mapData, setMapData] = useState([]);
  
  useEffect(() => {
    GetMapCourse();
  }, []);
  
  const GetMapCourse = async () => {
    try {
      const send = await fetch(`http://${ip}/fyp/api/Admin/GetMap`, {
        method: 'GET',
        redirect: 'follow',
      });
      
      const response = await send.json();
      console.log(response);
      setMapData(response);
    } catch (error) {
      console.log('Error while fetching MapCourses', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.bogus}></View>
      <ScrollView horizontal>
        <DataTable style={styles.datatable}>
          <DataTable.Header style={styles.tableHeader}>
            <DataTable.Title>Course No</DataTable.Title>
            <DataTable.Title>   C_Name</DataTable.Title>
            <DataTable.Title>   New Course</DataTable.Title>
            <DataTable.Title>          C_Name</DataTable.Title>
          </DataTable.Header>
          <ScrollView contentContainerStyle={styles.scrollView}>
            {mapData.map((rowData, index) => (
              <DataTable.Row key={index} style={styles.tableRow}>
                <DataTable.Cell style={styles.tableCell}>{rowData.Course_No}</DataTable.Cell>
                <DataTable.Cell style={styles.tableCell}>{rowData.Course_Title}</DataTable.Cell>
                <DataTable.Cell style={styles.tableCell}>{rowData.Map_Course_No}</DataTable.Cell>
                <DataTable.Cell style={styles.tableCell}>{rowData.Map_Course_Title}</DataTable.Cell>
              </DataTable.Row>
            ))}
          </ScrollView>
        </DataTable>
      </ScrollView>
    </View>
  );
};

export default Datable;

const styles = StyleSheet.create({
  container: {
    padding: 2,
    marginTop: 20,
  },
  bogus: {
    padding: 5,
  },
  datatable: {
    borderWidth: 1,
    borderColor: 'black',
    height: 350,
    width: 400,
  },
  tableHeader: {
    backgroundColor: '#DCDCDC',
    width: 350,
    borderRadius: 14,left:15
  },
  scrollView: {
    flexDirection: 'column',
  },
  tableRow: {
    borderColor: 'black',
    borderWidth: 1,
  },
  tableCell: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
  },
});
