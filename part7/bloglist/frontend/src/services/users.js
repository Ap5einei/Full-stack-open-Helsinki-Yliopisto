import axios from 'axios'
const baseUrl = '/api/users'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export default { getAll }
// Tämä tiedosto sisältää käyttäjien palvelun, joka hakee kaikki käyttäjät backendistä.
// Se käyttää axios-kirjastoa HTTP-pyyntöjen tekemiseen ja määrittelee
// `getAll`-funktion, joka tekee GET-pyynnön `/api/users`
// ja palauttaa vastauksen datan.
// Tämä palvelu voidaan integroida Reduxin kanssa, kuten muissa esimerkeissä on tehty.
// Esimerkiksi `usersSlice.js`-tiedostossa voidaan käyttää tätä palvelua
// käyttäjien hakemiseen ja tallentamiseen Reduxin tilaan.
// Tämä mahdollistaa käyttäjien hallinnan frontendissä ja tarjoaa
// tarvittavat toiminnot käyttäjien tietojen hakemiseen backendistä.