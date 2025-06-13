import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Logo from '../../assets/images/HIVETechwear.svg';
import { getUser } from '../../reducks/users/selectors';
import CartLink from './CartLink';
import Search from './Search';
import SignInLink from './SignInLink';
import SignOutLink from './SignOutLink';
import SignUpLink from './SignUpLink';


export default function Header(props) {
	const { totalCart, setSearch, setPage } = props;
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const selector = useSelector((state) => state);
	const user = getUser(selector);
	// const token = user ? user.token : null;
	const token = getUser(selector)?.token;
	
	return (
		<header className="header">
			<Link to="/">
				<img className="logo" src={Logo} alt="HIVETechwear" />
			</Link>
			<input id="menu__toggle" type="checkbox" />
			<label className="menu__btn" htmlFor="menu__toggle">
				<span></span>
			</label>
			<ul className="menu__box">
				{pathname === "/sign-in" ? (
					<SignUpLink />
				) : pathname === "/sign-up" ? (
					<SignInLink />
				) : token ? (
					<>
						{setSearch && <Search setSearch={setSearch} setPage={setPage} />}
						<CartLink totalCart={totalCart} />
						<SignOutLink />
					</>
				) : (
					<>
						<SignInLink />
						<SignUpLink />
					</>
				)}
			</ul>
		</header>
	);
}













