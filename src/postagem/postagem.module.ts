//CLASSE MODULE - RESPONSÁVEL POR AGRUPAR TODAS AS OUTRAS CLASSES

import { TypeOrmModule } from "@nestjs/typeorm";
import { Postagem } from "./entities/postagem.entity";
import { PostagemService } from "./services/postagem.services";
import { PostagemController } from "./controllers/postagem.controller";
import { Module } from "@nestjs/common";
import { TemaModule } from "../tema/tema.module";
import { TemaService } from "../tema/services/tema.service";


@Module ({
    imports:[TypeOrmModule.forFeature([Postagem]), TemaModule],
    providers: [PostagemService, TemaService],
    controllers: [PostagemController],
    exports: [TypeOrmModule]
})

export class PostagemModule {}