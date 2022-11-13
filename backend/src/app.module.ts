import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
// import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { ExerciseModule } from './exercise/exercise.module';
import { Exercise } from './exercise/entities/exercise.entity';
// import { ExerciseController } from './exercise/exercise.controller';

@Module({
  imports: [
    AuthModule,
    UserModule,
    TypeOrmModule.forRoot({
      //set the typeorm
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: 'postgres_test', // we should not set the username and password as plaintext here
      password: 'postgres_tes',
      database: 'postgres',
      entities: [User, Exercise],
      synchronize: true,
    }),
    ExerciseModule,
    // , ConfigModule.forRoot({ isGlobal: true }),
    //   TypeOrmModule.forRoot({
    //     type: 'postgres',
    //     host: 'localhost',
    //     port: 5432,
    //     username: process.env.TYPEORM_USERNAME,
    //     password: process.env.TYPEORM_PASSWORD,
    //     database: process.env.TYPEORM_DATABASE,
    //     entities: ['dist/**/*.entity{.ts,.js}'],
    //     synchronize: false,
    //   }
    // )
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
