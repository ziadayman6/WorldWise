import { createContext, useContext, useEffect, useReducer } from "react";
const citiesProvider = createContext();
const initialStates = { cities: [], currentCity: "", countries: [] };

function reducer(prevState, action) {
  switch (action.type) {
    case "setCountries":
      return { ...prevState, countries: action.payload };
    case "setCurrentCity":
      return { ...prevState, currentCity: action.payload };
    case "setCities":
      return { ...prevState, cities: action.payload };
    case "logout":
      return initialStates;
    default:
      throw new Error("this case is not available");
  }
}

function CitiesContext({ children }) {
  const [{ cities, currentCity, countries }, dispatch] = useReducer(
    reducer,
    initialStates
  );

  useEffect(() => {
    function countCities() {
      const countryMap = new Map();

      cities.forEach((city) => {
        if (countryMap.has(city.countryCode)) {
          countryMap.set(
            city.countryCode,
            countryMap.get(city.countryCode) + 1
          );
        } else {
          countryMap.set(city.countryCode, 1);
        }
      });

      const result = Array.from(countryMap)
        .map(([countryCode, citiesVisited]) => ({
          countryCode,
          citiesVisited: citiesVisited.toString(),
        }))
        .sort((a, b) => {
          const diff = parseInt(b.citiesVisited) - parseInt(a.citiesVisited);
          if (diff !== 0) return diff;
          return a.countryCode.localeCompare(b.countryCode);
        });

      return result;
    }

    dispatch({ type: "setCountries", payload: countCities() });
  }, [cities]);

  return (
    <citiesProvider.Provider
      value={{ cities, countries, currentCity, dispatch }}
    >
      {children}
    </citiesProvider.Provider>
  );
}

function useCities() {
  const context = useContext(citiesProvider);
  if (context === undefined)
    throw new Error("This context was used outside the provider.");
  return context;
}

export { CitiesContext, useCities };
