import { Module } from '@nestjs/common';
import { GraphQLModule } from "@nestjs/graphql"
import { DatabaseModule } from './shared/database/database.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { join } from 'path';

@Module({
  imports: [DatabaseModule,
    GraphQLModule.forRoot({
      debug: true,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      introspection: true,
      installSubscriptionHandlers: true,
      path: 'admin',
      context: ({ req }) => ({ req }),
    }),
    AuthenticationModule,
  ],
  controllers: []
})
export class AppModule { }
