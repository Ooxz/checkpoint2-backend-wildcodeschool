import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { CountryResolver } from "./resolver/CountryResolver";

async function main() {
    await createConnection();

    const schema = await buildSchema({
        resolvers: [CountryResolver],
    });

    const server = new ApolloServer({ schema });

    server.listen().then(({ url }) => {
        console.log(`Server is running at ${url}`);
    });
}

main();
