const { Sequelize, DataTypes } = require('sequelize')
const PokemonModel = require('../models/pokemon')
const UserModele = require('../models/user')
const pokemons = require('./mock-pokemon')
const bcrypt  = require('bcrypt')

  
let sequelize 

if(process.env.NODE_ENV === 'production'){
    sequelize = new Sequelize( 'woxi0979vd89k037','fkq7n18gsbt50jld', 'ezxcweyj8m3dk390', {
        host: 'klbcedmmqp7w17ik.cbetxkdyhwsb.us—east-l.rds.amazonaws.com' ,
        dialect: 'mariadb',
        dialectOptions:{
            timezone: 'EtC/CAT-2',
        },
        logging: true
        })
    } else {
        sequelize = new Sequelize('pokedex', 'root', '', {
            host: 'localhost',
            dialect: 'mariadb',
            dialectOptions: {
                timezone: 'Etc/GMT-2',
            },
            logging: false
        })
    }
  
const Pokemon = PokemonModel(sequelize, DataTypes)
const User = UserModele(sequelize, DataTypes)
  
const initDb = () => {
 // return sequelize.sync({force: true}).then(_ => {
  return sequelize.sync().then(_ => {
    pokemons.map(pokemon => {
      Pokemon.create({
        name: pokemon.name,
        hp: pokemon.hp,
        cp: pokemon.cp,
        picture: pokemon.picture,
        types: pokemon.types
      }).then(pokemon => console.log(pokemon.toJSON()))
    })
   
    bcrypt.hash('pikachu', 10)
    .then(hash => User.create({ username: 'pikachu', password: hash }))
    .then(user => console.log(user.toJSON()))

    console.log('La base de donnée a bien été initialisée !')
  })
}
  
module.exports = { 
  initDb, Pokemon, User
}