import './index.css'

const Checkboxess = props => {
  const {eachType, changeEmployee} = props
  const {label, employmentTypeId} = eachType
  const changeEmployeety = () => {
    changeEmployee(employmentTypeId)
  }
  return (
    <li className="listingView">
      <input
        type="checkbox"
        id={employmentTypeId}
        onChange={changeEmployeety}
        value={label}
      />

      <label htmlFor={employmentTypeId}>{label}</label>
    </li>
  )
}
export default Checkboxess
