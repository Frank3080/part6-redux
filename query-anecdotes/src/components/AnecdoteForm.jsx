import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAnecdote } from "../requests";
import { useNotificationDispatch } from "../notificationContext";

const AnecdoteForm = () => {
  const dispatch = useNotificationDispatch();
  const queryClient = useQueryClient();

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (anecdote) => {
      const currentAnecdotes = queryClient.getQueryData(["anecdotes"]) || [];
      queryClient.setQueryData(["anecdotes"], [...currentAnecdotes, anecdote]);
      queryClient.invalidateQueries(["anecdotes"]);
      dispatch({ type: "set", payload: `"${anecdote.content}" Created.` });
      setTimeout(() => dispatch({ type: "clear" }), 5000);
    },
    onError: (err) => {
      console.log(err);
      dispatch({
        type: "set",
        payload: "An error has ocurred creating that anecdote.",
      });
      setTimeout(() => dispatch({ type: "clear" }), 5000);
    },
  });

  const onCreate = (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;

    if (content.length < 5) {
      dispatch({
        type: "set",
        payload: "Anecdote content must be at least 5 characters long.",
      });
      setTimeout(() => dispatch({ type: "clear" }), 5000);
      return;
    }

    e.target.anecdote.value = "";
    newAnecdoteMutation.mutate({ content, votes: 0 });
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
