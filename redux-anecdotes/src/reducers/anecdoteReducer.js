import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => ({
  content: anecdote,
  id: getId(),
  votes: 0,
});

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    updateAnecdote(state, action) {
      const updatedAnecdote = action.payload;
      const reducedState = state.map((anecdote) => {
        if (anecdote.id === updatedAnecdote.id) {
          return updatedAnecdote;
        }
        return anecdote;
      });
      return reducedState;
    },
    appendAnecdote(state, action) {
      const content = action.payload;
      const reducedState = state.concat(content);
      return reducedState;
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const initializeAnecdotes = createAsyncThunk(
  "anecdotes/initializeAnecdotes",
  async () => {
    const anecdotes = await anecdoteService.getAll();
    return anecdotes;
  }
);

export const addAnecdote = createAsyncThunk(
  "anecdotes/addAnecdote",
  async (content) => {
    const newAnecdote = await anecdoteService.createNew(asObject(content));
    return newAnecdote;
  }
);

export const voteAnecdote = (content) => async (dispatch) => {
  const anecdote = { ...content, votes: content.votes + 1 };
  const updatedAnecdote = await anecdoteService.update(anecdote);
  dispatch(updateAnecdote(updatedAnecdote));
};

export const { updateAnecdote, appendAnecdote, setAnecdotes } =
  anecdoteSlice.actions;
export default anecdoteSlice.reducer;
