const express = require('express');
const Repository = require('../db/repository');

const limit = 25;
let getPages = (val) =>{
    return val? val - 1 : 0
};

let getOffset = (page) =>{
    return page * limit;
};


module.exports = () =>{
    const router = express.Router();

    const countryRepository = new Repository('country');
    const countrylanguageRepository = new Repository('countrylanguage');
    const cityRepository = new Repository('city');

    router.get('/', async (req, res) =>{
        let countriesCount = await countryRepository.count();
        let citiesCount = await cityRepository.count();
        res.render('index', {countriesCount, citiesCount});
    });

    router.get('/countries.html', async (req, res) =>{
        let page = getPages(req.query.page);
        let offset = getOffset(page);
        let {count, rows: countries} = await countryRepository.findAndCountAll({limit, offset});
        res.render('countries', {
            countries,
            pagination: {
                page: page + 1,
                first: offset,
                last: offset + limit
            },
            pages: Math.floor(count / limit) + 1
        });
    });

    router.get('/countries/:code.html', async (req, res) =>{
        let country = await countryRepository.readWhere({where: {code: req.params.code}});
        let citiesCount = await cityRepository.count({where: {CountryCode: country.Code}});
        let Capital = await cityRepository.readWhere({where: {ID: country.Capital}});
        let threeCities = await cityRepository.model.findAll({
            where: {CountryCode: country.Code},
            order: [['population', 'DESC']],
            raw: true
        });
        const languages = await countrylanguageRepository.model.findAll({
            where: {CountryCode: country.Code},
            order: [['Percentage', 'DESC']],
            raw: true
        });
        res.render('country', {
            country,
            citiesCount,
            Capital,
            threeCities: threeCities.slice(0, 3),
            languages: languages.map(lang =>{
                const speakersCount = (lang.Percentage / 100) * country.Population;

                return {
                    name: lang.Language,
                    percentage: lang.Percentage,
                    speakersCount: Math.floor(speakersCount),
                    isOfficial: lang.IsOfficial
                };
            })
        });
    });

    router.get('/cities/:ID.html', async (req, res) =>{
        let {ID} = req.params;
        let city = await  cityRepository.read(ID);
        let country = await countryRepository.readWhere({where: {Code: city.CountryCode}});
        let Capital = await cityRepository.readWhere({where: {ID: country.Capital}});
        let officialLanguages = await countrylanguageRepository.model.findAll({where: {CountryCode: country.Code, isOfficial: 'T'}});
        res.render('city', {city, country, Capital,officialLanguages});
    });


    return router;
};
