const initialState = { currentUser:[], users:[], seeds:[], gardens:[], plants:[], plantImages:[] };
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
      case 'LOAD_GARDENS':
        return {
          ...state,
          gardens: action.garden
        };
      case 'LOAD_PLANTS':
        return {
          ...state,
          plants: action.plant
        };
      case 'LOAD_PLANT_IMAGES':
        return {
          ...state,
          plantImages: action.plantImage
        };
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
