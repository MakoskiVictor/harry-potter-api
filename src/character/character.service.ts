import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCharacterDTO } from 'src/dto/create-character-dto';
import { Character } from 'src/entities/character.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CharacterService {
  constructor(
    @InjectRepository(Character)
    private characterRepository: Repository<Character>,
  ) {}

  async getAllCharacters() {
    const getCharacters = await this.characterRepository.find();

    if (!getCharacters) {
      return new HttpException('There are no characters', HttpStatus.NOT_FOUND);
    }

    return getCharacters;
  }

  async getCharacterById(id: number) {
    const searchCharacter = await this.characterRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!searchCharacter) {
      return new HttpException(
        "This character doesn't exist",
        HttpStatus.NOT_FOUND,
      );
    }

    return searchCharacter;
  }

  async postCharacter(character: CreateCharacterDTO) {
    const searchIfCharacterExist = await this.characterRepository.findOne({
      where: {
        name: character.name,
      },
    });

    if (searchIfCharacterExist) {
      return new HttpException(
        'This character alredy exist!',
        HttpStatus.CONFLICT,
      );
    }

    const newCharacter = new Character();
    newCharacter.name = character.name;
    newCharacter.gender = character.gender;
    newCharacter.house = character.house;
    newCharacter.image = character.image
      ? character.image
      : 'https://res-console.cloudinary.com/dl9pbe0eu/media_explorer_thumbnails/bb3df6a78ee7825a90f7eb64ea45fb3f/detailed';
  }

  async deleteCharacter(id: number) {
    const searchById = await this.characterRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!searchById) {
      return new HttpException('There are no recipes', HttpStatus.NOT_FOUND);
    }

    return this.characterRepository.remove(searchById);
  }
}
