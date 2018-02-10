// @flow

// A higher order component for a relay-like cursor, edge, connection based
// pagination pattern for apollo client.
import { graphql } from 'react-apollo';
import { Kind } from 'graphql/language';

import type { OperationOption, OptionProps } from 'react-apollo';
import type {
  NameNode,
  FieldNode,
  DocumentNode,
  OperationDefinitionNode,
  SelectionSetNode,
} from 'graphql';

import { last, split } from '../utils';
import type { Connection } from '@forte-music/mock/models';

type Path = string[];

const findPathToDirectiveHelper = (
  selectionSet: SelectionSetNode,
  directiveName: string,
  basePath: Path = []
): ?Path => {
  const fields: FieldNode[] = (selectionSet.selections.filter(
    selectionNode => selectionNode.kind === Kind.FIELD
  ): any);

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
    .map(field => {
      const {
        selectionSet,
        name,
        alias,
      }: {
        selectionSet: SelectionSetNode,
        name: NameNode,
        alias?: NameNode,
      } = (field: any);

      return findPathToDirectiveHelper(selectionSet, directiveName, [
        ...basePath,
        (alias || name).value,
      ]);
    });

  if (deeperPaths.length) {
    return deeperPaths[0];
  }
};

// NOTE: Doesn't support the connection directive in a fragment.
export const findPathToDirective = (
  document: DocumentNode,
  directiveName: string
): ?Path => {
  // Flow doesn't hold refinements across function boundaries.
  // https://github.com/facebook/flow/issues/4519
  const operation: OperationDefinitionNode | void = (document.definitions.find(
    def => def.kind === Kind.OPERATION_DEFINITION
  ): any);

  if (!operation) {
    throw new TypeError(`No operation was provided.`);
  }

  return findPathToDirectiveHelper(operation.selectionSet, directiveName);
};

const getByPath = (root: Object, path: Path): mixed =>
  path.reduce((obj, segment) => obj[segment], root);

const combineConnections = <T, TResult: Object>(
  previousResult: TResult,
  fetchMoreResult: TResult,
  pathToConnectionRoot: Path
): TResult => {
  const oldConnectionRoot = getByPath(previousResult, pathToConnectionRoot);
  const { edges: oldEdges }: Connection<T> = (oldConnectionRoot: any);

  const fetchedConnectionRoot = getByPath(
    fetchMoreResult,
    pathToConnectionRoot
  );
  const { edges: fetchedEdges }: Connection<T> = (fetchedConnectionRoot: any);

  const newEdges = [...oldEdges, ...fetchedEdges];

  const merged = { ...previousResult, ...fetchMoreResult };
  const mergedConnectionRoot: Connection<T> = (getByPath(
    merged,
    pathToConnectionRoot
  ): any);
  mergedConnectionRoot['edges'] = newEdges;

  return merged;
};

export const connectionQuery = <TProps: Object, TResult: Object, TNode: Object>(
  document: DocumentNode,
  operationOptions: OperationOption<TProps, TResult>
) => {
  const pathToConnectionRoot = findPathToDirective(document, 'connection');
  if (pathToConnectionRoot == null) {
    throw new TypeError(`Connection not found in query document.`);
  }

  const defaultProps = operationOptions.props || (props => props);

  return graphql(document, {
    ...(operationOptions: any),
    props: (optionProps: OptionProps<TProps, TResult>) => ({
      ...defaultProps(optionProps),

      fetchMore() {
        const { data } = optionProps;
        if (data.loading) {
          return;
        }

        const connectionRoot = getByPath(data, pathToConnectionRoot);
        const {
          edges,
          pageInfo: { hasNextPage },
        }: Connection<TNode> = (connectionRoot: any);
        if (hasNextPage === undefined) {
          throw new TypeError('hasNextPage missing from pageInfo');
        }

        if (!hasNextPage) {
          // All items have been fetched.
          return;
        }

        const lastEdge = last(edges);
        const { cursor } = lastEdge || {};
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
