import { useContext, useMemo } from 'react'
import Context from './Context'

const useAlert = () => {
  const alertContext = useContext(Context)
  const alert = useMemo(() => {
    return alertContext.current
  }, [alertContext.current])
  return alert
}

export default useAlert
