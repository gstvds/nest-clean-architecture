import axios, { AxiosInstance } from 'axios';
import { Injectable } from '@nestjs/common';

import { Entity } from 'src/core/base/entity';
import { Repository } from 'src/core/base/repository';

@Injectable()
export class JSONServerRepository<T extends Entity> extends Repository<T> {
  protected client: AxiosInstance;

  constructor(path: string) {
    super();
    this.client = axios.create({ baseURL: `http://localhost:3004/${path}` });
  }

  public async create(payload: T): Promise<T> {
    const { data: createdUser } = await this.client.post<T>('/', {
      ...payload,
    });
    return createdUser;
  }

  public async update(id: number, payload: T): Promise<T> {
    const { data: updatedUser } = await this.client.put<T>(`/${id}`, {
      ...payload,
    });
    return updatedUser;
  }

  public async delete(id: number): Promise<void> {
    await this.client.delete(`/${id}`);
  }

  public async getById(id: number): Promise<T> {
    try {
      const { data: user } = await this.client.get<T>(`/${id}`);
      return user;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  public async getAll(): Promise<T[]> {
    const { data: users } = await this.client.get<T[]>('/');
    return users;
  }
}
