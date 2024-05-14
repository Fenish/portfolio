import { Profile } from 'src/database/entities/profile.entity';
import { User } from 'src/database/entities/user.entity';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserService } from './user.service';

@Module({
	imports: [TypeOrmModule.forFeature([User, Profile])],
	providers: [UserService],
	exports: [TypeOrmModule],
})
export class UserModule {}
