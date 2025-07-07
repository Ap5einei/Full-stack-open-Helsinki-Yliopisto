import React from 'react'
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import counterReducer from './reducer'

const store = createStore(counterReducer)

const App = () => {
  return (
    <div>
      <h1>Unicafe palautteet</h1>
      <button onClick={() => store.dispatch({ type: 'GOOD' })}>hyvä</button>
      <button onClick={() => store.dispatch({ type: 'OK' })}>neutraali</button>
      <button onClick={() => store.dispatch({ type: 'BAD' })}>huono</button>
      <button onClick={() => store.dispatch({ type: 'ZERO' })}>nollaa tilastot</button>
      <div>hyvä {store.getState().good}</div>
      <div>neutraali {store.getState().ok}</div>
      <div>huono {store.getState().bad}</div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
