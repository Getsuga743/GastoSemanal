const btnMostrarFormularioIngreso = document.querySelector(
  "#mostrar-formulario"
);
const formularioIngreso = document.querySelector(".ingreso");
const formularioDeIngreso = document.querySelector("#agregar-ingreso");

const btnAgregarIngreso = document.querySelector("#sumar-ingreso");
let cantidadPresupuesto, ingreso;
const formularioGasto = document.getElementById("agregar-gasto");
//clases

//clase de Presupuesto
class Presupuesto {
  constructor(presupuesto) {
    this.presupuesto = Number(presupuesto);
    this.restante = Number(presupuesto);
  }
  //Metodo para ir restando del presupuesto actual
  presupuestoRestante(cantidad = 0) {
    return (this.restante -= Number(cantidad));
  }
  //metodo para sumar al ingreso total
}

//clase interfaz, maneja todo lo relaciondad a el html

class Interfaz {
  insertarPresupuesto(cantidad) {
    const presupuestoSpan = document.querySelector("span#total");
    const restanteSpan = document.querySelector("span#restante");
    //insertar valores del presupuesto al html
    presupuestoSpan.innerHTML = `${cantidad}`;
    restanteSpan.innerHTML = `${cantidad}`;
  }
  //metodos
  imprimirMensaje(mensaje, tipo) {
    const divMensaje = document.createElement("div");
    divMensaje.classList.add("text-center", "alert");
    if (tipo === "error") {
      divMensaje.classList.add("alert-danger");
    } else {
      divMensaje.classList.add("alert-success");
    }
    divMensaje.appendChild(document.createTextNode(mensaje));
    //insertar en el DOm
    document
      .querySelector(".primario")
      .insertBefore(divMensaje, formularioGasto);
    setTimeout(function () {
      document.querySelector(".primario .alert").remove();
      formularioGasto.reset();
    }, 2500);
  }
  //inserta los gastos a la lista
  agregarGastoListado(nombre, cantidad) {
    //ahi se agregan los gastos
    const gastoListado = document.querySelector("#gastos ul");

    //crear un Li
    const li = document.createElement("li");
    li.className =
      "list-group-item d-flex justify-content-between-align-items-center";
    //insertar el gasto
    li.innerHTML = `
    ${nombre}
  <span class="badge badge-secondary"> $ ${cantidad} </span>
  `;
    //insertar al html
    gastoListado.appendChild(li);
  }
  //comprueba el gasto restante
  presupuestoRestante(cantidad) {
    const restante = document.querySelector("span#restante");
    const presupuestoRestanteUsuario = cantidadPresupuesto.presupuestoRestante(
      cantidad
    );
    restante.innerHTML = `${presupuestoRestanteUsuario}`;

    this.comprobarPresupuesto();
  }
  //cambiar de color le presupuesto restante
  comprobarPresupuesto() {
    const presupuestoTotal = cantidadPresupuesto.presupuesto;
    const presupuestoRestante = cantidadPresupuesto.restante;

    //comprobar le 50% del gasto

    if (presupuestoTotal / 4 < presupuestoRestante) {
      const restante = document.querySelector(".restante");
      restante.classList.remove("alert-succes", "alert-warning");
      restante.classList.add("alert-danger");

    }else if((presupuestoTotal / 2)< presupuestoRestante){
      restante.classList.remove("alert-succes");
      restante.classList.add("alert-warning");

    }
  }
}

//envents listener
btnMostrarFormularioIngreso.addEventListener("click", () => {
  btnMostrarFormularioIngreso.style.visibility = "hidden";
  formularioIngreso.classList.remove("oculto");
});
//toma el ingreso
formularioDeIngreso.addEventListener("submit", function (e) {
  e.preventDefault();
  ingreso = formularioIngreso.querySelector("#ingreso").value;
  if (ingreso === null || ingreso === "") {
    window.location.reload();
  } else {
    //instancias nuevo presupuesto
    cantidadPresupuesto = new Presupuesto(ingreso);
    //instanciar la clase de interfaz
    const ui = new Interfaz();
    ui.insertarPresupuesto(cantidadPresupuesto.presupuesto);

    formularioIngreso.classList.add("oculto");
    btnMostrarFormularioIngreso.style.visibility = "oculto";
    formularioDeIngreso.reset();
  }
});

formularioGasto.addEventListener("submit", function (e) {
  e.preventDefault();
  //const leer del formulario de gastos
  const nombreGasto = document.querySelector("#gasto").value;
  const cantidadGasto = document.querySelector("#cantidad").value;

  //instanciar interfaz

  const ui = new Interfaz();
  //comprobar que los campos no esten vacios
  if (nombreGasto === "" || cantidadGasto === "") {
    ui.imprimirMensaje("Hubo un error", "error");
  } else {
    ui.imprimirMensaje("Agregado", "correcto");
    ui.agregarGastoListado(nombreGasto, cantidadGasto);
    ui.presupuestoRestante(cantidadGasto);
  }
});
