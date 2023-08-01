import { View, Text } from 'react-native'
import React from 'react'
import Admin from '../Screens/admin/Admin';
import Dashboard from '../Screens/admin/Dashboard';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Grader_assign from '../Screens/admin/Grader_assign';
import ViewEvaluation from '../Screens/admin/ViewEvaluation';
import Viewstudent from '../Screens/admin/Viewstudent';
import Viewstudent2 from '../Screens/admin/Viewstudent2';
import ViewTeacher from '../Screens/admin/ViewTeacher';
import Viewteacher2 from '../Screens/admin/Viewteacher2';
import Sdashboard from '../Screens/student/Sdashboard';
import Sevaluate from '../Screens/student/Sevaluate';
import Tevaluate from '../Screens/teacher/Tevaluate';
import Assigned from '../Screens/admin/Assigned';
import Manuaaly from '../Screens/admin/Manuaaly';
import Grid from '../Screens/admin/Grid';
import Needbase from '../Screens/admin/Needbase';
import TDASHBOARD from '../Screens/teacher/TDASHBOARD';
import TAllocate from '../Screens/teacher/TAllocate';
import Request from '../Screens/teacher/Request';
import ViewAllocation from '../Screens/teacher/ViewAllocation';
import Rule from '../Screens/admin/Rule';
import ViewRequst from '../Screens/admin/ViewRequst';
import ViewAllocations from '../Screens/admin/ViewAllocations';
const Stack = createNativeStackNavigator();
const Navigations = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen name='Admin' component={Admin}
          options={{
            headerShown: false

          }}
        >


        </Stack.Screen>


        <Stack.Screen name='Dashboard' component={Dashboard}
          options={{
            headerTintColor: '#D4F6CC',
            headerStyle: {
              backgroundColor: '#519C6F',
            },
            headerTitleStyle: { fontFamily: 'Poppins-SemiBold', fontSize: 20, },
            headerTitleAlign: "center",
            headerTransparent: true
          }}

        ></Stack.Screen>
        <Stack.Screen name='Assign Grader' component={Grader_assign}
          options={{
            headerTintColor: '#D4F6CC',
            headerStyle: {
              backgroundColor: '#519C6F',
            },
            headerTitleStyle: { fontFamily: 'Poppins-SemiBold', fontSize: 20, },
            headerTitleAlign: "center",
            headerTransparent: true
          }}
        ></Stack.Screen>
        <Stack.Screen name='View Evaluation' component={ViewEvaluation}
          options={{
            headerTintColor: '#D4F6CC',
            headerStyle: {
              backgroundColor: '#519C6F',
            },
            headerTitleStyle: { fontFamily: 'Poppins-SemiBold', fontSize: 20, },
            headerTitleAlign: "center",
            headerTransparent: true
          }}
        ></Stack.Screen>
         <Stack.Screen name='Graders List' component={Assigned}
          options={{
            headerTintColor: '#D4F6CC',
            headerStyle: {
              backgroundColor: '#519C6F',
            },
            headerTitleStyle: { fontFamily: 'Poppins-SemiBold', fontSize: 20, },
            headerTitleAlign: "center",
            headerTransparent: true
          }}
        ></Stack.Screen>
         <Stack.Screen name='Student' component={Viewstudent}
          options={{
            headerTintColor: '#D4F6CC',
            headerStyle: {
              backgroundColor: '#519C6F',
            },
            headerTitleStyle: { fontFamily: 'Poppins-SemiBold', fontSize: 20, },
            headerTitleAlign: "center",
            headerTransparent: true
          }}
        ></Stack.Screen>
         <Stack.Screen name='Grader Evaluation' component={Viewstudent2}
          options={{
            headerTintColor: '#D4F6CC',
            headerStyle: {
              backgroundColor: '#519C6F',
            },
            headerTitleStyle: { fontFamily: 'Poppins-SemiBold', fontSize: 20, },
            headerTitleAlign: "center",
            headerTransparent: true
          }}
        ></Stack.Screen>
       <Stack.Screen name='Teacher' component={ViewTeacher}
          options={{
            headerTintColor: '#D4F6CC',
            headerStyle: {
              backgroundColor: '#519C6F',
            },
            headerTitleStyle: { fontFamily: 'Poppins-SemiBold', fontSize: 20, },
            headerTitleAlign: "center",
            headerTransparent: true
          }}
        ></Stack.Screen>
         <Stack.Screen name='Graders Evaluation' component={Viewteacher2}
          options={{
            headerTintColor: '#D4F6CC',
            headerStyle: {
              backgroundColor: '#519C6F',
            },
            headerTitleStyle: { fontFamily: 'Poppins-SemiBold', fontSize: 20, },
            headerTitleAlign: "center",
            headerTransparent: true
          }}
        ></Stack.Screen>
         <Stack.Screen name='Student Dashboard' component={Sdashboard}
          options={{
            headerTintColor: '#D4F6CC',
            headerStyle: {
              backgroundColor: '#519C6F',
            },
            headerTitleStyle: { fontFamily: 'Poppins-SemiBold', fontSize: 20, },
            headerTitleAlign: "center",
            headerTransparent: true
          }}
        ></Stack.Screen>
         <Stack.Screen name='Evaluate Grader' component={Sevaluate}
          options={{
            headerTintColor: '#D4F6CC',
            headerStyle: {
              backgroundColor: '#519C6F',
            },
            headerTitleStyle: { fontFamily: 'Poppins-SemiBold', fontSize: 20, },
            headerTitleAlign: "center",
            headerTransparent: true
          }}
        ></Stack.Screen>
        <Stack.Screen name='Teacher Dashboard' component={TDASHBOARD}
          options={{
            headerTintColor: '#D4F6CC',
            headerStyle: {
              backgroundColor: '#519C6F',
            },
            headerTitleStyle: { fontFamily: 'Poppins-SemiBold', fontSize: 20, },
            headerTitleAlign: "center",
            headerTransparent: true
          }}
        ></Stack.Screen>
         <Stack.Screen name='Evaluate Graders' component={Tevaluate}
          options={{
            headerTintColor: '#D4F6CC',
            headerStyle: {
              backgroundColor: '#519C6F',
            },
            headerTitleStyle: { fontFamily: 'Poppins-SemiBold', fontSize: 20, },
            headerTitleAlign: "center",
            headerTransparent: true
          }}
        ></Stack.Screen>
         <Stack.Screen name='Assign Manually' component={Manuaaly}
          options={{
            headerTintColor: '#D4F6CC',
            headerStyle: {
              backgroundColor: '#519C6F',
            },
            headerTitleStyle: { fontFamily: 'Poppins-SemiBold', fontSize: 20, },
            headerTitleAlign: "center",
            headerTransparent: true
          }}
        ></Stack.Screen>
          <Stack.Screen name='Equivalent Courses' component={Grid}
          options={{
            headerTintColor: '#D4F6CC',
            headerStyle: {
              backgroundColor: '#519C6F',
            },
            headerTitleStyle: { fontFamily: 'Poppins-SemiBold', fontSize: 20, },
            headerTitleAlign: "center",
            headerTransparent: true
          }}
        ></Stack.Screen>
           <Stack.Screen name='Needbase Student' component={Needbase}
          options={{
            headerTintColor: '#D4F6CC',
            headerStyle: {
              backgroundColor: '#519C6F',
            },
            headerTitleStyle: { fontFamily: 'Poppins-SemiBold', fontSize: 20, },
            headerTitleAlign: "center",
            headerTransparent: true
          }}
        ></Stack.Screen>
        <Stack.Screen name='Allocate Now' component={TAllocate}
          options={{
            headerTintColor: '#D4F6CC',
            headerStyle: {
              backgroundColor: '#519C6F',
            },
            headerTitleStyle: { fontFamily: 'Poppins-SemiBold', fontSize: 20, },
            headerTitleAlign: "center",
            headerTransparent: true
          }}
        ></Stack.Screen>
        <Stack.Screen name='Request Grader' component={Request}
          options={{
            headerTintColor: '#D4F6CC',
            headerStyle: {
              backgroundColor: '#519C6F',
            },
            headerTitleStyle: { fontFamily: 'Poppins-SemiBold', fontSize: 20, },
            headerTitleAlign: "center",
            headerTransparent: true
          }}
        ></Stack.Screen>
        <Stack.Screen name='View Allocation' component={ViewAllocation}
          options={{
            headerTintColor: '#D4F6CC',
            headerStyle: {
              backgroundColor: '#519C6F',
            },
            headerTitleStyle: { fontFamily: 'Poppins-SemiBold', fontSize: 20, },
            headerTitleAlign: "center",
            headerTransparent: true
          }}
        ></Stack.Screen>
        <Stack.Screen name='Rules' component={Rule}
          options={{
            headerTintColor: '#D4F6CC',
            headerStyle: {
              backgroundColor: '#519C6F',
            },
            headerTitleStyle: { fontFamily: 'Poppins-SemiBold', fontSize: 20, },
            headerTitleAlign: "center",
            headerTransparent: true
          }}
        ></Stack.Screen>
        <Stack.Screen name='View Request' component={ViewRequst}
          options={{
            headerTintColor: '#D4F6CC',
            headerStyle: {
              backgroundColor: '#519C6F',
            },
            headerTitleStyle: { fontFamily: 'Poppins-SemiBold', fontSize: 20, },
            headerTitleAlign: "center",
            headerTransparent: true
          }}
        ></Stack.Screen>
         <Stack.Screen name='View Allocations' component={ViewAllocations}
          options={{
            headerTintColor: '#D4F6CC',
            headerStyle: {
              backgroundColor: '#519C6F',
            },
            headerTitleStyle: { fontFamily: 'Poppins-SemiBold', fontSize: 20, },
            headerTitleAlign: "center",
            headerTransparent: true
          }}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigations