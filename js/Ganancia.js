import Dinero from "./Dinero.js";
export default class Ganancia extends Dinero{
fechaGanancia = Date;
motivo = String;
constructor(fechaGanancia,dinero,motivo)
{
    super(dinero.id,dinero.valor);
    this.fechaGanancia = fechaGanancia;
    this.motivo = motivo;
}
get fechaGanancia()
{
    return this.fechaGanancia;
}
get motivo()
{
    return this.motivo;
}
}