import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { TemaService } from "../services/tema.service";
import { Tema } from "../entities/tema.entity";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";

@UseGuards(JwtAuthGuard)
@Controller("/temas")                                                      //Final da URL, fica: localhost:4000/temas
export class TemaController {
    constructor (private readonly temaService: TemaService) {}
    
    @Get ()                                                                    //Chamada do método listar todas
    @HttpCode (HttpStatus.OK)                                                  //localhost:4000/temas
    findall (): Promise<Tema[]> {
        return this.temaService.findAll()
    }

    @Get ('/:id')                                                              //Chamada de método listar por Id
    @HttpCode (HttpStatus.OK)                                                  //localhost:4000/temas/nºid
    findById (@Param ('id', ParseIntPipe) id: number): Promise<Tema>{
        return this.temaService.findById(id);
    }

    @Get ('/descricao/:descricao')                                                   //Chamada de método listar por descricao
    @HttpCode (HttpStatus.OK)                                                  //localhost:4000/postagens/titulo/nomedescricao
    findByDescricao (@Param ('descricao') descricao: string): Promise<Tema[]>{
        return this.temaService.findByDescricao (descricao);
    }

    @Post()                                                                     //Chamada do método criar tema
    @HttpCode(HttpStatus.CREATED)                                               //localhost:4000/postagens (JSON)
    create (@Body() tema: Tema): Promise<Tema>{                 
        return this.temaService.create(tema);
    }

    @Put()                                                                      //Chamada do método atualizar
    @HttpCode(HttpStatus.OK)                                                    //localhost:4000/postagens (JSON - informar id)
    update (@Body() tema: Tema): Promise<Tema>{
        return this.temaService.update(tema);
    }

    @Delete('/:id')                                                             //Chamada do método deletar
    @HttpCode(HttpStatus.NO_CONTENT)                                            //localhost:4000/postagens/nºid
    delete(@Param('id', ParseIntPipe) id: number){
        return this.temaService.delete(id);
    }
}