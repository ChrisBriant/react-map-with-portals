import createDataContext from './createDataContext';

const defaultState = {
  profile : {},
  signInStatus : false,
  alias : null,
  networkError : false,
};

const authReducer = (state,action) => {
  switch(action.type) {
    case 'setSignInStatus':
      return {...state,siginInStatus:action.payload};
    case 'setAlias':
      return {...state,alias:action.payload};
    case 'setProfile':
      return {...state,profile:action.payload};
    case 'setNetworkError':
      return {...state,networkError:action.payload}
    default:
      return defaultState;
  }
};

//Setters


const setSignInStatus = (dispatch) => (data) => {
  dispatch({type:'setSignInStatus', payload:data});
}

const setAlias = (dispatch) => (data) => {
  dispatch({type:'setAlias', payload:data});
}

const setProfile = (dispatch) => (data) => {
  dispatch({type:'setProfile', payload:data});
}


const setNetworkError = (dispatch) => (data) => {
  dispatch({type:'setNetworkError', payload:data})
}

 
export const {Provider, Context} = createDataContext (
    authReducer,
    { setSignInStatus,setAlias,setProfile, setNetworkError,},
    {...defaultState}
);