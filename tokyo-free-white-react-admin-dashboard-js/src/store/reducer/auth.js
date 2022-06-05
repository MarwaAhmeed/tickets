let useState;
if(window.localStorage.getItem("auth")){
  useState=JSON.parse(window.localStorage.getItem("auth"))
}
else{
  useState=null
}
export default function authReducer(state = useState,action) {
    switch (action.type) {
      case "LOGGED_IN_USER":
        return {...state, ...action.payload };
      case "LOGOUT":
        return action.payload;
      default:
        return state;
    }
  }