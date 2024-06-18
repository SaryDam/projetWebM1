import {Args, Mutation, Resolver} from '@nestjs/graphql';
import {UtilisateurService} from './utilisateur.service';
import {Utilisateur} from './utilisateur.model';

@Resolver(() => Utilisateur)
export class UtilisateurResolver {
    constructor(private readonly utilisateurService: UtilisateurService) {
    }

    @Mutation(() => Utilisateur)
    createUtilisateur(
        @Args('id') id: string,
        @Args('nom') nom: string,
        @Args('email') email: string,
        @Args('motDePasse') motDePasse: string,
    ): Utilisateur {
        return this.utilisateurService.createUtilisateur(id, nom, email, motDePasse);
    }
}
