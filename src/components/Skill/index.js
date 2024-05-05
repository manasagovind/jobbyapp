const Skill = props => {
  const {eachSkill} = props
  const {name, imageUrl} = eachSkill
  return (
    <li className="skill">
      <img src={imageUrl} alt={name} className="skillImg" />
      <p className="skillPara">{name}</p>
    </li>
  )
}
export default Skill
