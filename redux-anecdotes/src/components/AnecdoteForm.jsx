import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";
import { timedNotification } from "../reducers/notificationReducer";
import anecdoteService from "../services/anecdotes";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const newAnecdote = async (event) => {
    event.preventDefault();
    const text = event.target.anecdote.value;
    const data = { content: text, votes: 0 };

    try {
      const anecdote = await anecdoteService.addNew(data);
      dispatch(addAnecdote(anecdote));
      event.target.anecdote.value = "";
      dispatch(timedNotification(`"${text}" created.`, 10));
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={newAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
