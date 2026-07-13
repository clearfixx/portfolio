import type { EditorAction } from './editorTypes'

export const FINAL_CODE = `import { Inject, Injectable } from '@nestjs/common';

import { UserNotFoundException } from '../../domain/exceptions/user-not-found.exception';
import { UserMapper } from '../../domain/mappers/user.mapper';
import {
  USERS_REPOSITORY,
  type UsersRepository,
} from '../../domain/repositories/users.repository.interface';
import type { SafeUser } from '../../domain/types/safe-user.type';
import type { UserRecord } from '../../domain/types/user-record.type';
import type { UpdateUserProfileData } from '../types/update-user-profile-data.type';
import type { UserResponseDto } from '../dto';
import { UserResponseMapper } from '../mappers';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USERS_REPOSITORY)
    private readonly usersRepository: UsersRepository,
  ) {}

  async getById(id: string): Promise<UserResponseDto> {
    const user = await this.usersRepository.findById(id);

    return this.toResponseDto(this.requireUser(user));
  }

  async updateProfile(
    id: string,
    profile: UpdateUserProfileData,
  ): Promise<UserResponseDto> {
    const user = await this.usersRepository.updateById(id, {
      displayName: profile.displayName,
      bio: profile.bio,
    });

    return this.toResponseDto(user);
  }

  private requireUser(user: UserRecord | null): UserRecord {
    if (!user) {
      throw new UserNotFoundException();
    }

    return user;
  }

  private toSafeUser(user: UserRecord): SafeUser {
    return UserMapper.toSafeUser(user);
  }

  private toResponseDto(user: UserRecord): UserResponseDto {
    return UserResponseMapper.toDto(this.toSafeUser(user));
  }
}`

export const EDITOR_SCRIPT: EditorAction[] = [
  { type: 'type', text: 'import { Inject, Injectablee' },
  { type: 'issue', active: true },
  { type: 'pause', duration: 520 },
  { type: 'backspace', count: 1 },
  { type: 'issue', active: false },
  { type: 'type', text: " } from '@nestjs/common';" },
  { type: 'pause', duration: 360 },
  {
    type: 'type',
    text: "\n\nimport { UserNotFoundException } from '../../domain/exceptions/user-not-found.exception';",
  },
  {
    type: 'type',
    text: "\nimport { UserMapper } from '../../domain/mappers/user.mapper';",
  },
  { type: 'type', text: '\nimport {' },
  { type: 'type', text: '\n  USERS_REPOSITORY,' },
  { type: 'type', text: '\n  type UsersRepository,' },
  {
    type: 'type',
    text: "\n} from '../../domain/repositories/users.repository.interface';",
  },
  {
    type: 'type',
    text: "\nimport type { SafeUser } from '../../domain/types/safe-user.type';",
  },
  {
    type: 'type',
    text: "\nimport type { UserRecord } from '../../domain/types/user-record.type';",
  },
  {
    type: 'type',
    text: "\nimport type { UpdateUserProfileData } from '../types/update-user-profile-data.type';",
  },
  {
    type: 'type',
    text: "\nimport type { UserResponseDto } from '../dto';",
  },
  {
    type: 'type',
    text: "\nimport { UserResponseMapper } from '../mappers';",
  },
  { type: 'pause', duration: 620 },
  { type: 'type', text: '\n\n@Injectable()' },
  { type: 'type', text: '\nexport class UsersService {' },
  { type: 'type', text: '\n  constructor(' },
  { type: 'type', text: '\n    @Inject(USERS_REPOSITORY)' },
  {
    type: 'type',
    text: '\n    private readonly usersRepository: UsersRepository,',
  },
  { type: 'type', text: '\n  ) {}' },
  { type: 'pause', duration: 480 },
  {
    type: 'type',
    text: '\n\n  async getById(id: string): Promise<UserResponseDto> {',
  },
  { type: 'type', text: '\n    const usee' },
  { type: 'issue', active: true },
  { type: 'pause', duration: 680 },
  { type: 'backspace', count: 1 },
  { type: 'issue', active: false },
  {
    type: 'type',
    text: 'r = await this.usersRepository.findByI',
  },
  { type: 'issue', active: true },
  { type: 'type', text: 'D' },
  { type: 'pause', duration: 540 },
  { type: 'backspace', count: 1 },
  { type: 'issue', active: false },
  { type: 'type', text: 'd(id);' },
  { type: 'pause', duration: 360 },
  {
    type: 'type',
    text: '\n\n    return this.toResponseDto(this.requireUser(user));',
  },
  { type: 'type', text: '\n  }' },
  { type: 'pause', duration: 560 },
  { type: 'type', text: '\n\n  async updateProfile(' },
  { type: 'type', text: '\n    id: string,' },
  { type: 'type', text: '\n    profile: UpdateUserProfileData,' },
  { type: 'type', text: '\n  ): Promise<UserResponseDto> {' },
  {
    type: 'type',
    text: '\n    const user = await this.usersRepository.updateById(id, {',
  },
  { type: 'type', text: '\n      displayName: profile.name,' },
  { type: 'issue', active: true },
  { type: 'pause', duration: 760 },
  { type: 'deleteLine' },
  { type: 'issue', active: false },
  { type: 'pause', duration: 280 },
  { type: 'type', text: '      displayName: profile.displayName,' },
  { type: 'type', text: '\n      bio: profile.bio,' },
  { type: 'type', text: '\n    });' },
  {
    type: 'type',
    text: '\n\n    return this.toResponseDto(user);',
  },
  { type: 'type', text: '\n  }' },
  { type: 'pause', duration: 520 },
  { type: 'pause', duration: 540 },
  {
    type: 'type',
    text: '\n\n  private requireUser(user: UserRecord | null): UserRecord {',
  },
  { type: 'type', text: '\n    if (!user) {' },
  { type: 'type', text: '\n      throw new UserNotFoundException();' },
  { type: 'type', text: '\n    }' },
  { type: 'type', text: '\n\n    return user;' },
  { type: 'type', text: '\n  }' },
  { type: 'pause', duration: 420 },
  {
    type: 'type',
    text: '\n\n  private toSafeUser(user: UserRecord): SafeUser {',
  },
  { type: 'type', text: '\n    return UserMapper.toSafeUser(user);' },
  { type: 'type', text: '\n  }' },
  {
    type: 'type',
    text: '\n\n  private toResponseDto(user: UserRecord): UserResponseDto {',
  },
  {
    type: 'type',
    text: '\n    return UserResponseMapper.toDto(this.toSafeUser(user));',
  },
  { type: 'type', text: '\n  }' },
  { type: 'type', text: '\n}' },
]
