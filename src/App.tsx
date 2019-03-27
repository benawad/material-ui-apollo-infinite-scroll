import { CircularProgress, List, ListItem, Paper } from "@material-ui/core";
import React from "react";
import { Waypoint } from "react-waypoint";
import { useBooksQuery } from "./generated/ApolloHooks";

const App = () => {
  const { data, fetchMore, networkStatus, } = useBooksQuery({
    variables: { first: 50 },
    notifyOnNetworkStatusChange: true
  });

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
        <Paper>
          <List>
            {data.books.books.map((x, i) => (
              <React.Fragment key={x.id}>
                <ListItem>{x.title}</ListItem>
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
