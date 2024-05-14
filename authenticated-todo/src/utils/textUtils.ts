import { randomBytes } from 'crypto';

export function generateCallId() {
	const bytes = randomBytes(6);
	const hexString = bytes.toString('hex');
	const callId: string = `${hexString}-9`;
	return callId;
}
