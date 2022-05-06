import { Query, Resolver } from '@nestjs/graphql';
import { ApiService } from './api.service';
import { ApiGenre } from './object-types';

@Resolver()
export class ApiResolver {
  constructor(private apiService: ApiService) {}

  @Query((returns) => [ApiGenre])
  async getGenres(): Promise<ApiGenre[]> {
    return await this.apiService.getGenres();
  }
}
