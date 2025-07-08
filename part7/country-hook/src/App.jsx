import { useState } from 'react'
import { useCountry } from './hooks'

const Country = ({ country }) => {
  if (!country) return null
  if (!country.name) return <div>not found...</div>

  return (
    <div>
      <h3>{country.name.common}</h3>
      <div>capital {country.capital[0]}</div>
      <div>population {country.population}</div>
      <img src={country.flags.png} height='100' alt={`flag of ${country.name.common}`} />
    </div>
  )
}

const App = () => {
  const [name, setName] = useState('')
  const [input, setInput] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(input)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          name="country"
        />
        <button>find</button>
      </form>
      <Country country={country} />
    </div>
  )
}

export default App
