import { useNavigate, useParams } from "react-router-dom";
import styles from "./Details.module.css";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesContext";
function Details() {
  const { id } = useParams();
  const { cities } = useCities();
  const navigate = useNavigate();

  const [cityName, setCityName] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(function () {
    const result = cities.find((city) => city.id == id);

    setCityName(result.name);
    setCountryCode(result.countryCode);
    setDate(result.date);
    setNotes(result.notes);
  }, []);

  function formatDate(dateString) {
    const [year, month, day] = dateString.split("-").map(Number);
    const date = new Date(year, month - 1, day);

    const options = {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  }

  return (
    <div className={styles.container}>
      <div className={styles.child}>
        <div className={styles.row}>
          <span>City name</span>
          <p>
            <b>{countryCode}</b> {cityName}
          </p>
        </div>
        <div>
          <span>You went to {cityName}</span>
          <p>{formatDate(date)}</p>
        </div>
        {notes !== "" && (
          <div>
            <span>Your notes</span>
            <p>{notes}</p>
          </div>
        )}
        <div>
          <span>LEARN MORE</span>
          <br />
          <a
            href={`https://en.wikipedia.org/wiki/${cityName}`}
            target="_blank"
            rel="noreferrer"
          >
            Check out {cityName} on Wikipedia &rarr;
          </a>
        </div>
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
    </div>
  );
}

export default Details;
