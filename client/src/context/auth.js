import React, { useReducer, createContext } from 'react';
import jwtDecode from 'jwt-decode';

// initial state of user
const initialState = { 
  user: null,
}

// if the token is valid keep the user logged in,
// else log user out
if(localStorage.getItem('jwtToken')){
  const decodedToken = jwtDecode(localStorage.getItem('jwtToken'));

  console.log('decoded token : ',decodedToken);

  if(decodedToken.exp * 1000 < Date.now()){
    localStorage.removeItem('jwtToken');
  }else {
    initialState.user = decodedToken;
  }
}

// Reducer defination
const AuthContext = createContext({
  user: null,
  login: (userData) => {},
  logout: () => {}
});

// this reducer listen's to dispatch
const authReducer = (state, action) => {
  switch(action.type){
    case 'LOGIN':
      return {
        ...state,
        user: action.payload
      }
    
    case 'LOGOUT':
      return {
        ...state,
        user: null
      }

    default:
      return state;
  }
}

const AuthProvider = (props) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (userData) => {
    localStorage.setItem('jwtToken', userData.token);
    dispatch({
      type: 'LOGIN',
      payload: userData
    });
  };
 
  const logout = () => {
    localStorage.removeItem('jwtToken');
    dispatch({ type: 'LOGOUT'});
  }

  return (
    <AuthContext.Provider 
      value={{ user: state.user, login, logout }}
      {...props}
    />
  )
}

// AuthContext: to access our context
// AuthProvider: to provide all the components access to the context
export { AuthContext, AuthProvider };