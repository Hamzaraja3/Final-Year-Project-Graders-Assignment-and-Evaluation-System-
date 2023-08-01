import { View, Text } from 'react-native'
import React,{useEffect} from 'react'
import SplashScreen from 'react-native-splash-screen';
import Navigations from './Navigation/Navigations';
import Grader_assign from './Screens/admin/Grader_assign';
import ViewEvaluation from './Screens/admin/ViewEvaluation';
import Tevaluate from './Screens/teacher/Tevaluate';
import Dashboard from './Screens/admin/Dashboard';
import Sdashboard from'./Screens/student/Sdashboard';
import Sevaluate from'./Screens/student/Sevaluate';
import ViewTeacher from './Screens/admin/ViewTeacher';
import Viewteacher2 from './Screens/admin/Viewteacher2';
import Viewstudent from './Screens/admin/Viewstudent';
import Viewstudent2 from './Screens/admin/Viewstudent2';
import Admin from './Screens/admin/Admin';
import Assigned from './Screens/admin/Assigned';

const App = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      SplashScreen.hide();
    }, 3000);
    return () => clearTimeout(timer);
  }, []);
  return (

    // <Dashboard/>
     <Navigations/>
  // <ViewEvaluation/>
//  <Tdashboard/>
  // <Tevaluate/>
  // <Grader_assign/>
  // <Tview/>
  // <Sdashboard/>
  // <Sevaluate/>
  // <ViewTeacher/>
  // <Viewteacher2/>
  //<Admin/>
 // <Assigned/>
  )
}

export default App