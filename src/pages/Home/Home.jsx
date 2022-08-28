import Drawer from '../../components/Drawer/Drawer';
import { Outlet } from 'react-router-dom';
import DeleteProjectModal from '../../components/DeleteProjectModal/DeleteProjectModal';

const Home = () => {
  return (
    <Drawer>
      <DeleteProjectModal/>
      <Outlet />
    </Drawer>
  );
};
export default Home;
