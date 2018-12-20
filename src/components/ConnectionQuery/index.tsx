// A higher order component for a relay-like cursor, edge, connection based
// pagination pattern for apollo client.
import React, { ReactNode } from 'react';
import { Query, QueryResult } from 'react-apollo';
import { Kind } from 'graphql/language';

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

interface CursorVariables {
  cursor?: string | null;
}

export interface ConnectionQueryProps<
  TData extends object,
  TVariables extends CursorVariables
> extends ExposedConnectionQueryProps<TData, TVariables> {
  query: DocumentNode;
}

export interface ExposedConnectionQueryProps<
  TData extends object,
  TVariables extends CursorVariables
> {
  children: (result: ConnectionQueryResult<TData, TVariables>) => ReactNode;
  variables?: TVariables;
}

export type ConnectionQueryResult<TData, TVariables> = QueryResult<
  TData,
  TVariables
> & { getNextPage: () => Promise<void> };

// A wrapper component which handles loading more of paginated data.
export const ConnectionQuery = <
  TData extends object,
  TVariables extends CursorVariables,
  TNode
>({
  children,
  ...props
}: ConnectionQueryProps<TData, TVariables>) => {
  const pathToConnectionRoot = findPathToDirective(props.query, 'connection');
  if (pathToConnectionRoot == null) {
    throw new TypeError(`Connection not found in query document.`);
  }

  return (
    <Query {...props}>
      {(result: QueryResult<TData, TVariables>) => {
        const getNextPage = async (): Promise<void> => {
          if (!result.data || result.loading) {
            return;
          }

          const connectionRoot: Connection<TNode> = getByPath(
            result.data,
            pathToConnectionRoot
          );
          const {
            edges,
            pageInfo: { hasNextPage },
          } = connectionRoot;
          if (hasNextPage === undefined) {
            throw new TypeError('hasNextPage missing from pageInfo');
          }

          if (!hasNextPage) {
            // All items have been fetched.
            return;
          }

          const lastEdge = last(edges) || { cursor: undefined };
          const { cursor } = lastEdge;
          if (!cursor) {
            throw new TypeError('cursor missing from the last edge');
          }

          result.fetchMore({
            variables: { cursor },
            updateQuery: (
              previousResult: TData,
              { fetchMoreResult }: { fetchMoreResult?: TData }
            ) =>
              fetchMoreResult
                ? combineConnections(
                    previousResult,
                    fetchMoreResult,
                    pathToConnectionRoot
                  )
                : previousResult,
          });
        };

        return children({ ...result, getNextPage });
      }}
    </Query>
  );
};
