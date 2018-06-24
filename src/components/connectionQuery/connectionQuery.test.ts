import { findPathToDirective } from '.';
import gql from 'graphql-tag';

// Disable the GQL codegen for this test. Needed because this query isn't
// executed but tests a few different cases which aren't in our schema.
const ignored = (arg: any, ...args: any[]) => gql(arg, ...args);

it('finds the path of the connection directive in a graphql query', () => {
  const path = findPathToDirective(
    ignored`
    query ConnectionQueryTest {
      this {
        multiple
        fields
        alias: realThing

        is {
          query

          with {
            a

            aliased: connection @connection {
              test
            }
          }
        }
      }
    }
  `,
    'connection'
  );

  expect(path).toEqual(['this', 'is', 'with', 'aliased']);
});
