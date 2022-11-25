import React, { useState } from "react";
import axios from "axios";
import {
  Wrapper,
  Row,
  Header,
  Image,
  Search,
  Form,
  Button,
} from "./components/styled/index";
import owl from "./Image/owl.jpg";
import JokeItem from "./components/JokeItem";
import {Joke , Flag} from "./common/types"

const Base_Url = "https://v2.jokeapi.dev/joke/Any";



const App = () => {
  const [search, setSearch] = useState("");
  const [error, setError] = useState(false);
  const [jokes, setJokes] = useState<Joke[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearch(event.target.value);
  };

  const getJokes = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const EndPoint = `${Base_Url}?contains=${search}&amount=10`;
    const { data } = await axios.get(EndPoint);
    console.log(data);

    if (data.error) {
      setError(true);
      setJokes([]);
    } else {
      setError(false);
      setJokes(data.jokes);
    }
    setTimeout(() => {
      setSearch("");
    }, 1000);
  };

  return (
    <>
      <Wrapper>
        <Row>
          <Header> Joker Owl  </Header>
          <Image src={owl} title='Baykuw' />
        </Row>
        <Form onSubmit={getJokes}>
          <Search
            type='text'
            placeholder='Search...'
            value={search}
            onChange={handleChange}
          />
          <Button type='submit'>Submit</Button>
        </Form>
        {
          // Jokes

          <div>
            {error && <p>Sorry, no jokes found</p>}

            {jokes.length > 0 &&
              // @ts-ignore
              jokes.map((joke) => <JokeItem key={joke.id} joke={joke} />)}
          </div>
        }
      </Wrapper>
    </>
  );
};

export default App;
