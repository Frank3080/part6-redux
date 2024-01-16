import { useDispatch } from "react-redux";
import { change } from "../reducers/filterReducer";

const Filter = () => {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    event.preventDefault();
    const filter = event.target.value;
    dispatch(change(filter));
  };

  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};

export default Filter;
