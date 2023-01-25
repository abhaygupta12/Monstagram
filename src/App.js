import React, { useEffect, createContext, useReducer, useContext } from "react";
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import CreatePost from "./pages/CreatePost";
import './App.css';
import { reducer, initialState } from './reducer/userReducer';
import OtherUserProfile from "./pages/OtherUserProfile";
import Postsfromfollowing from "./pages/Postsfromfollowing";

export const UserContext = createContext();

const CustomRouting = () => {
  

  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      dispatch({ type: "USER", payload: userInfo });
      //history.push('/');//user logged in so redirect to home
    } else {
      history.push('/login');
    }
  }, []);//called when component mounts and get called only once

  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route exact path="/profile">
        <Profile />
      </Route>
      <Route path="/profile/:userId">
        <OtherUserProfile />
      </Route>
      <Route path="/create-post">
        <CreatePost />
      </Route>
      <Route path="/postsfromfollowing">
        <Postsfromfollowing />
      </Route>
    </Switch>
  )
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ state: state, dispatch: dispatch }}>
      <BrowserRouter>
        <NavBar />
        <CustomRouting />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;