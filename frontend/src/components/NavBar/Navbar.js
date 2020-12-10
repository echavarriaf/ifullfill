import logo from "../../images/logo.png";
import { MenuItems } from './MenuItems';
import { Button } from "../Button";
import './Navbar.css';

const { useEffect, Component } = require("react")


class Navbar extends Component {
    state = { clicked: false }

    handleClick = () => {
        this.setState({ clicked: !this.state.clicked })
    }

    render() {
        return (
            <nav className="NavbarItems">
                <img className="navbar-logo" src={logo} alt='logo' />
                <div className="menu-icon" onClick={this.handleClick}>
                    <i className={this.state.clicked ? 'fa fa-times' : 'fa fa-bars'}>
                        {this.state.clicked ? 'x' : '-'}
                    </i>
                </div>
                <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
                    {MenuItems.map((item, index) => {
                        return (
                            <li key={index}>
                                <a className={item.cName} href={item.url}>
                                    {item.title}
                                </a>
                            </li>
                        )
                    })}
                </ul>
                <Button>Sign Up</Button>
            </nav>
        )
    }
}


export default Navbar;