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

    if (getCharacters.length === 0) {
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
      : 'https://media.gettyimages.com/id/1196083861/es/vector/simple-man-head-icon-set.jpg?s=612x612&w=0&k=20&c=8vkM7uUsx1fIofoc-_J2QS_3tN6xqtxLD--9_OEvUhU=';

    return this.characterRepository.save(newCharacter);
  }

  async deleteCharacter(id: number) {
    const searchById = await this.characterRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!searchById) {
      return new HttpException('This id is invalid', HttpStatus.NOT_FOUND);
    }

    return this.characterRepository.remove(searchById);
  }
}
