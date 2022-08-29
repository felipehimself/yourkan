import Drawer from '../../components/Drawer/Drawer';
import { Outlet } from 'react-router-dom';
import DeleteProjectModal from '../../components/DeleteProjectModal/DeleteProjectModal';
import AddTaskModal from '../../components/AddTaskModal/AddTaskModal';
const Home = () => {
  return (
    <Drawer>
      <DeleteProjectModal/>
      <AddTaskModal/>
      <Outlet />
    </Drawer>
  );
};
export default Home;
