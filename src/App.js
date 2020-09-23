import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [testData, setTestData] = useState();

  useEffect(() => {
    const { CancelToken } = axios;
    const source = CancelToken.source();

    const getData = async () => {
      try {
        const body = {
          query: `
          query {
            users {
              id
              name
              email
            }
          }
          `,
          variables: {},
        };

        const options = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const result = await axios.post(
          "http://localhost:4000/graphql",
          body,
          options
        );

        console.log(result.data.data.users[0].name);
      } catch (e) {
        if (axios.isCancel(e)) {
          console.log("get request cancelled");
        } else {
          console.log(e);
        }
      }
    };

    getData();

    return () => {
      source.cancel("get request cancelled");
    };
  }, []);
  return <div>Hello world!</div>;
}

export default App;
