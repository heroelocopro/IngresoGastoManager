// creacion de App JS manejaron de ganancias y gastos y balance total
import Dinero from "./Dinero.js";
import Ganancia from "./Ganancia.js";
import Gasto from "./Gasto.js";
// declaramos variables iniciales 
let dinero;
let id = 0;
let ingreso;
let gasto;
let fecha;
let motivo;
// declaramos variables grupales para almacenar las iniciales
let banco = [];
let ingresos = [];
let gastos = [];
// llamamos a los iconos edit y delete
const iconsDelete = document.getElementsByClassName('iconDelete');
const iconsEdit = document.getElementsByClassName('iconEdit');
// agregamos contenedor e botones pa mostrar y cerrar
// editar
const divFormEditMoney = document.getElementById('divFormEditMoney');
const motivoDineroInputEdit = document.getElementById('motivoDineroInputEdit');
const cantidadDineroInputEdit = document.getElementById('cantidadDineroInputEdit');
const tipoDineroInputSelectEdit = document.getElementById('tipoDineroInputSelectEdit');
const closeFormEditMoney = document.getElementById('closeFormEditMoney');
// termina editar
const divFormMoney = document.getElementById('divFormMoney');
const showFormMoney = document.getElementById('showFormMoney');
const closeFormMoney = document.getElementById('closeFormMoney');
const contenedorGanancias = document.getElementById('contenedorGanancias');
const contenedorGastos = document.getElementById('contenedorGastos');
const btnEditDinero = document.getElementById('btnEditDinero');
const editMoneyId = document.getElementById('editMoneyId');
// agregamso boton que agrega el dinero
const btnAddDinero = document.getElementById('btnAddDinero');
// obtenemos los inputs para agregar
const tipoDineroInputSelect = document.getElementById('tipoDineroInputSelect');
const cantidadDineroInput = document.getElementById('cantidadDineroInput');
const motivoDineroInput = document.getElementById('motivoDineroInput');
const dineroTotal = document.getElementById('dineroTotal');




// ponemos los onclicks para mostrar el div form money y a su vez cerrarlo
showFormMoney.onclick = () =>
{
    divFormMoney.classList.remove('d-none');
    divFormMoney.classList.add('d-block');
}
closeFormMoney.onclick = () =>
{
    divFormMoney.classList.add('d-none');
    divFormMoney.classList.remove('d-block');
}
// onclick al btn add dinero y validamos si todo ok
btnAddDinero.onclick = () =>
{
    actualizarId();
    if(cantidadDineroInput.value != null && cantidadDineroInput.value != 0 || cantidadDineroInput.value > 0)
    {
        if (motivoDineroInput.value != '' || motivoDineroInput.value != null)
        {
            if (tipoDineroInputSelect.value == 'Ganancia')
            {
                // ganancia
                // motivo
                motivo = motivoDineroInput.value;
                // creamos una fecha actual en horario DD-MM-YEAR
                fecha = new Date();
                fecha = `${fecha.getDate()}/${fecha.getMonth()}/${fecha.getFullYear()}`;
                // creamos clase dinero
                dinero = new Dinero(id,parseInt(cantidadDineroInput.value));
                // creamos clase ganancia
                ingreso = new Ganancia(fecha,dinero,motivo);
                console.log('Ganancia creada con exito' , ingreso);
                banco.push(dinero);
                ingresos.push(ingreso);
                saldoTotal(banco);
                addGananciaView(ingresos);
                saldoPromedio(ingresos,gastos);
                guardarDatos(banco,ingresos,gastos);
            }
            else if (tipoDineroInputSelect.value == 'Gasto')
            {
                // Gasto
                // motivo
                motivo = motivoDineroInput.value;
                // creamos una fecha actual en horario DD-MM-YEAR
                fecha = new Date();
                fecha = `${fecha.getDate()}/${fecha.getMonth()}/${fecha.getFullYear()}`;
                // creamos clase dinero
                dinero = new Dinero(id,parseInt(cantidadDineroInput.value));
                // creamos clase gasto
                gasto = new Gasto(fecha,dinero,motivo);
                console.log('Gasto creado con exito' , gasto);
                banco.push(dinero);
                gastos.push(gasto);
                saldoTotal(banco);
                saldoPromedio(ingresos,gastos);
                addGastosView(gastos);
                guardarDatos(banco,ingresos,gastos);
            }
            else
            {
                alert('error se debe selecciona un tipo de dinero');
            }
        }
    }
}
// onclick que cierra el form edit de dinero
closeFormEditMoney.onclick = () =>
{
    divFormEditMoney.classList.add('d-none');
    divFormEditMoney.classList.remove('d-block');
}
btnEditDinero.onclick = () => {
    for(let i=0;i < banco.length;i++)
    {
        if (banco[i].id == editMoneyId.value)
        {
            console.log(banco[i]);
            console.log(editMoneyId.value);
            for(let j = 0;j<ingresos.length;j++)
            {
                if(ingresos[j].id == editMoneyId.value)
                {
                    ingresos[j].motivo =  motivoDineroInputEdit.value;
                    banco[i].valor = cantidadDineroInputEdit.value;
                }
            }
            for(let j = 0;j<gastos.length;j++)
                {
                    if(gastos[j].id == editMoneyId.value)
                    {
                        gastos[j].motivo =  motivoDineroInputEdit.value;
                        banco[i].valor = cantidadDineroInputEdit.value;
                    }
                }
        }
    }
    guardarDatos(banco,ingresos,gastos);
    divFormEditMoney.classList.add('d-none');
    divFormEditMoney.classList.remove('d-block');
}

// funcion que recibe un array de todo el dinero
function saldoTotal(banco)
{
    console.log(banco);
    // mostramos todo el dinero ingresado hasta el momento
    let saldoAcumulado = 0;
    for(let i = 0; i < banco.length; i++)
    {
        saldoAcumulado += banco[i].valor;
    }
}
// saldo promedio es donde sumamos y restamos los ingresos y gastos
function saldoPromedio(ingresos,gastos)
{
    let promedio = 0;
    let suma = 0;
    let resta = 0;
    for(let i = 0; i < ingresos.length; i++)
        {
            suma += ingresos[i].valor;
        }
    for(let i = 0; i < gastos.length; i++)
        {
            resta += gastos[i].valor;
        }
    promedio = suma - resta;
    if (promedio > 0)
    {
        dineroTotal.innerHTML = `<span id="dineroTotal" class="material-symbols-outlined fs-1 text-success">savings ${promedio} savings</span>`;
    }
    else if(promedio < 0)
    {
        dineroTotal.innerHTML = `<span id="dineroTotal" class="material-symbols-outlined fs-1 text-danger">savings ${promedio} savings</span>`;

    }
    else
    {
        dineroTotal.innerHTML = `<span id="dineroTotal" class="material-symbols-outlined fs-1 ">savings ${promedio} savings</span>`;

    }
}
// estos 2 muestran la vista del cliente en ganancias y gastos
function addGananciaView(ganancias)
{
    console.log(ganancias);
    contenedorGanancias.innerHTML = '';
    for(let i = 0; i<ganancias.length;i++)
    {
        contenedorGanancias.innerHTML += `<div class="col-12 text-center border border-success border-5 rounded-1 ">
                        <div class="p-0 m-0 d-inline-flex ">
                            <span class="material-symbols-outlined">schedule</span>
                            <p class="p-0 m-0">${ganancias[i].fechaGanancia}</p>
                            <span class="material-symbols-outlined">schedule</span>

                        </div>
                        <div class="p-0 m-0 d-inline-flex ">
                            <span class="material-symbols-outlined">attach_money</span>
                            <p class="p-0 m-0">${ganancias[i].valor}</p>
                            <span class="material-symbols-outlined">attach_money</span>
                        </div>
                        <div class="p-0 m-0 d-inline-flex ">
                            <span class="material-symbols-outlined">demography</span>
                            <p class="p-0 m-0">${ganancias[i].motivo}</p>
                            <span class="material-symbols-outlined">demography</span>
                        </div>
                         <br>
                        <span id='${ganancias[i].id}' class="material-symbols-outlined text-warning iconEdit">
                            edit
                            </span>
                        <span id='${ganancias[i].id}' class="material-symbols-outlined text-danger iconDelete">
                            delete
                            </span>
                    </div>`;
    }
}

function addGastosView(gastos)
{
    console.log(gastos);
    contenedorGastos.innerHTML = '';
    for(let i = 0; i<gastos.length;i++)
    {
        contenedorGastos.innerHTML += `<div  class="col-12 text-center border border-danger border-5 rounded-1 ">
                        <div class="p-0 m-0 d-inline-flex ">
                            <span class="material-symbols-outlined">schedule</span>
                            <p class="p-0 m-0">${gastos[i].fechaGasto}</p>
                            <span class="material-symbols-outlined">schedule</span>

                        </div>
                        <div class="p-0 m-0 d-inline-flex ">
                            <span class="material-symbols-outlined">attach_money</span>
                            <p class="p-0 m-0">${gastos[i].valor}</p>
                            <span class="material-symbols-outlined">attach_money</span>
                        </div>
                        <div class="p-0 m-0 d-inline-flex ">
                            <span class="material-symbols-outlined">demography</span>
                            <p class="p-0 m-0">${gastos[i].motivo}</p>
                            <span class="material-symbols-outlined">demography</span>
                        </div>
                         <br>
                        <span id='${gastos[i].id}' class="material-symbols-outlined text-warning iconEdit">
                            edit
                            </span>
                        <span id='${gastos[i].id}' class="material-symbols-outlined text-danger iconDelete">
                            delete
                            </span>
                    </div>`;
    }
}

// guarda datos usando 3 arrays en local storage converted json
function guardarDatos(banco,ingresos,gastos)
{
    let todo = {'banco': banco, 'ingresos': ingresos,'gastos':gastos,};
    localStorage.setItem('moneyManager',JSON.stringify(todo))
    console.log('guardado con exito', todo);
    cargarDatos();
}
// carga datos y transforma a clases 
function cargarDatos()
{
    // declaramos variables
    let x;
    let y;
    let z;
    banco = [];
    ingresos = [];
    gastos = [];
    // obtenemos variable de localstorage
    let todo = JSON.parse(localStorage.getItem('moneyManager'));
    // iniciamos primer bucle para obtener todos los bancos y transformarlos a su clase
    console.log(todo);
    if (todo != null )
    {
    for(let i=0;i<todo['banco'].length;i++)
    {
        // convertimos cada uno
        x = new Dinero(todo['banco'][i].id,todo['banco'][i].valor);
        banco.push(x);
        
    }
    }
    else
    {}
    // segundo bucle donde recorremos todos los bancos buscando ganancias
    if(todo != null )
    {

        for(let i=0;i<todo['ingresos'].length;i++)
            {
                for(let j=0;j<banco.length;j++)
                    {
                        if(banco[j].id == todo['ingresos'][i].id)
                            {
                                y = new Ganancia(todo['ingresos'][i].fechaGanancia,banco[j],todo['ingresos'][i].motivo);
                                ingresos.push(y);
                            }
                    }
            }
    }
    if(todo != null )
    {


        // tercer bucle recorremos lo mismo pero vamos para gastos
        for(let i=0;i<todo['gastos'].length;i++)
            {
                for(let j=0;j<banco.length;j++)
                {
                    if(banco[j].id == todo['gastos'][i].id)
                    {
                        z = new Gasto(todo['gastos'][i].fechaGasto,banco[j],todo['gastos'][i].motivo);
                        gastos.push(z);
                    }
                }
            }
    }
    saldoTotal(banco);
    saldoPromedio(ingresos,gastos);
    addGastosView(gastos);
    addGananciaView(ingresos);
    addEventDeletes(iconsDelete);
    addEventEdits(iconsEdit);
}

// actualiza el id 
function actualizarId()
{
    let todo = JSON.parse(localStorage.getItem('moneyManager'));
    if( todo != null)
    {

        for(let i = 0;i<todo['banco'].length;i++)
            {
                if (todo['banco'][i].id >= id)
                    {
                        id = todo['banco'][i].id+1;
                    }
                }
            }
}



function eliminarDinero(e)
{
    console.log(e.target.id);
    for(let i = 0; i<banco.length;i++)
    {
        if (banco[i].id == e.target.id)
        {
            banco.splice(i,1);
        }
    }
    for(let i=0;i<gastos.length;i++)
    {
        if (gastos[i].id == e.target.id)
            {
                gastos.splice(i,1);
            }
    }
    for(let i=0;i<ingresos.length;i++)
    {
        if (ingresos[i].id == e.target.id)
            {
                ingresos.splice(i,1);
            }
    }
    guardarDatos(banco,ingresos,gastos);

}

function editarDinero(e)
{
    divFormEditMoney.classList.remove('d-none');
    divFormEditMoney.classList.add('d-block');
    console.log(e.target.id);
    for(let i=0;i<gastos.length;i++)
    {
        if (gastos[i].id == e.target.id)
            {
                motivoDineroInputEdit.value = gastos[i].motivo;
                cantidadDineroInputEdit.value = gastos[i].valor;
                // tipoDineroInputSelectEdit.value = 'Gasto';
                editMoneyId.value = gastos[i].id
            }
    }
    for(let i=0;i<ingresos.length;i++)
    {
        if (ingresos[i].id == e.target.id)
            {
                motivoDineroInputEdit.value = ingresos[i].motivo;
                cantidadDineroInputEdit.value = ingresos[i].valor;
                // tipoDineroInputSelectEdit.value = 'Ganancia';
                editMoneyId.value = ingresos[i].id
            }
    }
    // guardarDatos(banco,ingresos,gastos);
}

function addEventDeletes(deletes)
{
    for(let i = 0; i< deletes.length;i++)
    {
        deletes[i].addEventListener('click',eliminarDinero);
    }
}
function addEventEdits(edits)
{
    for(let i = 0; i< edits.length;i++)
    {
        edits[i].addEventListener('click', editarDinero);
    }
}
// cargamos primero actualizamos despues
cargarDatos();
actualizarId();