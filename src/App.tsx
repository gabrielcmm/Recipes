import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './components/Layout';
import Recipes from './components/Recipes';
import RecipeDetails from './components/RecipeDetails';
import RecipeInProgress from './pages/RecipeInProgress';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route element={ <Layout /> }>
        <Route path="/favorite-recipes" element={ <FavoriteRecipes /> } />
        <Route path="/meals" element={ <Recipes /> } />
        <Route path="/drinks" element={ <Recipes /> } />
        <Route path="/done-recipes" element={ <DoneRecipes /> } />
      </Route>
      <Route path="/meals/:id" element={ <RecipeDetails /> } />
      <Route path="/drinks/:id" element={ <RecipeDetails /> } />
      <Route path="/meals/:id/in-progress" element={ <RecipeInProgress /> } />
      <Route path="/drinks/:id/in-progress" element={ <RecipeInProgress /> } />
      <Route path="/profile" element={ <Profile /> } />
    </Routes>
  );
}

export default App;
