import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeAnecdotes, voteAnecdote } from "../reducers/anecdoteReducer";
import { timedNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch();

  const anecdoteList = useSelector(({ anecdotes, filter }) => {
    return anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(filter.toLowerCase())
    );
  });

  console.log("Anecdote List:", anecdoteList);

  useEffect(() => {
    dispatch(initializeAnecdotes);
  }, [dispatch]);

  anecdoteList.sort((a, b) => (a.votes > b.votes ? -1 : 1));

  const handleVote = async (anecdote) => {
    dispatch(voteAnecdote(anecdote));
    dispatch(timedNotification(`Voted "${anecdote.content}"`, 5));
  };

  return (
    <div>
      {anecdoteList.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
