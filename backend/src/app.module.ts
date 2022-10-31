import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
// import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';


@Module({
  imports: [AuthModule, UserModule, TypeOrmModule.forRoot({
    type: 'postgres',
    host: '192.168.0.104',
    port: 5432,
    username: 'postgres_test',
    password: 'postgres_tes',
    database: 'postgres',
    entities: [User],
    synchronize: false,
  })
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
export class AppModule { }
