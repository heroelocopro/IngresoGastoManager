import Dinero from "./Dinero.js";
export default class Gasto extends Dinero{
fechaGasto = Date;
motivo = String;
constructor(fechaGasto,dinero,motivo)
{
    super(dinero.id,dinero.valor);
    this.fechaGasto = fechaGasto;
    this.motivo = motivo;
}
get fechaGasto()
{
    return this.fechaGasto;
}
get motivo()
{
    return this.motivo;
}
}