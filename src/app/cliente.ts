export class Cliente {
    id!:number;
    nombre!:string;
    apellido!:string;
    nacimiento!: Date;
    edad!: number
    confirm?: boolean; // El signo de interrogación hace que esta propiedad sea opcional

    constructor() {
        
    }
}
