import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class CepService {
  async getCepInfo(cep: string) {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      if (response.data.erro) {
        // Lança uma exceção se o CEP for inválido ou não encontrado
        throw new HttpException(
          'CEP inválido ou não encontrado',
          HttpStatus.BAD_REQUEST,
        );
      }
      return response.data;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
