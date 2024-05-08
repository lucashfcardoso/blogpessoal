//CLASSE CONTROLLER - RESPONSÁVEL POR MOSTRAR PARA NÓS OS MÉTODOS CRIADOS NA CLASSE SERVICE 

import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { PostagemService } from "../services/postagem.services";
import { Postagem } from "../entities/postagem.entity";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";
 
@UseGuards(JwtAuthGuard)
@Controller("/postagens")                                                      //Final da URL, fica: localhost:4000/postagens
export class PostagemController {
    constructor (private readonly postagemService: PostagemService) {}
    
    @Get ()                                                                    //Chamada do método listar todas
    @HttpCode (HttpStatus.OK)                                                  //localhost:4000/postagens
    findall (): Promise<Postagem[]> {
        return this.postagemService.findAll()
    }

    @Get ('/:id')                                                              //Chamada de método listar por Id
    @HttpCode (HttpStatus.OK)                                                  //localhost:4000/postagens/nºid
    findById (@Param ('id', ParseIntPipe) id: number): Promise<Postagem>{
        return this.postagemService.findById(id);
    }

    @Get ('/titulo/:titulo')                                                   //Chamada de método listar por título
    @HttpCode (HttpStatus.OK)                                                  //localhost:4000/postagens/titulo/nometitulo
    findByTitulo (@Param ('titulo') titulo: string): Promise<Postagem[]>{
        return this.postagemService.findByTitulo (titulo);
    }

    @Post()                                                                     //Chamada do método criar postagem
    @HttpCode(HttpStatus.CREATED)                                               //localhost:4000/postagens (JSON)
    create (@Body() postagem: Postagem): Promise<Postagem>{                 
        return this.postagemService.create(postagem);
    }

    @Put()                                                                      //Chamada do método atualizar
    @HttpCode(HttpStatus.OK)                                                    //localhost:4000/postagens (JSON - informar id)
    update (@Body() postagem: Postagem): Promise<Postagem>{
        return this.postagemService.update(postagem);
    }

    @Delete('/:id')                                                             //Chamada do método deletar
    @HttpCode(HttpStatus.NO_CONTENT)                                            //localhost:4000/postagens/nºid
    delete(@Param('id', ParseIntPipe) id: number){
        return this.postagemService.delete(id);
    }
}