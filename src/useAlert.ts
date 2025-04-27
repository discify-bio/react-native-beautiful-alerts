import { useContext } from 'react'
import Context from './Context'

const useAlert = () => {
  const alertContext = useContext(Context)
  return alertContext.current
}

export default useAlert
