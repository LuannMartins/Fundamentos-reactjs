import styles from './Header.module.css'

import igniteLogo from '../assets/ignite-Logo.svg'

export function Header() { // É necessario coloca chaves para variavel javaScript dentro do HTML.
    return (
        <header className={styles.header}>
            <img src={igniteLogo} alt="Logo do Ignite" />
        </header>
    );
}