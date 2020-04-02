const mongoose = require('mongoose');

const LanguageListSchema = new mongoose.Schema({
    userId: {
        type: String
    },
    languageList: {
        type: String
    }
});

module.exports = LanguageList = mongoose.model("languageLists", LanguageListSchema);
