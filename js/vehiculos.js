class Vehiculo {
  get_consumo(kms) {
    throw new Error('Not implemented');
  }
}
export class Veloster extends Vehiculo {
  get_consumo(kms) {
    return kms / 17.3;
  }
}
export class Lancer extends Vehiculo {
  get_consumo(kms) {
    return kms / 15.7;
  }
}
export class Impreza extends Vehiculo {
  get_consumo(kms) {
    return kms / 14.1;
  }
}
export class Gol extends Vehiculo {
  get_consumo(kms) {
    return kms / 18;
  }
}
export class Rio3 extends Vehiculo {
  get_consumo(kms) {
    return kms / 22.5;
  }
}
//export default {Veloster,Lancer,Impreza,Gol,Rio3}