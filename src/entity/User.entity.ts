import {
  Column,
  Entity,
  getRepository,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { generatePassword } from '../utils/tools';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Index({ unique: true })
  @Column('varchar', { length: 500, nullable: true })
  email: string | null = null;

  @Column('varchar', { length: 1000, nullable: true })
  password: string = '';

  @Column('varchar', { length: 50 })
  firstName: string = '';

  @Column('varchar', { length: 50 })
  lastName: string = '';

  @Column('varchar', { length: 15000, nullable: true })
  photo: string = '';

  @Column('varchar', { length: 100, nullable: true })
  phone: string = '';

  @Column('text', { nullable: true })
  about: string = '';

  @Column({ type: 'timestamptz', default: 'now()' })
  createdAt: Date = new Date();

  @Column({ type: 'timestamptz' })
  updatedAt: Date = new Date();

  public static async createUser(email: string, password: string) {
    const userRepo = getRepository(User);
    const user = new User();
    user.email = email;
    user.password = generatePassword(password);
    await userRepo.save(user);
    return user;
  }
  public static async deleteUser(id: string) {
    const userRepo = getRepository(User);
    const user = await userRepo.findOne(id);
    if (user) {
      await userRepo.delete(user.id);
      return user;
    } else {
      throw new Error('User not found');
    }
  }
  public static async getAllusers() {
    return getRepository(User).find();
  }
  public static async getUser(id: string): Promise<User | undefined> {
    return getRepository(User).findOne(id);
  }
}
