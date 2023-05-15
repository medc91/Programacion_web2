
//Registrarse

let user = $("#user");
let pass1 = $("#pass1");
let pass2 = $("#pass2");
let button = $("#btn");
let text = $("#text");


var usuarios = sessionStorage.getItem("usuarios")

function cargar() {
    if (usuarios === null) {

        usuarios = [];

    } else {
        usuarios = JSON.parse(usuarios)
    }
}

cargar();

//Registrarse

button.on("click", function (e) {
    e.preventDefault();
    console.log(usuarios);

    if (user.val() === "" || pass1.val() === "" || pass2.val() === "") {
        text.html(
            `<p style="color: red; ">Tiene que llenar todos los campos</p>`
        )


    } else if (pass1.val() != pass2.val()) {

        text.html(
            `<p style="color: red; ">Claves no coinciden </p>`
        )
    } else {
        const nuevoUser = $("#user").val();
        const nuevoPass = $("#pass1").val();
        usuarios.push({ usuario: nuevoUser, contrasena: nuevoPass });
        $("#user").val("");
        $("#pass1").val("");
        $("#pass2").val("");
        text.html(
            `<p style="color: green; ">Usuario creado <a href="/Login.html"> aqui</a> </p>`
        )
        sessionStorage.setItem("usuarios", JSON.stringify(usuarios));
    }

})

let loginUser = $("#ulogin");
let loginPass = $("#plogin");
let ingresar = $("#ingresar")
let msg = $("#login")
var mensaje = $("#bienvenido")

//Login

ingresar.on("click", function (e) {
    e.preventDefault();
    console.log(usuarios);

    var found = $.grep(usuarios, function (e) {
        return e.usuario === loginUser.val();
    });

    if (found[0].usuario == loginUser.val() && found[0].contrasena == loginPass.val()) {
        msg.html(`<p style="color: green; ">Bienvenido</p>`);
        mensaje.html(`<h1>Bienvenido ${found[0].usuario}</h1>`)
        $(location).attr('href', "/Carro.html");

    } else {
        msg.html(`<p style="color: red; ">Usuario o contraseña incorrecta </p>`);
    }
});

//Carro


var carro = $("#carro");

$.ajax({

    url: "productos.json",
    dataType: "json",
    success: function (data) {
        let lista_objetos = data
        let lista_productos = ""
        lista_objetos.forEach((elemento) => {

            lista_productos += `<div class="card mb-5" style="width: 18rem;">
            <img src="${elemento.foto}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">"${elemento.producto}"</h5>
              <p class="card-text">"${elemento.valor}"</p>
              <a onClick='agregarCarro("${elemento.producto}",${elemento.valor})'  class="btn btn-primary" )>Agregar</a>
            </div>
          </div>`

        }
        )

        carro.html(lista_productos)
    },
    error: function () {
        alert("fail");
    }
});

var lista = $("#listita")
var total = $("#total")
var pagar = $("#pagar")
var contar = $("#contador")
var ListaCarro = []

function borrar(producto) {
    const index = $.map(ListaCarro, function (articulo, i) {
        if (articulo.producto == producto) {
            return i;
        }
    });
    ListaCarro.splice(index, 1);
    lista.empty();

    let contador0 = 0;
    let listaArticulos = "";
    ListaCarro.forEach((articulo) => {

        listaArticulos += `<div>
        <p>${articulo.producto} -${articulo.valor}- <a onClick='borrar("${articulo.producto}")'  class="btn btn-danger" )>X</a></p>
        
    </div>`
        contador0++;

    })
    let reduce = ListaCarro.reduce((acumulador, actual) => {
        if (isNaN(actual.valor)) {
            return acumulador;
        } else {
            return acumulador + parseInt(actual.valor);
        }
    }, 0);

    lista.html(listaArticulos);
    contar.html(`<p>total de articulos : ${contador0} </p>`)
    total.html(`<p>Total de compra = $ ${reduce}</p>`)

}


function agregarCarro(producto, valor) {
    console.log("click");
    articulo = {}
    articulo.producto = producto
    articulo.valor = valor
    ListaCarro.push(articulo)
    console.log(ListaCarro)

    let listaArticulos = ""

    let contador0 = 0;
    $.each(ListaCarro, function (i, articulo) {
        listaArticulos += `<div>
            <p>${articulo.producto} - ${articulo.valor}-<a onClick='borrar("${articulo.producto}")'  class="btn btn-danger" )>X</a></p>
        </div>`
        contador0++;
    });

    let reduce = ListaCarro.reduce((acumulador, actual) => {
        if (isNaN(actual.valor)) {
            return acumulador;
        } else {
            return acumulador + parseInt(actual.valor);
        }
    }, 0);
    lista.html(listaArticulos);
    total.html(`<p>Total de compra = $ ${reduce}</p>`)
    contar.html(`<p>total de articulos : ${contador0}</p>`)
}



pagar.on("click", function () {
    let reduce = ListaCarro.reduce((acumulador, actual) => {
        if (isNaN(actual.valor)) {
            return acumulador;
        } else {
            return acumulador + parseInt(actual.valor);
        }
    }, 0);
    var codigo = Date.now() + 1
    var felicidades = `"Felicidades por tu compra tu total es $" ${reduce} "y tu numero de seguimento es :" ${codigo}`
    alert(felicidades)

    lista.html(`<div><p></p></div>`);
    total.html(`<p>Total de compra = $ 0</p>`)
    contar.html(`<p>total de artículos : 0</p>`)

    ListaCarro = [];
})


