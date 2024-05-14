import { Module } from '@nestjs/common';

import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';

@Module({
	imports: [UserModule],
	controllers: [AuthenticationController],
	providers: [AuthenticationService, UserService],
})
export class AuthenticationModule {}
