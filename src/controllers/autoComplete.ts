import Model from '../models/db'

interface IAutoComplete {
  City: string
  Longitude: string
  Latitude: string
}

async function completeText( text: string, language: string, limit: number = 20 ): Promise<IAutoComplete[]> {
  const res = await Model.query(`
    SELECT i18n.name as City, location.longitude as Longitude, location.latitude as Latitude from i18n
      INNER JOIN location ON location.id = i18n.location_id
      INNER JOIN language ON language.id = i18n.language_id
      WHERE language.code = '${language}' AND i18n.name LIKE '%${text}%'
      GROUP BY location.id
      LIMIT ${limit};
  `)
  return res
}

export default {
  completeText,
}
export {
  IAutoComplete,
}