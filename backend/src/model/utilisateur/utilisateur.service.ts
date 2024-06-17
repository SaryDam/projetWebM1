import { Injectable } from '@nestjs/common';
import { Utilisateur } from './utilisateur.model';

@Injectable()
export class UtilisateurService {
  private utilisateurs: Utilisateur[] = [
    { id: '1', nom: 'Alice', email: 'alice@example.com', motDePasse: 'password' },
    { id: '2', nom: 'Bob', email: 'bob@example.com', motDePasse: 'password' },
  ];

  findAll(): Utilisateur[] {
    return this.utilisateurs;
  }

  findById(id: string): Utilisateur {
    return this.utilisateurs.find(user => user.id === id);
  }

  create(data: Partial<Utilisateur>): Utilisateur {
    const newUtilisateur = {
      id: Date.now().toString(),
      ...data,
    } as Utilisateur;
    this.utilisateurs.push(newUtilisateur);
    return newUtilisateur;
  }
}
