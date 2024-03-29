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
        createdAt:{type: DataTypes.DATE},
        updatedAt:{type: DataTypes.DATE},
    },

    ResellerAttr: {
        id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        fullName:{type: DataTypes.STRING},
        consultantName:{type: DataTypes.STRING},
        occupation:{type: DataTypes.STRING},
        address:{type: DataTypes.STRING},
        whatsAppNo:{type: DataTypes.STRING},
        email:{type: DataTypes.STRING},
        instagram:{type: DataTypes.STRING},
        tiktok:{type: DataTypes.STRING},
        createdAt:{type: DataTypes.DATE},
        updatedAt:{type: DataTypes.DATE},
    },

    QuestionAttr: {
        id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        fullName:{type: DataTypes.STRING},
        phone:{type: DataTypes.STRING},
        email:{type: DataTypes.STRING},
        question:{type: DataTypes.STRING},
        createdAt:{type: DataTypes.DATE},
        updatedAt:{type: DataTypes.DATE},
    },

    UserAttr: {
        id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        fullName:{type: DataTypes.STRING},
        username:{type: DataTypes.STRING},
        email:{type: DataTypes.STRING, allowNull: true},
        role:{type: DataTypes.INTEGER},
        password:{type: DataTypes.STRING},
        phoneNumber:{type: DataTypes.STRING},
        occupation:{type: DataTypes.STRING},
        city:{type: DataTypes.STRING},
        district:{type: DataTypes.STRING},
        address:{type: DataTypes.STRING},
        instagram:{type: DataTypes.STRING},
        tiktok:{type: DataTypes.STRING},
        createdAt:{type: DataTypes.DATE},
        updatedAt:{type: DataTypes.DATE},
        refreshToken:{type: DataTypes.STRING}
    },

}

module.exports = {
    Attr
}