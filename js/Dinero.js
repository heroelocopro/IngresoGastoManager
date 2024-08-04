export default class Dinero{
id = Number;
valor = Number;
constructor(id,valor)
{
    this.id = id;
    this.valor = valor;
}
get id()
{
    return this.id
}
set id(id)
{
    this.id = id;
}
get valor()
{
    return this.valor;
}
set valor(valor)
{
    this.valor = valor;
}
}