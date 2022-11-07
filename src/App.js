import Home from "./pages/Home";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import Register from "./pages/Register";
import Login from "./pages/Login";
import {useSelector} from 'react-redux'
import Navbar from "./components/Navbar";
import EditUser from "./pages/EditUser";
import Post from "./pages/Post";
import ProfileDetail from './pages/ProfileDetail'
import Notifications from "./pages/Notifications";
import Friends from "./pages/Friends";
import Chat from "./pages/Chat";
import SinglePost from "./pages/SinglePost";
import BlockedUsers from "./pages/BlockedUsers";
function App() {
  const {user, isLoading} = useSelector((state)=>state.auth)
  
  const ProtectedRoute = ({children}) =>{

    if(!user){
      return <Login />
    }

    return children
  }
  return (
   <>
  
   <BrowserRouter> 
   <Navbar />
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute> } />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute> } />
        <Route path="/search" element={<ProtectedRoute><Search /></ProtectedRoute> } />
        <Route path="/user/:id" element={<ProtectedRoute><EditUser /></ProtectedRoute> } />
        <Route path="/post" element={<ProtectedRoute><Post /></ProtectedRoute> } />
        <Route path="/profile/:id" element={<ProtectedRoute><ProfileDetail /></ProtectedRoute> } />
        <Route path="/notification" element={<ProtectedRoute><Notifications /></ProtectedRoute> } />
        <Route path="/friends/:id" element={<ProtectedRoute><Friends /></ProtectedRoute> } />
        <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute> } />
        <Route path="/post/:id" element={<ProtectedRoute><SinglePost /></ProtectedRoute> } />
        <Route path="/blocked-users" element={<ProtectedRoute><BlockedUsers /></ProtectedRoute> } />
        <Route path="/register" element={ <Register />} />
        <Route path="/login" element={ <Login />} />
        </Routes>

   </BrowserRouter>
   
  
   </>
  );
}

export default App;
