//CLASSE SERVICE - CRIADORA DOS MÉTODOS (LISTAR TODAS AS POSTAGENS, LISTAR POR ID)

import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Postagem } from "../entities/postagem.entity";
import { TemaService } from "src/tema/services/tema.service";

@Injectable()
export class PostagemService {
    constructor (
        @InjectRepository (Postagem)                              //Usar métodos do repository na classe postagem (entity)
        private postagemRepository: Repository<Postagem>,
        private temaService: TemaService
    ) {}

    async findAll(): Promise<Postagem[]> {                        //Método listar todas
        return await this.postagemRepository.find({
            relations: {tema:true, usuario: true}                                //Relacionar com tema
        });
    }

    async findById(id: number): Promise<Postagem> {               //Métodos listar por id
        let postagem = await this.postagemRepository.findOne({
            where: {id}, 
            relations: {tema:true, usuario: true}                                //Relacionar com tema
        });

        if (!postagem) 
            throw new HttpException ('Postagem não encontrada!', HttpStatus.NOT_FOUND);
            return postagem;
    }

    async findByTitulo (titulo: string): Promise<Postagem[]> {    //Métodos listar por título
        return await this.postagemRepository.find ({
            where: {titulo: ILike (`%${titulo}%`)},
            relations: {tema:true, usuario: true}                                //Relacionar com tema
        })
    }

    async create (postagem: Postagem): Promise<Postagem>{        //Método postar
        if (postagem.tema){
            let tema = await this.temaService.findById (postagem.tema.id)
        if (!tema)
            throw new HttpException ("Tema não encontrado!", HttpStatus.NOT_FOUND);
        return await this.postagemRepository.save (postagem);
        }
        return await this.postagemRepository.save (postagem);
    }

    async update (postagem: Postagem): Promise<Postagem>{        //Método atualizar
        let buscaPostagem: Postagem = await this.findById (postagem.id);
        if (!buscaPostagem || !postagem.id)
            throw new HttpException ('Postagem não foi encontrada!', HttpStatus.NOT_FOUND)
        if (postagem.tema){
            let tema = await this.temaService.findById (postagem.tema.id)
        if (!tema)
            throw new HttpException ('Tema não encontrado!', HttpStatus.NOT_FOUND);
        return await this.postagemRepository.save (postagem);
        }
        return await this.postagemRepository.save (postagem);
    }

    async delete (id: number): Promise<DeleteResult>{            //Método deletar
        let buscaPostagem: Postagem = await this.findById (id);
        if (!buscaPostagem)
            throw new HttpException ('Postagem não foi encontrada!', HttpStatus.NOT_FOUND)
        return await this.postagemRepository.delete (id);
    }
}
