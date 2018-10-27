import * as React from 'react';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import { Query } from 'react-releasy';
import graphql from 'babel-plugin-relay/macro';

class Film extends React.PureComponent {
  render() {
    const { id } = this.props.match.params;

    return (
      <div>
        <Helmet title='SWAPI - Loading Film' />
        <Query
          variables={{ id }}
          query={graphql`
            query FilmQuery($id: ID!) {
              film(id: $id) {
                title
                openingCrawl
              }
            }
          `}
        >
          {({ film, isFetching, error }) => {
            if (error) {
              return `error: ${error}`;
            }
            if (isFetching) {
              return 'loading';
            }

            if (!film) {
              return 'not found'
            }

            return (
              <div>
                <Helmet title={`SWAPI - ${film.title}`} />
                <h1>{film.title}</h1>
                <p>{film.openingCrawl}</p>
                <Link to='/'>Back</Link>
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default Film;
