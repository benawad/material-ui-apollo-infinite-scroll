import {
  CircularProgress,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper
} from "@material-ui/core";
import InboxIcon from "@material-ui/icons/Close";
import React, { useState } from "react";
import { Waypoint } from "react-waypoint";
import {
  BooksDocument,
  BooksQuery,
  useBooksQuery,
  useRemoveBookMutation
} from "./generated/ApolloHooks";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data, fetchMore, networkStatus } = useBooksQuery({
    variables: { searchQuery, first: 50 },
    notifyOnNetworkStatusChange: true
  });

  const removeBook = useRemoveBookMutation();

  if (!data || !data.books) {
    return <CircularProgress />;
  }

  return (
    <div
      style={{
        backgroundColor: "#fafafa"
      }}
    >
      <div style={{ maxWidth: 400, margin: "auto", padding: 10 }}>
        <input
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        <Paper>
          <List>
            {data.books.books.map((x, i) => (
              <React.Fragment key={x.id}>
                <ListItem>
                  <ListItemText>{x.title}</ListItemText>
                  <ListItemIcon>
                    <IconButton
                      onClick={() =>
                        removeBook({
                          variables: { id: x.id },
                          update: store => {
                            const data = store.readQuery<BooksQuery>({
                              query: BooksDocument,
                              variables: { searchQuery }
                            });
                            store.writeQuery<BooksQuery>({
                              query: BooksDocument,
                              variables: { searchQuery },
                              data: {
                                books: {
                                  __typename: "BooksResponse",
                                  books: data!.books.books.filter(
                                    y => y.id !== x.id
                                  ),
                                  hasNextPage: data!.books.hasNextPage
                                }
                              }
                            });
                          }
                        })
                      }
                    >
                      <InboxIcon />
                    </IconButton>
                  </ListItemIcon>
                </ListItem>
                {data.books.hasNextPage && i === data.books.books.length - 10 && (
                  <Waypoint
                    onEnter={() =>
                      fetchMore({
                        variables: {
                          first: 50,
                          cursor:
                            data.books.books[data.books.books.length - 1].id
                        },
                        updateQuery: (pv, { fetchMoreResult }) => {
                          if (!fetchMoreResult) {
                            return pv;
                          }

                          return {
                            books: {
                              __typename: "BooksResponse",
                              books: [
                                ...pv.books.books,
                                ...fetchMoreResult.books.books
                              ],
                              hasNextPage: fetchMoreResult.books.hasNextPage
                            }
                          };
                        }
                      })
                    }
                  />
                )}
              </React.Fragment>
            ))}
          </List>
          {networkStatus === 3 && <CircularProgress />}
        </Paper>
      </div>
    </div>
  );
};

export default App;
