import { ApiProperty } from '@nestjs/swagger';

class UserTokenDTO {
	@ApiProperty({
		example:
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhNzQxNWQwOC03YWZiLTQ0ZjctYjE4Yi03ZDU3NjM4MTFlZDciLCJlbWFpbCI6ImFuZHJlQG1haWwuY29tIiwibmFtZui6ImFuZHJlIiwicm9sZXMiOlsidXNlciIsImFkbWluIl0sImlhdCI6MTY1NzM2NTU1NSwiZXhwIjoxNjU3NDUxOTU1fQ.0kaxK5gxaAsk0r6PYdnCeWgy2nLEk4WgKGxdUzxmipI',
	})
	access_token: string;
}

export { UserTokenDTO };
