import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
    DeepPartial,
    FindManyOptions,
    FindOneOptions,
    Repository,
} from 'typeorm';

@Injectable()
export class CRUDService<T, Y> {
    protected readonly repository: Repository<T>;
    constructor(repository?: Repository<T>) {
        if (repository) {
            this.repository = repository;
        }
    }
    public async findAll(options?: FindManyOptions<T>): Promise<T[]> {
        return this.repository.find(options);
    }
    public async findOneById(id: string): Promise<T> {
        return await this.repository.findOneOrFail(id);
    }
    public async count(options?: FindManyOptions<T>): Promise<number> {
        return await this.repository.count(options);
    }
    public async findOne(options?: FindOneOptions<T>): Promise<T | null> {
        try {
            const result = await this.repository.findOneOrFail(options);
            return result;
        } catch (err) {
            return null;
        }
    }
}
