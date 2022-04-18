import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import {PrivateRoute,AdminRoute} from './utils/PrivateRoute'
import { AuthProvider } from './context/AuthContext'

import HomePage from './pages/user/HomePage'
import LoginPage from './pages/user/LoginPage'
import SignUp from './pages/user/SignUp';
import AdminLogin from './pages/admin/AdminLogin';
import AdminHome from './pages/admin/AdminHome';
import AdminCreate from './pages/admin/AdminCreate'
import AdminEdit from './pages/admin/AdminEdit'

function App() {
  return (
    <div className="App container-fluid">
      <Router>
        <AuthProvider>
          <PrivateRoute component={HomePage} path="/" exact/>
          <Route component={LoginPage} path="/login"/>
          <Route component={SignUp} path="/signup"/>
          <Route component={AdminLogin} path="/admin/login"/>
          <AdminRoute component={AdminHome} path="/admin/home"/>
          <Route component={AdminCreate} path="/admin/create"/>
          <Route component={AdminEdit} path="/admin/edit"/>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
