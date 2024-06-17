import { Module } from '@nestjs/common';
import { UtilisateurResolver } from './utilisateur.resolver';
import { UtilisateurService } from './utilisateur.service';

@Module({
  providers: [UtilisateurResolver, UtilisateurService],
  exports: [UtilisateurService]
})
export class UtilisateurModule {}
