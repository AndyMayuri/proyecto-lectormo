export function busquedaManwha(manhwa, id){
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

export function nuevoId(manhwas){
    let nuevoID = manhwas[manhwas.length - 1].id + 1
    return nuevoID
}
