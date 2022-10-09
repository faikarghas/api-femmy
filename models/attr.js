const { DataTypes } = require('sequelize')

const Attr = {
    
    LogAttr: {
        id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        log:{type: DataTypes.STRING},
        origin:{type: DataTypes.STRING},
        endpoint:{type: DataTypes.STRING},
        code:{type: DataTypes.STRING},
        request:{type: DataTypes.STRING},
        response:{type: DataTypes.STRING},
        createdat:{type: DataTypes.DATE},
        updatedat:{type: DataTypes.DATE},
    },

    ResellerAttr: {
        id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        fullname:{type: DataTypes.STRING},
        consultantname:{type: DataTypes.STRING},
        occupation:{type: DataTypes.STRING},
        address:{type: DataTypes.STRING},
        whatsappno:{type: DataTypes.STRING},
        email:{type: DataTypes.STRING},
        instagram:{type: DataTypes.STRING},
        tiktok:{type: DataTypes.STRING},
        createdat:{type: DataTypes.DATE},
        updatedat:{type: DataTypes.DATE},
    },

    QuestionAttr: {
        id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        fullname:{type: DataTypes.STRING},
        phone:{type: DataTypes.STRING},
        email:{type: DataTypes.STRING},
        question:{type: DataTypes.STRING},
        createdat:{type: DataTypes.DATE},
        updatedat:{type: DataTypes.DATE},
    },

}

module.exports = {
    Attr
}