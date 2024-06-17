import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UtilisateurService } from './utilisateur.service';
import { Utilisateur } from './utilisateur.model';

@Resolver(() => Utilisateur)
export class UtilisateurResolver {
  constructor(private readonly utilisateurService: UtilisateurService) {}

  @Query(() => [Utilisateur])
  async utilisateurs() {
    return this.utilisateurService.findAll();
  }

  @Mutation(() => Utilisateur)
  async createUtilisateur(
    @Args('nom') nom: string,
    @Args('email') email: string,
    @Args('motDePasse') motDePasse: string,
  ) {
    return this.utilisateurService.create({ nom, email, motDePasse });
  }
}
