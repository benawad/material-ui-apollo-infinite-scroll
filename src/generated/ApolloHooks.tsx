type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Book = {
  id: Scalars["ID"];
  title?: Maybe<Scalars["String"]>;
  author?: Maybe<Scalars["String"]>;
};

export type BooksResponse = {
  books: Array<Book>;
  hasNextPage: Scalars["Boolean"];
};

export enum CacheControlScope {
  Public = "PUBLIC",
  Private = "PRIVATE"
}

export type Mutation = {
  removeBook: Scalars["Boolean"];
};

export type MutationRemoveBookArgs = {
  id: Scalars["Int"];
};

export type Query = {
  books: BooksResponse;
};

export type QueryBooksArgs = {
  cursor?: Maybe<Scalars["String"]>;
  first: Scalars["Int"];
};

export type BooksQueryVariables = {
  cursor?: Maybe<Scalars["String"]>;
  first: Scalars["Int"];
};

export type BooksQuery = { __typename?: "Query" } & {
  books: { __typename?: "BooksResponse" } & Pick<
    BooksResponse,
    "hasNextPage"
  > & {
      books: Array<
        { __typename?: "Book" } & Pick<Book, "id" | "title" | "author">
      >;
    };
};

export type RemoveBookMutationVariables = {
  id: Scalars["Int"];
};

export type RemoveBookMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "removeBook"
>;

import gql from "graphql-tag";
import * as ReactApolloHooks from "react-apollo-hooks";

export const BooksDocument = gql`
  query Books($cursor: String, $first: Int!) {
    books(cursor: $cursor, first: $first) {
      books {
        id
        title
        author
      }
      hasNextPage
    }
  }
`;

export function useBooksQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<BooksQueryVariables>
) {
  return ReactApolloHooks.useQuery<BooksQuery, BooksQueryVariables>(
    BooksDocument,
    baseOptions
  );
}
export const RemoveBookDocument = gql`
  mutation RemoveBook($id: Int!) {
    removeBook(id: $id)
  }
`;

export function useRemoveBookMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    RemoveBookMutation,
    RemoveBookMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<
    RemoveBookMutation,
    RemoveBookMutationVariables
  >(RemoveBookDocument, baseOptions);
}
