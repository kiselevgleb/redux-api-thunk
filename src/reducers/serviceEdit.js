import {
  EDIT_SERVICE_REQUEST,
  EDIT_SERVICE_FAILURE,
  EDIT_SERVICE_SUCCESS,
  CHANGE_SERVICE_FIELD_EDIT,
} from '../actions/actionTypes'

const initialState = {
  editItem: { id: '', name: '', price: '', content: '', },
  loading: false,
  error: null,
};

export default function serviceEditReducer(state = initialState, action) {
  switch (action.type) {
    case EDIT_SERVICE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case EDIT_SERVICE_FAILURE:
      const { error } = action.payload;
      return {
        ...state,
        loading: false,
        error,
      };
    case EDIT_SERVICE_SUCCESS:
      const { itemEd } = action.payload;
      return {
        ...state,
        editItem: itemEd,
        loading: false,
        error: null,
      };
    case CHANGE_SERVICE_FIELD_EDIT:
      const { name, value } = action.payload;
      const { editItem } = state;
      return {
        ...state,
        editItem: {
          ...editItem,
          [name]: value,
        }
      };
    default:
      return state;
  }
}