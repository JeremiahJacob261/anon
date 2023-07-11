import Image from 'next/image'
import styles from './page.module.css'
export default function Home() {
  return (
    <main className={styles.main}>
      <div style={{display:'flex',justifyContent:'center'}}>
      <h1>ANON</h1>
      <p>Welcome to ANON, the most trusted Anonymous Messaging App</p>
      
      </div>
    </main>
  )
}
