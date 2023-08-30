import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

function Layout() {
  return (
    <>
      <main
        className="bg-bg-light-100 text-text-light-100
        dark:bg-bg-dark-100 dark:text-text-dark-100"
      >
        <Header />
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Layout;
