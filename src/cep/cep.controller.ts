import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CepService } from './cep.service';
import { CustomBadRequestException } from 'src/exceptions/custom-bad-request.exception';

@Controller('cep')
export class CepController {
  constructor(private readonly cepService: CepService) {}

  @Post()
  async getCep(@Body() body: { cep: string }) {
    const cep = body.cep;

    if (!cep || !/^\d{5}-?\d{3}$/.test(cep)) {
      throw new CustomBadRequestException('Formato de CEP inválido');
    }

    try {
      const cepInfo = await this.cepService.getCepInfo(cep);
      return cepInfo;
    } catch (error) {
      if (error.response && error.response.status === HttpStatus.BAD_REQUEST) {
        throw new CustomBadRequestException(error.response.message);
      }

      throw new HttpException(
        { message: 'Erro ao buscar informações do CEP' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
