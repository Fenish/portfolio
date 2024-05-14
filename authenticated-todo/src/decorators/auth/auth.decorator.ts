import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { ProtectedRouteGuard } from '../../api/authentication/guards/protected.guard';

export function ProtectedRoute() {
	return applyDecorators(UseGuards(ProtectedRouteGuard), ApiBearerAuth());
}
