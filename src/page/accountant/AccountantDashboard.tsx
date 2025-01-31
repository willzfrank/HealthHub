import React from 'react'
import Layout from '../../layout/HealthHubLayout'
import HeaderSection from '../../component/common/HeaderSection'

type Props = {}

const AccountantDashboard = (props: Props) => {
  return (
    <Layout>
      <HeaderSection />
      <div style={styles.container}>
        <h1 style={styles.title}>Coming Soon</h1>
        <p style={styles.subtitle}>
          We're working on something awesome! Stay tuned.
        </p>
      </div>
    </Layout>
  )
}

export default AccountantDashboard

// Define styles with explicit TypeScript types
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column', // Correctly typed as a valid CSS value
    alignItems: 'center',
    justifyContent: 'center',
    height: '80vh',
    textAlign: 'center',
    backgroundColor: '#f9f9f9',
    padding: '20px',
  },
  title: {
    fontSize: '48px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '16px',
  },
  subtitle: {
    fontSize: '18px',
    color: '#666',
  },
}
