import AnecdoteList from "./components/AnecdoteList";
import AnecdoteForm from "./components/AnecdoteForm";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import { useDispatch } from "react-redux";
import anecdoteService from "./services/anecdotes";
import { setAnecdotes } from "./reducers/anecdoteReducer";
import { useEffect } from "react";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    anecdoteService
      .getAll()
      .then((anecdotes) => dispatch(setAnecdotes(anecdotes)));
  }, [dispatch]);

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
