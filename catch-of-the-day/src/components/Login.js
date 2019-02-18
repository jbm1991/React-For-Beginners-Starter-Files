import React from 'react';
import PropTypes from 'prop-types';

const Login = props => (
	<nav className="login">
		<h2>Inventory</h2>
		<p>Sign in to manage your stores inventory</p>
		<button className="github" onClick={() => props.authenticate('Github')}>
			Log In With GitHub
		</button>
		<button className="twitter" onClick={() => props.authenticate('Twitter')}>
			Log In With Twitter
		</button>
	</nav>
);

Login.propTypes = {
	authenticate: PropTypes.func.isRequired
};

export default Login;
