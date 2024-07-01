import { Resolver, Mutation, Arg, Query } from "type-graphql";
import { Country } from "../entity/Country";

@Resolver()
export class CountryResolver {
    @Mutation(() => Country)
    async createCountry(
        @Arg("code") code: string,
        @Arg("name") name: string,
        @Arg("emoji") emoji: string,
        @Arg("continent") continent: string
    ) {
        const country = await Country.create({
            code,
            name,
            emoji,
            continent,
        }).save();

        return country;
    }

    @Query(() => [Country])
    countries() {
        return Country.find();
    }

    @Query(() => Country, { nullable: true })
    country(@Arg("code") code: string) {
        return Country.findOne({ where: { code } });
    }

    @Query(() => [Country])
    countriesByContinent(@Arg("continent") continent: string) {
        return Country.find({ where: { continent } });
    }

    @Mutation(() => Boolean)
    async loadFixtures() {
        const countries = [
            { code: 'FR', name: 'France', emoji: '🇫🇷', continent: 'EU' },
            { code: 'BE', name: 'Belgium', emoji: '🇧🇪', continent: 'EU' },
            { code: 'AN', name: 'Andorra', emoji: '🇦🇩', continent: 'EU' },
            // add more countries as needed
        ];

        for (const country of countries) {
            const countryEntity = Country.create();
            countryEntity.code = country.code;
            countryEntity.name = country.name;
            countryEntity.emoji = country.emoji;
            countryEntity.continent = country.continent;
            await countryEntity.save();
        }
        return true;
    }
}
