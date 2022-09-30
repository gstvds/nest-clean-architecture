import { Entity } from './entity';

export abstract class Repository<T extends Entity> {
  abstract create(payload: T): Promise<T>;
  abstract update(id: number, payload: T): Promise<T>;
  abstract delete(id: number): Promise<void>;
  abstract getById(id: number): Promise<T>;
  abstract getAll(): Promise<T[]>;
}
