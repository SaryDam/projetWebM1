import {Injectable, Logger} from '@nestjs/common';
import {Utilisateur} from './utilisateur.model';

@Injectable()
export class UtilisateurService {
    private readonly logger = new Logger(UtilisateurService.name);
    private utilisateurs: Utilisateur[] = [];

    createUtilisateur(id: string, nom: string, email: string, motDePasse: string): Utilisateur {
        const newUtilisateur: Utilisateur = {id, nom, email, motDePasse};
        this.utilisateurs.push(newUtilisateur);
        this.logger.log(`Created user: ${JSON.stringify(newUtilisateur)}`);
        this.logger.log(`All users: ${JSON.stringify(this.utilisateurs)}`);
        return newUtilisateur;
    }

    findById(id: string): Utilisateur {
        this.logger.log(`Finding user with id: ${id}`);
        const user = this.utilisateurs.find(user => user.id === id);
        if (user) {
            this.logger.log(`Found user: ${JSON.stringify(user)}`);
        } else {
            this.logger.error(`User with id ${id} not found`);
        }
        return user;
    }
}
