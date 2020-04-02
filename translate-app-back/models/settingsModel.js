const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema({
    userId: {
        type: String
    },
    languagePreference: {
        type: String,
        default: null
    },
    wordsCount: {
        type: Number,
        default: 10
    }
});

module.exports = Settings = mongoose.model("settings", SettingsSchema);
