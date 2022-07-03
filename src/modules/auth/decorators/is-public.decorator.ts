import { SetMetadata } from '@nestjs/common';

const IS_PUBLIC_KEY = 'isPublic';

const IsPublic = () => SetMetadata(IS_PUBLIC_KEY, true);

export { IS_PUBLIC_KEY, IsPublic };
