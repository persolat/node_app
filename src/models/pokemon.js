const validTypes = ['Plante', 'Poison','Feu', 'Eau', 'Insecte', 'Vol', 'Normal', 'Electrik', 'Fée' ]
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Pokemon', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:{
          msg: 'Le nom est déjà pris.'
        },
        validate:{
          notEmpty: {msg: 'Utilisez uniquement les charactères alphanumérique.'},
          notNull: {msg: 'Le champ nom est requis.'}
        }
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
          isInt: {msg: 'Utilisez uniquement des nombres entiers pour les points de vie.'},
          notNull: {msg: 'Les points de vie sont une propriété requise.'},
        min: {
          args: [0],
          msg: 'Les points de vie doivent être inferieurs ou égales à 0.'
        },
        max: {
          args: [999],
          msg: 'Les points de vie doivent être supérieurs ou égales à 999.'
        }
      }
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
          isInt: {msg: 'Utilisez uniquement des nombres entiers pour les points de vie.' },
          notNull: {msg: 'Les points de vie sont une propriété requise.'},
        min:{
          args: [0],
          msg:'Les points de dégats doivent être inferieurs ou égales à 0.'
        },
        max: {
          args: [99],
          msg: 'Les points de dégats doivent être supérieurs ou égales à 99.'
        }
        }  
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
          isUrl: {msg: 'Utilisez uniquement une URL valide'},
          notNull: {msg: 'L\'URL est une propriété requise.'}
        }
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
          return this.getDataValue('types').split(',')
        },
        set(types) {
          return this.setDataValue('types', types.join())
        },
        validate: {
          isTypesValid(value){
            if(!value) {
              throw new Error ('Un pokémon doit au moins avoir un type.')
            }
            if(value.split(',').length > 3){
              throw new Error('Un pokémon ne peux pas avoir plus de trois types.')
            }
            value.split(',').forEach(type => {
              if(!validTypes.includes(type)) {
                throw new Error(`Le type d'un pokemon doit appartenir à la liste suivante : ${validTypes}`)
              }
            })
          }
        }
      }
    }, 
    {
      timestamps: true,
      createdAt: 'created',
      updatedAt: false
    })
}
  