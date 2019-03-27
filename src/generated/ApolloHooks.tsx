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
  id: Scalars["String"];
};

export type Query = {
  books: BooksResponse;
};

export type QueryBooksArgs = {
  searchQuery?: Maybe<Scalars["String"]>;
  cursor?: Maybe<Scalars["String"]>;
  first: Scalars["Int"];
};

export type BooksQueryVariables = {
  searchQuery?: Maybe<Scalars["String"]>;
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
  id: Scalars["String"];
};

export type RemoveBookMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "removeBook"
>;

import gql from "graphql-tag";
import * as ReactApolloHooks from "react-apollo-hooks";

export const BooksDocument = gql`
  query Books($searchQuery: String, $cursor: String, $first: Int!) {
    books(searchQuery: $searchQuery, cursor: $cursor, first: $first)
      @connection(key: "books", filter: ["searchQuery"]) {
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
  mutation RemoveBook($id: String!) {
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
