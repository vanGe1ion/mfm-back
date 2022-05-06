import axios from 'axios';
import { IGetMoviesParams, IGetMoviesResponse } from '../types';
import {
  toMoviesAPIRequestParams,
  toIGetMoviesResponse,
} from './APITypeConverter';

const movieDBClient = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  params: {
    api_key: process.env.TMDB_API_KEY,
    language: 'en-EN',
  },
});

export const tmdbGetDiscover = async (
  IGetMoviesParams: IGetMoviesParams,
): Promise<IGetMoviesResponse> => {
  const APIRequestParams = toMoviesAPIRequestParams(IGetMoviesParams);
  const response = await movieDBClient.get('/discover/movie', {
    params: APIRequestParams,
  });
  return toIGetMoviesResponse(response.data);
};
