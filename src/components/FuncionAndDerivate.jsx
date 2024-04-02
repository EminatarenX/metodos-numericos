import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next'
const FuncionAndDerivate = ({ func, derivate }) => {
  const latexString = () => {
    return `$$ ${func} $$`
  }
  const latexDerivate = () => {
    const newDerivate = derivate.replace(/\*/g, '')

    return `$$ ${newDerivate} $$`

  }

  const integral = () => {
    const newDerivate = derivate.replace(/\*/g, '')
    return `$$ \\int f(x) \\, dx = ${newDerivate} $$`
  }
  return (
    <div>
      <h2 className="text-xl text-center">Función a evaluar</h2>
      <Latex>

        {func && latexString()}
      </Latex>
      <h2 className="text-xl text-center">Derivada</h2>
      <Latex>

        {derivate && derivate.length > 0 && latexDerivate()}
      </Latex>

    </div>
  )
}
export default FuncionAndDerivate
