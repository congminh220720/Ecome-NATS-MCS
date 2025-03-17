import { IRepository } from "../../../share/interfaces";
import { PagingDTO } from "../../../share/models/paging";
import { Brand } from "../model/brand";
import { BrandCondDTO, BrandCreateDTO, BrandUpdateDTO } from "../model/dto";

export interface CreateCommand {
    dto: BrandCreateDTO
}

export interface UpdateCommand {
    id: string
    dto: BrandUpdateDTO
}

export interface DeleteCommand {
    id: string
    isHardDelete: boolean;
}

export interface GetCommand {
    id: string
}

export interface ListCommand {
    cond: BrandCondDTO
    paging: PagingDTO;

}


export interface IBrandRepository extends IRepository<Brand,BrandUpdateDTO, BrandCondDTO> {}