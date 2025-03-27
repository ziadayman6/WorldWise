import { useEffect, useState } from "react";
import styles from "./Form.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";

function Form() {
  const { cities, dispatch } = useCities();
  const navigate = useNavigate();

  const [position, setPosition] = useState([]);
  const [name, setName] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [notes, setNotes] = useState("");
  const [country, setCountry] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [uniqueNumbers, setUniqueNumbers] = useState(new Set());

  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  function generateUniqueRandom(min, max) {
    if (uniqueNumbers.size >= max - min + 1) {
      throw new Error("All unique numbers have been generated");
    }

    let num;
    do {
      num = Math.floor(Math.random() * (max - min + 1)) + min;
    } while (uniqueNumbers.has(num));

    setUniqueNumbers((prev) => new Set(prev).add(num));
    return num;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const uniqueId = generateUniqueRandom(10000, 100000);
    const newCity = {
      id: uniqueId,
      name: name,
      country: country,
      countryCode: countryCode,
      date: date,
      notes: notes,
      lat: position[0],
      lng: position[1],
    };

    dispatch({ type: "setCurrentCity", payload: uniqueId });
    dispatch({ type: "setCities", payload: [...cities, newCity] });
    navigate("../cities");
  }

  useEffect(
    function () {
      async function fetching() {
        try {
          setError("");
          setName("");
          setCountry("");
          setCountryCode("");
          setIsLoading(true);
          const res = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
          );

          const data = await res.json();

          if (!data.countryCode) {
            setError("There is no city here, please choose another place ! 😍");
            return;
          }

          setName(data.city);
          setCountry(data.countryName);
          setCountryCode(data.countryCode);
        } finally {
          setIsLoading(false);
        }
      }

      if (lat && lng) {
        setPosition([lat, lng]);
        fetching();
      } else setError("Please click on the map and choose a city ! 😍");
    },
    [lat, lng]
  );

  return (
    <>
      {error && <Message>{error}</Message>}
      {isLoading && <p>LOADING...</p>}
      {!error && !isLoading && (
        <form className={styles.container} onSubmit={handleSubmit}>
          <div>
            <label>City name</label>
            <input type="text" value={name} disabled />
          </div>
          <div>
            <label>Trip date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
            />
          </div>
          <div className={styles.notes}>
            <label>Notes about your trip to {name}</label>
            <textarea
              value={notes}
              onChange={(e) => {
                setNotes(e.target.value);
              }}
            />
          </div>
          <div>
            <button className={styles.add}>ADD</button>
            <button
              className={styles.back}
              onClick={(e) => {
                e.preventDefault();
                navigate(-1);
              }}
            >
              &larr; BACK
            </button>
          </div>
        </form>
      )}
    </>
  );
}

export default Form;
