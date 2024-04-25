//CLASSE CONTROLLER - RESPONSÁVEL POR MOSTRAR PARA NÓS OS MÉTODOS CRIADOS NA CLASSE SERVICE 

import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { PostagemService } from "../services/postagem.services";
import { Postagem } from "../entities/postagem.entity";
 
@Controller("/postagens")                                                      //Final da URL, fica: localhost4000/postagens
export class PostagemController {
    constructor (private readonly postagemService: PostagemService) {}
    
    @Get ()                                                                    //Chamada do método listar todas
    @HttpCode (HttpStatus.OK)
    findall (): Promise<Postagem[]> {
        return this.postagemService.findAll()
    }

    @Get ('/:id')                                                              //Chamada de método listar por Id
    @HttpCode (HttpStatus.OK)
    findById (@Param ('id', ParseIntPipe) id: number): Promise<Postagem>{
        return this.postagemService.findById(id);
    }

    @Get ('/titulo/:titulo')                                                   //Chamada de método listar por título
    @HttpCode (HttpStatus.OK)
    findByTitulo (@Param ('titulo') titulo: string): Promise<Postagem[]>{
        return this.postagemService.findByTitulo (titulo);
    }

    @Post()                                                                     //Chamada do método criar postagem
    @HttpCode(HttpStatus.CREATED)
    create (@Body() postagem: Postagem): Promise<Postagem>{
        return this.postagemService.create(postagem);
    }

    @Put()                                                                      //Chamada do método atualizar
    @HttpCode(HttpStatus.OK)
    update (@Body() postagem: Postagem): Promise<Postagem>{
        return this.postagemService.update(postagem);
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number){
        return this.postagemService.delete(id);
    }
}