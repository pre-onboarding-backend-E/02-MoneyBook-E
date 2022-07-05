import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { User } from './user.entity';

// UsersService- email및 password로 검색하는 find 메소드
// 사용자 모델 및 지속성 계층을 구축합니다.
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    this.userRepository = userRepository;
  }

  async createTestUser(userData: LoginDto): Promise<object> {
    const newTestUser = this.userRepository.create(userData);
    await this.userRepository.insert(newTestUser);
    return { message: 'Create success', data: userData };
  }
}
