// A higher order component for a relay-like cursor, edge, connection based
// pagination pattern for apollo client.
import { graphql } from 'react-apollo';
import { Kind } from 'graphql/language';

import { OperationOption, OptionProps } from 'react-apollo';
import {
  FieldNode,
  DocumentNode,
  OperationDefinitionNode,
  SelectionSetNode,
} from 'graphql';

import { last, split } from '../../utils';
import { Connection } from '@forte-music/mock/models';

type Path = string[];

const findPathToDirectiveHelper = (
  selectionSetRoot: SelectionSetNode,
  directiveName: string,
  basePath: Path = []
): Path | void => {
  const fields = selectionSetRoot.selections.filter(
    (selectionNode): selectionNode is FieldNode =>
      selectionNode.kind === Kind.FIELD
  );

  const { failed, accepted: connectedFields } = split(
    fields,
    ({ directives }) =>
      directives &&
      directives.map(({ name: { value } }) => value).includes(directiveName)
  );

  const paths: Path[] = connectedFields.map(({ name, alias }) => [
    ...basePath,
    (alias || name).value,
  ]);

  if (paths.length) {
    return paths[0];
  }

  const deeperPaths = failed
    .filter(({ selectionSet }) => selectionSet)
    .map(({ selectionSet, name, alias }) =>
      findPathToDirectiveHelper(
        selectionSet as SelectionSetNode,
        directiveName,
        [...basePath, (alias || name).value]
      )
    );

  if (deeperPaths.length) {
    return deeperPaths[0];
  }
};

// NOTE: Doesn't support the connection directive in a fragment.
export const findPathToDirective = (
  document: DocumentNode,
  directiveName: string
): Path | void => {
  const operation = document.definitions.find(
    (def): def is OperationDefinitionNode =>
      def.kind === Kind.OPERATION_DEFINITION
  );

  if (!operation) {
    throw new TypeError(`No operation was provided.`);
  }

  return findPathToDirectiveHelper(operation.selectionSet, directiveName);
};

const getByPath = (root: object, path: Path): any =>
  path.reduce((obj, segment) => obj[segment], root);

const combineConnections = <T, TResult extends object>(
  previousResult: TResult,
  fetchMoreResult: TResult,
  pathToConnectionRoot: Path
): TResult => {
  const oldConnectionRoot: Connection<T> = getByPath(
    previousResult,
    pathToConnectionRoot
  );
  const { edges: oldEdges } = oldConnectionRoot;

  const fetchedConnectionRoot: Connection<T> = getByPath(
    fetchMoreResult,
    pathToConnectionRoot
  );
  const { edges: fetchedEdges } = fetchedConnectionRoot;

  const newEdges = [...oldEdges, ...fetchedEdges];

  const merged = { ...(previousResult as any), ...(fetchMoreResult as any) };
  const mergedConnectionRoot: Connection<T> = getByPath(
    merged,
    pathToConnectionRoot
  );
  mergedConnectionRoot.edges = newEdges;

  return merged;
};

export const connectionQuery = <
  TProps extends object,
  TResult extends object,
  TNode extends object
>(
  document: DocumentNode,
  operationOptions: OperationOption<TProps, TResult>
) => {
  const pathToConnectionRoot = findPathToDirective(document, 'connection');
  if (pathToConnectionRoot == null) {
    throw new TypeError(`Connection not found in query document.`);
  }

  const defaultProps = operationOptions.props || (props => props);

  return graphql<TResult, TProps & { fetchMore: () => void }>(document, {
    ...operationOptions,
    props: (optionProps: OptionProps<TProps, TResult>) => ({
      ...defaultProps(optionProps),

      fetchMore() {
        const { data } = optionProps;
        if (!data || data.loading) {
          return;
        }

        const connectionRoot: Connection<TNode> = getByPath(
          data,
          pathToConnectionRoot
        );
        const { edges, pageInfo: { hasNextPage } } = connectionRoot;
        if (hasNextPage === undefined) {
          throw new TypeError('hasNextPage missing from pageInfo');
        }

        if (!hasNextPage) {
          // All items have been fetched.
          return;
        }

        const lastEdge = last(edges);
        const { cursor } = lastEdge || { cursor: undefined };
        if (lastEdge && !cursor) {
          throw new TypeError('cursor missing from the last edge');
        }

        data.fetchMore({
          variables: {
            ...data.variables,
            cursor,
          },
          updateQuery: (
            previousResult: TResult,
            { fetchMoreResult }: { fetchMoreResult: TResult }
          ) =>
            combineConnections(
              previousResult,
              fetchMoreResult,
              pathToConnectionRoot
            ),
        });
      },
    }),
  });
};
