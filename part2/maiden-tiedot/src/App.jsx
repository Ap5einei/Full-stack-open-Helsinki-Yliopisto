import { useState, useEffect } from 'react'
import axios from 'axios'

const CountryList = ({ countries, setFilter }) => {
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  }
  if (countries.length > 1) {
    return (
      <ul>
        {countries.map(country =>
          <li key={country.cca3}>
            {country.name.common}
            <button onClick={() => setFilter(country.name.common)}>show</button>
          </li>
        )}
      </ul>
    )
  }
  if (countries.length === 1) {
    const country = countries[0]
    return (
      <div>
        <h2>{country.name.common}</h2>
        <div>capital {country.capital?.[0]}</div>
        <div>area {country.area}</div>
        <h3>languages</h3>
        <ul>
          {Object.values(country.languages || {}).map(lang => <li key={lang}>{lang}</li>)}
        </ul>
        <img src={country.flags.png} alt="flag" width="150" />
      </div>
    )
  }
  return null
}

function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => setCountries(response.data))
  }, [])

  const countriesToShow = filter
    ? countries.filter(country =>
        country.name.common.toLowerCase().includes(filter.toLowerCase()))
    : []

  return (
    <div>
      <div>
        find countries <input value={filter} onChange={e => setFilter(e.target.value)} />
      </div>
      <CountryList countries={countriesToShow} setFilter={setFilter} />
    </div>
  )
}

export default App
