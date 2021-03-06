const axios = require('axios');

exports.getAllPokemon = function (req, res, next) {
  axios
    .get('https://pokeapi.co/api/v2/pokemon/')
    .then((response) => {
      console.log(response.data)
      const { results } = response.data
      res.render('allPokemon', {
        pokemon: results.slice(0, 151)
      })
    })
    .catch((err) => {
      next()
    })
}

exports.getIndividualPokemon = function (req, res, next) {
  axios
    .get(`https://pokeapi.co/api/v2/pokemon/${req.params.id}`)
    .then((response) => {
      const pokemon = {
        name: response.data.name,
        sprites: response.data.sprites,
        types: response.data.types,
        weight: response.data.weight,
        height: response.data.height,
        abilities: response.data.abilities,
        moves: response.data.moves,
        search: req.query.pokemon
      }
      res.render('individualPokemon', { pokemon })
    })
    .catch((err) => {
      next();
    })
}

exports.getSearchPokemon = function (req, res, next) {
  axios
    .get(`https://pokeapi.co/api/v2/pokemon/${req.query.pokemon}`)
    .then((response) => {
      const pokemon = {
        name: response.data.name,
        sprites: response.data.sprites,
        types: response.data.types,
        weight: response.data.weight,
        height: response.data.height,
        abilities: response.data.abilities,
        moves: response.data.moves,
        search: req.query.pokemon
      }
      res.render('individualPokemon', {
        pokemon: pokemon,

      })
    })
    .catch((err) => {
      next();
    })
}

// exports.getIndividualPokemon = function (req, res, next) {
//   axios.all([
//     axios.get(`https://pokeapi.co/api/v2/pokemon/${req.params.id}`),
//     axios.get(`https://pokeapi.co/api/v2/evolution-chain/${req.params.id}`)
//   ])
//     .then(axios.spread((response, evolution) => {
//       console.log(evolution.data)
//       const pokemon = {
//         name: response.data.name,
//         sprites: response.data.sprites,
//         types: response.data.types,
//         weight: response.data.weight,
//         height: response.data.height,
//         abilities: response.data.abilities,
//         moves: response.data.moves,
//         search: req.query.pokemon
//       }
//       res.render('individualPokemon', { pokemon })
//     }))
//     .catch((err) => {
//       next();
//     })
// };  