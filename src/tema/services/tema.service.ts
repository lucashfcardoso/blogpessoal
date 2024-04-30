import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Tema } from "../entities/tema.entity";

@Injectable()
export class TemaService {
    constructor (
        @InjectRepository (Tema)                                       //Usar métodos do repository na classe tema (entity)
        private temaRepository: Repository<Tema>
    ) {}

    async findAll(): Promise<Tema[]> {                                //Método listar todas
        return await this.temaRepository.find({
            relations: {postagem:true}                                //Relacionar com postagem
        });
    }

    async findById(id: number): Promise<Tema> {                       //Métodos listar por id
        let tema = await this.temaRepository.findOne({
            where: {id},
            relations: {postagem:true}                               //Relacionar com postagem
        });

        if (!tema) 
            throw new HttpException ('Tema não encontrada!', HttpStatus.NOT_FOUND);
            return tema;
    }

    async findByDescricao (descricao: string): Promise<Tema[]> {    //Métodos listar por descricao
        return await this.temaRepository.find ({
            where: {descricao: ILike (`%${descricao}}%`)},
            relations: {postagem:true}                              //Relacionar com postagem
        })
    }

    async create (tema: Tema): Promise<Tema>{        //Método postar
        return await this.temaRepository.save (tema);
    }

    async update (tema: Tema): Promise<Tema>{        //Método atualizar
        let buscaTema: Tema = await this.findById (tema.id);
        if (!buscaTema || !tema.id)
            throw new HttpException ('Tema não foi encontrado!', HttpStatus.NOT_FOUND)
        return await this.temaRepository.save (tema);
    }

    async delete (id: number): Promise<DeleteResult>{            //Método deletar
        let buscaTema: Tema = await this.findById (id);
        if (!buscaTema)
            throw new HttpException ('Tema não foi encontrado!', HttpStatus.NOT_FOUND)
        return await this.temaRepository.delete (id);
    }
}