import MiniDrawer from '../../components/MiniDrawer/MiniDrawer';
import { Outlet } from 'react-router-dom';
import AddProjectModal from '../../components/AddProjectModal/AddProjectModal';
const Home = () => {
  return (
    <>
      <MiniDrawer>
        <AddProjectModal />
        <Outlet />
      </MiniDrawer>
    </>
  );
};
export default Home;
