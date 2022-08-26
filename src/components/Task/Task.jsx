import { useParams } from 'react-router-dom';

const Task = () => {

  const {id} = useParams()
  
  return <div>{id}</div>;
};
export default Task;
