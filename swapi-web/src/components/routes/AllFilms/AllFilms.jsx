import * as React from 'react';
import { Link } from 'react-router-dom';
import { Query } from 'react-releasy';
import graphql from 'babel-plugin-relay/macro';

class AllFilms extends React.PureComponent {
  render() {
    return (
      <Query
        query={graphql`
          query AllFilmsQuery {
            allFilms {
              edges {
                node {
                  id
                  title
                }
              }
            }
          }
        `}
      >
        {({ allFilms, isFetching, error }) => {
          if (error) {
            return `error: ${error}`;
          }
          if (isFetching) {
            return 'loading';
          }

          if (!allFilms) {
            return 'empty'
          }
          
          return (
            <div>
              {allFilms.edges.map(({ node }) => (
                <Link
                  key={node.id}
                  to={`/${node.id}`}
                >
                  {node.title}
                </Link>
              ))}
            </div>
          );
        }}
      </Query>
    );
  }
}

export default AllFilms;
