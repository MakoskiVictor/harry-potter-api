import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty, IsUrl } from 'class-validator';

@Entity({ name: 'characters' })
export class Character {
  @PrimaryGeneratedColumn('increment')
  @IsNotEmpty()
  id: number;

  @Column({ type: 'varchar' })
  @IsNotEmpty()
  name: string;

  @Column({ type: 'varchar' })
  @IsNotEmpty()
  gender: string;

  @Column({ type: 'varchar' })
  @IsNotEmpty()
  house: string;

  @Column({ type: 'varchar' })
  @IsUrl()
  image: string;
}
