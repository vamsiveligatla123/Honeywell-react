import { useEffect, useState } from "react";
import axios from "axios";

const ShowMovies = () => {
  const [movies, setMovies] = useState([]);
  const [movieList, setMoviesList] = useState([]);
  const [seatSelected, setSeatSelected] = useState([]);
  const [TickedBookHandle, setTickedBookHandle] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("http://localhost:8080/getmoviesList");
        setMovies(res.json());
      } catch (exception) {
        console.log("Something Went Wrong");
      }
    };
    getData();
  }, []);

  const handleClick = async (value) => {
    try {
      const res = await axios.get(
        `http://localhost:8080/getTicketsInfo/{value.movieId}`
      );
      setMoviesList(res.json()); // (Or whatever)
    } catch (exception) {
      console.log("Something Went Wrong");
    }
  };

  const seatSelectedHandler = (value) => {
    setSeatSelected([{ ...value }]);
  };

  const tickedBookHandle = async (value) => {
    const res = await axios.patch("https://httpbin.org/patch", { ...value });
    setTickedBookHandle(res.json());
  };

  const homePageHandler = () => {
    window.location.reload(); // we can use rounting and ridirect to home page by using react routing feature
  };

  return (
    <>
      <div>
        {TickedBookHandle.length <= 0 &&
          movies.map((value) => {
            return (
              <button
                onClick={() => handleClick(value)}
                style={{
                  display: "inline",
                  margin: "10px",
                  border: "2px solid red",
                  cursor: "pointer"
                }}
              >
                {value.name}
              </button>
            );
          })}
      </div>
      {TickedBookHandle.length <= 0 &&
        movieList.map((value) => (
          <div style={{ marginTop: "20px" }}>
            <button
              onClick={() => seatSelectedHandler(value)}
              disabled={value.isFilled}
              style={{
                margin: "10px",
                padding: "10px",
                border: "2px solid blue",
                width: "100px",
                cursor: value.isFilled ? "auto" : "pointer",
                background: value.isFilled ? "gray" : "white"
              }}
            ></button>
          </div>
        ))}
      {TickedBookHandle.length <= 0 &&
        seatSelected.map((value) => (
          <div
            style={{
              margin: "10px",
              padding: "10px",
              border: "2px solid orange",
              width: "300px"
            }}
          >
            <div>Movie Name : {value.name}</div>
            <div>Amount : {value.fare}</div>
            <div>Time : {value.time}</div>
            <div>Date : {value.date}</div>

            <button
              onClick={() => tickedBookHandle(value)}
              style={{
                border: "1px solid black",
                marginBottom: "5px",
                cursor: "pointer",
                padding: "10px",
                background: "red",
                width: "100px"
              }}
            >
              Book Ticket
            </button>
          </div>
        ))}
      {TickedBookHandle.map((value) => (
        <div
          style={{
            margin: "10px",
            padding: "10px",
            border: "2px solid orange",
            width: "300Px"
          }}
        >
          <h2>Trasaction Successful</h2>
          <div>Movie Name : {value.name}</div>
          <div>Amount : {value.fare}</div>
          <div>Time : {value.time}</div>
          <div>Date : {value.date}</div>
          <button style={{ textAlign: "center" }} onClick={homePageHandler}>
            {" "}
            Back To Home{" "}
          </button>
        </div>
      ))}
    </>
  );
};

export default ShowMovies;
