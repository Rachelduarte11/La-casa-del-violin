const firebaseConfig = {
    apiKey: "AIzaSyCy-qAnRewcRadLlzAe76NmcqIu71_but0",
    authDomain: "memory-games-11181.firebaseapp.com",
    databaseURL: "https://memory-games-11181-default-rtdb.firebaseio.com/",
    projectId: "memory-games-11181",
    storageBucket: "memory-games-11181.appspot.com",
    messagingSenderId: "696661576825",
    appId: "1:696661576825:web:2d4a7596878023196f98a8",
    measurementId: "G-DBKK91GTY4"
  };


// Initialize Firebase
firebase.initializeApp(firebaseConfig);



firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var textoVerificado = "";
        if (emailVerified === false) {
            textoVerificado = "Email no verificado";
        }
        else {
            textoVerificado = "Email verificado";
        }
        var providerData = user.providerData;
        /*
        document.getElementById('login').innerHTML =
            `<p>Logueado ` + user.email + ` ` + textoVerificado + ` <p>
        <button  type="button" class="btn btn-danger" onclick="cerrar()">Cerra sesion</button>
    `;
        */
        document.getElementById("btnAcceso").style.display = "none";
        document.getElementById("checkLogin").style.display = "none";
        document.getElementById("areaRegistro").style.display = "none";
        document.getElementById("areaLogin").style.display = "";
        document.getElementById("btnCerrar").style.display = "";
        //document.getElementById('areaLogin').innerHTML = document.getElementById('areaLogin').innerHTML+ 
        //'<button id="btnCerrar" type="button" class="btn btn-danger" onclick="cerrar()">Cerra sesion</button>';
        document.getElementById('emailA').value=email;
        document.getElementById('passA').style.display = "none";
        console.log(user);
    } else {
        document.getElementById("btnAcceso").style.display = "";
        document.getElementById("checkLogin").style.display = "";
        document.getElementById("areaRegistro").style.display = "";
        document.getElementById("areaLogin").style.display = "none";
        document.getElementById('passA').style.display = "";
        document.getElementById("btnCerrar").style.display = "none";
    }
});

function enviar() {
    var email = document.getElementById('email').value;
    var pass = document.getElementById('pass').value;
    firebase.auth().createUserWithEmailAndPassword(email, pass)
        .catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
        })
        .then(function () {
            verificar();
        });
}
function verificar() {
    var user = firebase.auth().currentUser;
    user.sendEmailVerification().then(function () {
        // Email sent.
    }).catch(function (error) {
        // An error happened.
    });
}
function acceso() {
    var emailA = document.getElementById('emailA').value;
    var passA = document.getElementById('passA').value;
    firebase.auth().signInWithEmailAndPassword(emailA, passA)
        .catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
        });
}
function cerrar() {
    firebase.auth().signOut()
        .then(function () {
            console.log('Salir');
        })
        .catch(function (error) {
            console.log(error);
        })
}
$(document).ready(function () {
    $('#loginRestro').change(function () {
        if ($(this).is(':checked')) {
            $('#areaLogin').hide();
            $('#areaRegistro').show();
        }
        else {
            $('#areaLogin').show();
            $('#areaRegistro').hide();
        }
    });
});