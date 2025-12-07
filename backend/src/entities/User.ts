import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';
import * as bcrypt from 'bcryptjs';

// Interface para el tipo seguro (sin password ni métodos)
export interface SafeUserData {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  @IsEmail()
  email!: string;

  @Column()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  firstName!: string;

  @Column()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  lastName!: string;

  @Column({ select: false }) // select: false para no devolver el password en queries normales
  password!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  // Hash del password antes de insert o update 
  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }

  // Validar el password
  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  // Método para obtener datos seguros
  toSafe(): SafeUserData {
    return {
      id: this.id,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  // Método para JSON (se llama automáticamente)
  toJSON(): SafeUserData {
    return this.toSafe();
  }

}