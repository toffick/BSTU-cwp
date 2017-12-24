class Validator {
    constructor(){
        this.validTypes = {
            FILM: "films",
            ACTOR: "actors"
        };

        this.fieldsSetCreateFilm = new Set(['title', 'rating', 'budget', 'year', 'gross', 'poster', 'position','id']);
        this.fieldsSetCreateActor = new Set(['name', 'birth', 'films', 'liked', 'photo', 'id']);
        this.messages = {
            VALID: {message: "Valid", status: 200},
            BUDGET: {message: "The budget value lesser than null", status: 601},
            CINEMAYEARBORN: {message: "Bad year value(lesser than cinema was born)", status: 602},
            YEAR: {message: "Year value biggest than current year", status: 603},
            INVALIDINPUTDATA: {message: "Invalid input data", status: 422},
            BADRATINGRANGE: {message: "The rating value can be in range from 0 to 10", status: 604},
            BADFILMSVALUE: {message: "The film value is lesser than null", status: 605}
        };
    }

    isValidCreateBody(data, type){
        let set, validMsg;
        switch (type) {
            case this.validTypes.ACTOR:
                validMsg = this.messages.VALID;
                set = this.fieldsSetCreateActor;
                break;
            case this.validTypes.FILM:
                validMsg = this.filmInfoValidation(data);
                set = this.fieldsSetCreateFilm;
                break;
        }

        if (validMsg === this.messages.VALID) {
            let dataFields = Object.keys(data);
            if (this.checkRequestFieldExist(dataFields, set))
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

    filmInfoFieldsNumber(fields, set){
        return fields.length === set.size;
    }

    checkRequestFieldExist(fields, fieldsSet){
        for (let i = 0; i < fields.length; i++) {
            if (!fieldsSet.has(fields[i])) {
                console.log(1);
                return false;
            }
        }
        return true;
    }

    isValidCreateAuthor(body){

    }
}

module.exports = Validator;