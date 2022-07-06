import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/createUser.dto';
import { LoginDto } from './dto/login.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { compare } from 'bcryptjs';

// UsersService- email및 password로 검색하는 find 메소드
// 사용자 모델 및 지속성 계층을 구축합니다.
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createTestUser(userData: LoginDto): Promise<object> {
    const newTestUser = this.userRepository.create(userData);
    await this.userRepository.insert(newTestUser);
    return { message: 'Create success', data: userData };
  }

  async getUser(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('해당 사용자를 찾을 수 없습니다.');
    }

    return user;
  }

  async createUser(createUserDto: CreateUserDTO): Promise<User> {
    const { email, password, comfirmPassword } = createUserDto;

    if (password !== comfirmPassword) {
      throw new BadRequestException('비밀번호가 서로 일치하지 않습니다.');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.userRepository.create({
      email,
      password: hashedPassword,
    });

    try {
      await this.userRepository.save(user);
      return user;
    } catch (error) {
      if (error.errno === 1062) {
        throw new ConflictException('해당 이메일은 이미 사용중입니다.');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: { email: email },
    });
  }

  async setCurrentRefreshToken(refreshToken: string, id: number) {
    // DB에 발급받은 Refresh Token을 암호화하여 저장(bycrypt)
    const salt = await bcrypt.genSalt();
    const hashedRefreshToken = await bcrypt.hash(refreshToken, salt);
    await this.userRepository.update(id, { hashedRefreshToken });
  }

  async getUserRefreshTokenMatches(refreshToken: string, id: number) {
    // 데이터베이스 조회해 Refresh Token이 유효한지 확인
    const user = await this.getUser(id);
    const isRefreshTokenMatching = await compare(
      refreshToken,
      user.hashedRefreshToken,
    );

    if (isRefreshTokenMatching) return user;
  }

  async removeRefreshToken(id: number) {
    // Refresh Token 값을 null로 바꿈
    return this.userRepository.update(id, {
      hashedRefreshToken: null,
    });
  }
}
