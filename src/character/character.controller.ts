import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CreateCharacterDTO } from 'src/dto/create-character-dto';

@Controller('character')
export class CharacterController {
  constructor(private characterService: CharacterService) {}

  @Get()
  getAllCharacters() {
    return this.characterService.getAllCharacters;
  }

  @Get(':id')
  getCharacterById(@Param('id') id: number) {
    return this.characterService.getCharacterById(id);
  }

  @Post()
  postRecipe(@Body() newCharacter: CreateCharacterDTO) {
    return this.characterService.postCharacter(newCharacter);
  }

  @Delete(':id')
  deleteCharacter(@Param('id') id: number) {
    return this.characterService.deleteCharacter(id);
  }
}
