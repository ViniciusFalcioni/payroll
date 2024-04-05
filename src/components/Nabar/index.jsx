import React from 'react'
import styles from './Navbar.module.scss'

const Navbar = () => {
    return (
        <nav>
            <div className={styles.navContainer}>
                <div className={styles.navTitle}>Folha de Pagamentos</div>
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Pesquisar funcionários..."
                    />
                </div>
            </div>
        </nav>
    )
}

export default Navbar