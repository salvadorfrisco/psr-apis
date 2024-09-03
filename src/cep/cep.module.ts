import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CepService } from './cep.service';
import { CepController } from './cep.controller';

@Module({
  imports: [HttpModule], // Importa o HttpModule para fazer requisições HTTP
  providers: [CepService],
  controllers: [CepController],
})
export class CepModule {}
