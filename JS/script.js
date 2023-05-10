
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
            `<p style="color: green; ">Usuario creado correctamente </p>`
        )
        sessionStorage.setItem("usuarios", JSON.stringify(usuarios));
    }

})

let loginUser = $("#ulogin");
let loginPass = $("#plogin");
let ingresar = $("#ingresar")
let msg = $("#login")


//Login

ingresar.on("click", function (e) {

    e.preventDefault();
    console.log(usuarios)


    var found = $.grep(usuarios, function (e) { return e.usuario === loginUser.val(); });


    if (found[0].usuario == loginUser.val() && found[0].contrasena == loginPass.val()) {

        msg.html(
            `<p style="color: green; ">Bienvenido</p>`
        )

        $(location).attr('href', "/Carro.html");

    } else {

        msg.html(
            `<p style="color: red; ">Usuario o contraseña incorrecta </p>`
        )

    }


})

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
            <img src="..." class="card-img-top" alt="...">
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
var ListaCarro = []
function agregarCarro(producto, valor) {


    articulo = {}
    articulo.producto = producto
    articulo.valor = valor
    ListaCarro.push(articulo)
    var Mensaje = "Productos agregados: " + ListaCarro.length
    console.log(ListaCarro)
    let listaArticulos = ""

    let reduce = ListaCarro.reduce((acumulador, actual) => acumulador + actual.valor, 0);

    ListaCarro.forEach((articulo) => {

        listaArticulos += `<div>
        <p>${articulo.producto} -${articulo.valor} </p>
    </div>`

    })

    lista.html(listaArticulos);
    total.html(`<p>Total de compra = $ ${reduce}</p>`)


}
pagar.on("click", function () {
    console.log(felicidades)
    let reduce = ListaCarro.reduce((acumulador, actual) => acumulador + actual.valor, 0);
    var codigo = Date.now() + 1
    var felicidades = `"Felicidades por tu compra tu total es $" ${reduce} "y tu numero de seguimento es :" ${codigo}`
    alert(felicidades)
})



