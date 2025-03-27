import { useState } from "react";
import styles from "./LoginSection.module.css";
import { useNavigate } from "react-router-dom";

function LoginSection() {
  const [uname, setUname] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const firstName = uname.split(" ")[0];
  const url = "/main/" + firstName;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (uname.trim().length > 0) {
      setError(false);
      navigate(url);
    } else {
      setError(true);
    }
  };

  return (
    <form className={styles.body} onSubmit={handleSubmit}>
      <label>Username</label>
      <input
        type="text"
        placeholder="Enter your name"
        value={uname}
        onChange={(e) => setUname(e.target.value)}
        className={error ? styles.errorOutline : ""}
      />
      <button type="submit">SUBMIT</button>
    </form>
  );
}

export default LoginSection;
