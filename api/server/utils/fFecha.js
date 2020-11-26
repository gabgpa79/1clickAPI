class fFecha {

    static sumarDia(days) {
        let fecha = new Date()
        fecha.setDate(fecha.getDate() + days);
        let newFecha = devolverFechaFormateada(fecha)
        return newFecha
    }
    static sumarMes(month) {
        let fecha = new Date()
        fecha.setMonth(fecha.getMonth() + month, 0);
        let newFecha = devolverFechaFormateada(fecha)
        return newFecha
    }

}

function devolverFechaFormateada(fecha) {
    const day = fecha.getDate()
    const month = fecha.getMonth() + 1
    const year = fecha.getFullYear()
    return year + "-" + month + "-" + day
}
export default fFecha;