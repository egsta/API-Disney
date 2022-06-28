//Models
const { models, modelList } = require("./models/models");

console.log(modelList)

modelList.forEach(model => {
    model.associate(models)
});
