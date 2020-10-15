import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { delService, fetchServices } from '../actions/actionCreators';
import Loader from 'react-loader';
import { NavLink } from 'react-router-dom'

function ServiceList() {
  const { items, loading, error } = useSelector(state => state.serviceList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch])

  const handleRemove = id => {
    dispatch(delService(id));
  }

  if (loading) {
    return <Loader></Loader>;
  }

  if (error) {
    return <p className="error">Произошла ошибка!</p>;
  }

  return (
    <ul to='/services'>
      {items.map(o => (
        <li className="list" key={o.id}>
          {o.name} {o.price}
          <button className="but" onClick={() => handleRemove(o.id)}>✕</button>
          <NavLink to={`/services/${o.id}`}><button className="but" >&#9998;</button></NavLink>
        </li>
      ))}
    </ul>
  );
}

export default ServiceList