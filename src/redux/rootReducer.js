const initialState = { currentUser:[], users:[], seeds:[] };
export default (state = initialState, action )=>{
    switch (action.type) {
      case 'SET_USER':
        return {
          ...state,
          currentUser: action.user
        }
      case 'CLEAR_USER':
        return {
          ...state,
          currentUser: {}
        };
      case 'LOAD_USERS':
        return {
          ...state,
          users: action.user
        };
      case 'LOAD_SEEDS':
        return {
          ...state,
          seeds: action.seed
        };
      // case 'LOAD_TRICKS':
      //   return {
      //     ...state,
      //     tricks: action.trick
      //   };
      // case 'LOAD_ELEMENTS':
      //   return {
      //     ...state,
      //     elements: action.element
      //   }
      // case 'SET_POSITION':
      //   return {
      //     ...state,
      //     currentPosition: action.position
      //   }
      default:
        return state;
    }
  };
