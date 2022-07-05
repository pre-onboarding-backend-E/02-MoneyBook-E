import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/createUser.dto';
import { LoginDto } from './dto/login.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';

// UsersService- email및 password로 검색하는 find 메소드
// 사용자 모델 및 지속성 계층을 구축합니다.
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
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

  async createUSer(createUserDto: CreateUserDTO): Promise<User> {
    const { email, password, comfirmPassword } = createUserDto;

    if (password !== comfirmPassword) {
      throw new BadRequestException('비밀번호가 서로 일치하지 않습니다.');
    }

    const salt = await bcrypt.genSalt();
    const hashedPasswod = await bcrypt.hash(password, salt);

    const user = this.userRepository.create({ email, password: hashedPasswod });
    console.log(user);
    try {
      await this.userRepository.save(user);
      return user;
    } catch (error) {
      return error;
    }
  }

  async login(userData: LoginDto) {
    return;
  }

  async findUser(userData: LoginDto) {
    const { email, password } = userData;
    // email, password 없으면 400 Bad Request;

    const user = this.userRepository.findOne({
      where: { email: email, password: password },
    });
    // 존재하지 않는 유저 => 404 Not Found;

    return user;
  }
}
