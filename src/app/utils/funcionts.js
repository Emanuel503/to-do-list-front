export function formatDate(date, format){
    const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    const diasSemana = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

    const fechaObj = new Date(date);

    const dia = fechaObj.getDate();
    const mes = fechaObj.getMonth();
    const año = fechaObj.getFullYear();
    const diaSemana = fechaObj.getDay();
    const horas = fechaObj.getHours();
    const minutos = fechaObj.getMinutes();
    const segundos = fechaObj.getSeconds();

    let resultado = format;

    resultado = resultado.replace('DD', dia < 10 ? '0' + dia : dia);
    resultado = resultado.replace('MM', meses[mes]);
    resultado = resultado.replace('YYYY', año);
    resultado = resultado.replace('HH', horas < 10 ? '0' + horas : horas);
    resultado = resultado.replace('mm', minutos < 10 ? '0' + minutos : minutos);
    resultado = resultado.replace('ss', segundos < 10 ? '0' + segundos : segundos);
    resultado = resultado.replace('D', dia);
    resultado = resultado.replace('M', mes + 1);
    resultado = resultado.replace('YY', año.toString().slice(-2));
    resultado = resultado.replace('HH12', horas < 12 ? horas : horas - 12);
    resultado = resultado.replace('A', horas < 12 ? 'AM' : 'PM');
    resultado = resultado.replace('DW', diasSemana[diaSemana]);

    return resultado;
}