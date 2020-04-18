
export const formatDate = ( date ) => {
    let cDate = new Date( date );

    let months = [ 'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro' ];
    let cDay = cDate.getDate(); 
    let cMonth = cDate.getMonth(); 
    let cYear = cDate.getFullYear();
    
    return `${cDay} de ${months[cMonth]} de ${cYear}`;
}

export const formatCoins = ( value ) => {
    
}