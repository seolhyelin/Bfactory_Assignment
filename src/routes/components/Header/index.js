import styles from './header.module.scss'
import Button from '../Button'

const Header = () => {
  return (
    <div>
      <Button className={styles.move}>이동</Button>
      <Button>회전</Button>
      <Button>사이즈 변경</Button>
      <Button>crop</Button>
      <Button>제출</Button>
    </div>
  )
}

export default Header
