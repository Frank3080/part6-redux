import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAnecdotes, updateAnecdote } from "./requests";

const App = () => {
  const queryClient = useQueryClient();

  const handleVote = (anecdote) => {
    const newAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
    updateAnecdoteMutation.mutate(newAnecdote);
  };

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (anecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      const newAnecdotes = anecdotes.map((a) =>
        a.id === anecdote.id ? anecdote : a
      );
      queryClient.setQueryData(["anecdotes"], newAnecdotes);
    },
  });

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    retry: false,
    onError: (error) => {
      console.log(error);
      return (
        <div> anecdote service not available due to problems in server </div>
      );
    },
  });

  if (result.isLoading) {
    return <div> Loading data...</div>;
  }

  if (result.isError) {
    return (
      <div> anecdote service not available due to problems in server </div>
    );
  }

  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
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

export default App;
