import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { changeServiceFieldEdit, addService } from '../actions/actionCreators';
import { editService } from '../actions/actionCreators';
import { NavLink } from 'react-router-dom'

function ServiceEdit(props) {
  const { editItem, loading, error } = useSelector(state => state.serviceEdit);
  const dispatch = useDispatch();
  let id = props.match.params.id;
  useEffect(() => {
    dispatch(editService(id));
  }, [dispatch, id])

  const handleChange = evt => {
    const { name, value } = evt.target;
    dispatch(changeServiceFieldEdit(name, value));
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    dispatch(addService(editItem.id, editItem.name, editItem.price, editItem.content, props));
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label htmlFor="name">Название</label>
      <input className="inp" id="name" name='name' value={editItem.name} onChange={handleChange} />
      <label htmlFor="price">Стоимость</label>
      <input className="inp" id="price" name='price' value={editItem.price} onChange={handleChange} />
      <label htmlFor="content">Описание</label>
      <input className="inp" id="content" name='content' value={editItem.content} onChange={handleChange} />
      <button className="but" type='submit' disabled={loading}>Сохранить</button>
      <NavLink to={`/services`}><button className="but" disabled={loading}>Отмена</button></NavLink>
      {error && <p className="error">Произошла ошибка!</p>}
    </form>
  );
}

export default ServiceEdit;