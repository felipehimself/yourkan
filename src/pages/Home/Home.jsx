import MiniDrawer from '../../components/MiniDrawer/MiniDrawer';
import { Outlet } from 'react-router-dom';
import DeleteProjectModal from '../../components/DeleteProjectModal/DeleteProjectModal';

const Home = () => {
  return (
    <MiniDrawer>
      <DeleteProjectModal/>
      <Outlet />
    </MiniDrawer>
  );
};
export default Home;
