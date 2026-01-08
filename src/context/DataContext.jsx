import createDataContext from './createDataContext';

const defaultState = {
  showOverlay : false,
  overlayComponent : null,
};

const dataReducer = (state,action) => {
  switch(action.type) {
    case 'setOverlayComponent':
       return {...state,overlayComponent:action.payload};
    case 'setShowOverlay':
      return {...state,showOverlay:action.payload};
    default:
      return defaultState;
  }
};

//Setters


const setOverlayComponent = (dispatch) => (data) => {
  dispatch({type:'setOverlayComponent', payload:data});
}
 
const setShowOverlay = (dispatch) => (data) => {
  dispatch({type:'setShowOverlay', payload:data});
}


 
export const {Provider, Context} = createDataContext (
    dataReducer,
    { setShowOverlay,setOverlayComponent},
    {...defaultState}
);