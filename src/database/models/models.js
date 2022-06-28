const models = {
    User: require('./User'),
    Movie: require('./Movie'),
    Gender: require('./Gender'),
    Character: require('./Character'),
    CharacterMovie: require('./CharacterMovie')
}

let modelList = []

Object.keys(models).forEach(model => {
    modelList.push(models[model])
})

module.exports = {
    models: models,
    modelList: modelList
}