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
