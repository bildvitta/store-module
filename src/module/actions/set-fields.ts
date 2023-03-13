import { getStateFromAction, getActionPayload } from '@bildvitta/store-adapter'
import {
  FieldsState,
  State,
  NamespacedState
} from 'types'

export default (fields: FieldsState) => {
  return async function (
    this: NamespacedState
  ) {
    // function getFilters () {
    //   const { fields, filters } = model
    //   const { fieldsList, fields: fieldsFilters } = filters
      
    //   const listOfFilters = [...new Set([...fieldsList, ...Object.keys(fieldsFilters)])]
    //   const normalizedFields = {}
    
    //   listOfFilters.forEach(item => {
    //     Object.assign(normalizedFields, {
    //       [item]: fields[item],
    //       ...(fieldsFilters[item] && { [item]: { ...fields[item], ...fieldsFilters[item] } }),
    //     })
    //   })
    
    //   return normalizedFields
    // }
  }
}
