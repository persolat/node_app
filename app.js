const express = require('express')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const sequelize = require('./src/db/sequelize')

const app = express()
const port = process.env.PORT || 3001

app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(bodyParser.json())

    sequelize.initDb()

    app.get("/", (req, res) => {
        res.json('Hello, Heroku ! (-_-)')
    })

    // Ici, nous placerons nos futurs points de terminaison.
    require('./src/routes/findAllPokemons')(app)
    require('./src/routes/findPokemonByPk')(app)
    require('./src/routes/createPokemon')(app)
    require('./src/routes/updatePokemon')(app)
    require('./src/routes/deletePokemon')(app)
    require('./src/routes/login')(app)

    //On ajoute la gestion des erreurs 404

    app.use(({res}) => {
        const message = 'Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL.'
        res.status(404).json({message})
    })

app.listen(port, () => console.log(`Notre application Node est démarrée sur : http://localhost:${port}`))    

/*app.use((req, res, next) => {
    console.log(`URL : ${req.url}`)
    next()
})

app.get('/', (req,res) => res.send('Hello, Express 3 ! (-_-) '))

app.get('/api/pokemons/:id', (req,res) => {
    const id = parseInt(req.params.id)
    const pokemon = pokemons.find(pokemon => pokemon.id === id)
    const message = 'Un pokémon a bien été trouvé'
    res.json(success(message, pokemon))
})


app.get('/api/pokemons', (req,res) => {
    //const pokemon = pokemons[pokemons.length - 1]
    //const pokemon = pokemons
    const message = 'La liste des pokémons a bien été récupérée.'
    res.json(success(message, pokemons))
})

// add

app.post('/api/pokemons', (req, res) => {
    const id = getUniqueId(pokemons)
    const pokemonCreated = { ...req.body, ...{id: id, created: new Date()}}
    pokemons.push(pokemonCreated)
    const message = `Le pokémon ${pokemonCreated.name} a bien été crée.`
    res.json(success(message, pokemonCreated))
})

//repalce

app.put('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const pokemonUpdated = { ...req.body, id: id }
    pokemons = pokemons.map(pokemon => {
        return pokemon.id === id ? pokemonUpdated : pokemon
    })
    const message = `Le pokémon ${pokemonUpdated.name} a bien été modifié.`
    res.json(success(message, pokemonUpdated))
})

//deleted

app.delete('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const pokemonDeleted = pokemons.find(pokemon => pokemon.id === id)
    pokemons = pokemons.filter(pokemon => pokemon.id !== id)
    const message = `Le pokémon ${pokemonDeleted.name} a bien été supprimé.`
    res.json(success(message, pokemonDeleted))
  });
*/
