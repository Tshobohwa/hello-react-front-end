import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMessage } from '../redux/slices/messagesSlice';

const Greeting = () => {
  const dispatch = useDispatch();
  const { message, pending } = useSelector((store) => store.messages);
  useEffect(() => {
    dispatch(getMessage());
  }, [dispatch]);
  return (
    <div>
      <h1>Random Greeting</h1>
      {pending ? <p>Loading ...</p> : <p>{message}</p>}
    </div>
  );
};

export default Greeting;
