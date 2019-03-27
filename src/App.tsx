import { List, ListItem, Paper } from "@material-ui/core";
import React from "react";
import { useBooksQuery } from "./generated/ApolloHooks";

const App = () => {
  const { data } = useBooksQuery({
    variables: { first: 50 }
  });

  if (!data || !data.books) {
    return <div>...loading</div>;
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
            {data.books.books.map(x => (
              <ListItem key={x.id}>{x.title}</ListItem>
            ))}
          </List>
        </Paper>
      </div>
    </div>
  );
};

export default App;
