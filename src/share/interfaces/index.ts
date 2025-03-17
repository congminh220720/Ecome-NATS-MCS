import { PagingDTO } from "../models/paging";

export interface IRepository<Entity, UpdateDTO, Cond> extends ICommandRepository<Entity, UpdateDTO>, IQueryRepository<Entity, Cond> {}


export interface ICommandRepository <Entity, UpdateDTO> {
    insert: (data: Entity) => Promise<boolean>;
    update: (id: string, data: UpdateDTO) => Promise<boolean>;
    delete: (id: string) => Promise<boolean>;
    softDelete: (id: string) => Promise<boolean>;
}

export interface IQueryRepository <Entity, Cond> { 
    get: (id: string) => Promise<Entity | null>;
    list: (cond: Cond, paging: PagingDTO) => Promise<Entity[]>;
    findCond: (cond: Cond) => Promise<Entity | null>;
}


export interface ICommandHandler<Cmd, Result> {
    execute: (cmd: Cmd) => Promise<Result>
}

export interface IQueryHandler<Query, Result> {
    query: (query: Query) => Promise<Result>
}
