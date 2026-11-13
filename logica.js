export function busquedaManwhaPorId(manhwa, id){
    const cantManhwas = manhwa.length
    let contador = 0
    while (contador < cantManhwas){
        if (manhwa[contador].id === id){
            return manhwa[contador]
        }
        contador += 1
    }
    return null
}

export function busquedaManwhaPorGenero(manhwa, genero){
    const cantManhwas = manhwa.length
    let contador = 0
    let manhwasEncontrados = []
    while (contador < cantManhwas){
        if((manhwa[contador].genero).includes(genero)){
            manhwasEncontrados.push(manhwa[contador])
        }
        contador += 1
    }
    return manhwasEncontrados
}

export function busquedaManwhaPorTitulo(manhwa, titulo){
    const cantManhwas = manhwa.length
    let contador = 0
    while (contador < cantManhwas){
        if (manhwa[contador].titulo === titulo){
            return manhwa[contador]
        }
        contador += 1
    }
    return null
}


export function nuevoId(manhwas){
    let nuevoID = 1
    if (manhwas.length > 0){
        nuevoID = manhwas[manhwas.length - 1].id + 1
    }
    return nuevoID
}


//validacion de campos obligatorios

export function validarCamposUsuario(requestBody, usuarios) {
    let errores = [];

    // Validar nombre
    let nombreValido = typeof requestBody.nombre === 'string' && requestBody.nombre.trim().length > 0;

    if (!nombreValido) {
        errores.push("El nombre es obligatorio");
    }

    // Validar contraseña
    let contraseñaValida = validarContraseña(requestBody.password);

    if (!contraseñaValida) {
        errores.push("La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo");
    }

    // Validar email
    let emailValido = validarEmail(requestBody.email, usuarios);

    if (!emailValido) {
        errores.push("El email no es válido, el dominio no está permitido o ya está registrado");
    }

    return {
        valido: errores.length === 0,
        errores
    };
}


// VALIDAR CONTRASEÑA
export function validarContraseña(contraseña) {
    if (typeof contraseña !== 'string') {
        return false;
    }

    let simbolosPermitidos = "!@#$%^&*";
    let numerosPermitidos = "0123456789";
    let abecedario = "abcdefghijklmnñopqrstuvwxyzáéíóú";

    if (contraseña.length < 8) {
        return false;
    }

    let cantSimbolos = 0;
    let cantMinusculas = 0;
    let cantMayusculas = 0;
    let cantNumeros = 0;

    for (let i = 0; i < contraseña.length; i++) {
        if (simbolosPermitidos.includes(contraseña[i])) {
            cantSimbolos++;
        }

        if (abecedario.includes(contraseña[i])) {
            cantMinusculas++;
        }

        if (abecedario.toUpperCase().includes(contraseña[i])) {
            cantMayusculas++;
        }

        if (numerosPermitidos.includes(contraseña[i])) {
            cantNumeros++;
        }
    }

    return (
        cantSimbolos > 0 &&
        cantMinusculas > 0 &&
        cantMayusculas > 0 &&
        cantNumeros > 0
    );
}


// VALIDAR EMAIL
function validarEmail(email, usuarios) {
    if (typeof email !== 'string') {
        return false;
    }
    email = email.trim();
    let dominiosPermitidos = ["gmail.com","outlook.com","hotmail.com"];
    let partesEmail = email.split("@");

    if (partesEmail.length !== 2) {
        return false;
    }

    let user = partesEmail[0];
    let dominio = partesEmail[1];

    if (user.length < 8 ||!dominiosPermitidos.includes(dominio) ||dominio.length === 0){
        return false;
    }

    const usuarioExistente = usuarios.find(usuario => usuario.email.toLowerCase() === email.toLowerCase());
    return !usuarioExistente;
}
