import App from '../components/templates/App/App';
import AllFilms from '../components/routes/AllFilms/AllFilms';
import Film from '../components/routes/Film/Film';

const config = [{
  path: '/',
  component: App,
  routes: [
    {
      path: '/',
      component: AllFilms,
      exact: true,
    },
    {
      path: '/:id',
      component: Film,
    },
  ],
}];

export default config;
