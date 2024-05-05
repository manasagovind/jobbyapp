import './index.css'

const SalaryRange = props => {
  const {eachType, onChangeid} = props
  const {label, salaryRangeId} = eachType
  const changeSalary = () => {
    onChangeid(salaryRangeId)
  }
  return (
    <li className="salarylist">
      <input
        type="radio"
        name="salary"
        id={salaryRangeId}
        value={label}
        onChange={changeSalary}
      />

      <label htmlFor={salaryRangeId}>{label}</label>
    </li>
  )
}
export default SalaryRange
