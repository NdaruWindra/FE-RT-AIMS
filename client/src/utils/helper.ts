export const convertDate = (dateString: string) => {
  const date = new Date(dateString)

  // Format ke YYYY-MM-DD
  const formattedDate = date.toISOString().split('T')[0]

  return formattedDate
}
