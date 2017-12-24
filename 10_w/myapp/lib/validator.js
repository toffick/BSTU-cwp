class Validator {
    constructor(){
        this.fieldsSetCreate = new Set(['title', 'rating', 'budget', 'year', 'gross', 'poster', 'position']);
        this.fieldsSetUpdate = new Set([...this.fieldsSetCreate, 'id']);
        this.messages = {
            VALID: {message: "Valid", status: 200},
            BUDGET: {message: "The budget value lesser than null", status: 601},
            CINEMAYEARBORN: {message: "Bad year value(lesser than cinema was born)", status: 602},
            YEAR: {message: "Year value biggest than current year", status: 603},
            INVALIDINPUTDATA: {message: "Invalid input data", status: 422},
            BADRATINGRANGE: {message: "The rating value can be in range from 0 to 10", status: 604},

        };
    }

    isValidCreateFilm(data){
        let validMsg = this.filmInfoValidation(data);
        if (validMsg === this.messages.VALID) {
            let dataFields = Object.keys(data);
            if (this.filmInfoFieldsNumber(dataFields)
                && this.filmInfoFieldsCorrectName(dataFields, this.fieldsSetCreate))
                return this.messages.VALID;
            else
                return this.messages.INVALIDINPUTDATA;
        }
        else
            return validMsg;

    }

    isValidUpdateFilm(data){
        let validMsg = this.filmInfoValidation(data);
        if (validMsg === this.messages.VALID) {
            let dataFields = Object.keys(data);
            if (this.filmInfoFieldsCorrectName(dataFields, this.fieldsSetUpdate))
                return this.messages.VALID;
            else
                return this.messages.INVALIDINPUTDATA;
        }
        else
            return validMsg;
    }

    filmInfoValidation(data){
        let {budget = 200000, year = 2005, rating} = data;      //костыль для апдейта
        if (budget < 0)
            return this.messages.BUDGET;
        if (year < 1924)
            return this.messages.CINEMAYEARBORN;
        if (year > (new Date).getFullYear())
            return this.messages.YEAR;
        if (rating < 0 || rating > 10)
            return this.messages.BADRATINGRANGE;
        return this.messages.VALID;
    }

    filmInfoFieldsNumber(fields){
        return fields.length === this.fieldsSetCreate.size;
    }

    filmInfoFieldsCorrectName(fields, fieldsSet){
        for (let i = 0; i < fields.length; i++) {
            if (!fieldsSet.has(fields[i])) {
                return false;
            }
        }
        return true;
    }

}

module.exports = Validator;