
export const formatDate = (date) => {
  const cDate = new Date(date)

  const months = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro']
  const cDay = cDate.getDate()
  const cMonth = cDate.getMonth()
  const cYear = cDate.getFullYear()

  return `${cDay} de ${months[cMonth]} de ${cYear}`
}

export const formatCoins = (value) => {

}
