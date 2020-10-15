import {
  CHANGE_SERVICE_FIELD,
  CHANGE_SERVICE_FIELD_EDIT,
  FETCH_SERVICES_REQUEST,
  FETCH_SERVICES_FAILURE,
  FETCH_SERVICES_SUCCESS,
  ADD_SERVICE_REQUEST,
  ADD_SERVICE_FAILURE,
  ADD_SERVICE_SUCCESS,
  REMOVE_SERVICE_REQUEST,
  REMOVE_SERVICE_FAILURE,
  REMOVE_SERVICE_SUCCESS,
  EDIT_SERVICE_REQUEST,
  EDIT_SERVICE_FAILURE,
  EDIT_SERVICE_SUCCESS,
} from './actionTypes';

export const fetchServicesRequest = () => ({
  type: FETCH_SERVICES_REQUEST,
});

export const fetchServicesFailure = error => ({
  type: FETCH_SERVICES_FAILURE,
  payload: {
    error,
  },
});

export const fetchServicesSuccess = items => ({
  type: FETCH_SERVICES_SUCCESS,
  payload: {
    items,
  },
});
export const editServiceRequest = () => ({
  type: EDIT_SERVICE_REQUEST,
});

export const editServiceFailure = error => ({
  type: EDIT_SERVICE_FAILURE,
  payload: {
    error,
  },
});

export const editServiceSuccess = itemEd => ({
  type: EDIT_SERVICE_SUCCESS,
  payload: {
    itemEd,
  },
});


export const addServiceRequest = (name, price) => ({
  type: ADD_SERVICE_REQUEST,
  payload: {
    name,
    price,
  },
})

export const addServiceFailure = error => ({
  type: ADD_SERVICE_FAILURE,
  payload: {
    error,
  },
});

export const addServiceSuccess = () => ({
  type: ADD_SERVICE_SUCCESS,
});

export const changeServiceField = (name, value) => ({
  type: CHANGE_SERVICE_FIELD,
  payload: {
    name,
    value,
  },
});

export const changeServiceFieldEdit = (name, value) => ({
  type: CHANGE_SERVICE_FIELD_EDIT,
  payload: {
    name,
    value,
  },
});
export const removeServiceRequest = id => ({
  type: REMOVE_SERVICE_REQUEST,
  payload: {
    id,
  },
});
export const removeServiceFailure = errorRem => ({
  type: REMOVE_SERVICE_FAILURE,
  payload: {
    errorRem,
  },
});
export const removeServiceSuccess = () => ({
  type: REMOVE_SERVICE_SUCCESS,
});


export const fetchServices = () => async dispatch => {
  dispatch(fetchServicesRequest());
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}`)
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    console.log(data);
    dispatch(fetchServicesSuccess(data));
  } catch (e) {
    dispatch(fetchServicesFailure(e.message));
  }
}

export const addService = (id, name, price, content, props) => async (dispatch) => {
  dispatch(addServiceRequest());
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, name, price, content }),
    })
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    dispatch(addServiceSuccess());
    props.history.push('/services');
  } catch (e) {
    dispatch(addServiceFailure(e.message));
  }
  dispatch(fetchServices());
}

export const delService = (id) => async (dispatch) => {
  dispatch(removeServiceRequest());
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    dispatch(removeServiceSuccess());
  } catch (e) {
    dispatch(removeServiceFailure(e.message));
  }
  dispatch(fetchServices());
}

export const editService = (id) => async (dispatch) => {
  dispatch(editServiceRequest());
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/${id}`)
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    console.log(data);
    dispatch(editServiceSuccess(data));
  } catch (e) {
    dispatch(editServiceFailure(e.message));
  }
}