import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';
import base from '../base';
import PropTypes from 'prop-types';

class App extends React.Component {
	static propTypes = {
		match: PropTypes.object
	};

	state = {
		fishes: {},
		order: {}
	};

	componentDidMount() {
		const { params } = this.props.match;
		// first reinstate our local storage
		const localStorageRef = localStorage.getItem(params.storeId);
		if (localStorageRef) {
			this.setState({ order: JSON.parse(localStorageRef) });
		}
		// store binding in this.ref so we can acccess it in unmount below
		this.ref = base.syncState(`${params.storeId}/fishes`, { context: this, state: 'fishes' });
	}

	componentDidUpdate() {
		const { params } = this.props.match;
		localStorage.setItem(params.storeId, JSON.stringify(this.state.order));
	}

	componentWillUnmount() {
		base.removeBinding(this.ref);
	}

	addFish = fish => {
		// to update state
		// 1. take a copy of the existing state
		const fishes = { ...this.state.fishes };
		// 2. Add our new fish to the fishes copy
		fishes[`fish${Date.now()}`] = fish;
		// 3. Set the new fishes object to state
		this.setState({ fishes: fishes });
	};

	updateFish = (key, updatedFish) => {
		// 1. take a copy of the current state
		const fishes = { ...this.state.fishes };
		// 2. update that state
		fishes[key] = updatedFish;
		// 3. set to state
		this.setState({ fishes: fishes });
	};

	deleteFish = key => {
		// 1. take a copy of the current state
		const fishes = { ...this.state.fishes };
		// 2. remove the item
		fishes[key] = null; // set to null because mirroring to firebase
		// 3. set to state
		this.setState({ fishes }); // short hand for fishes: fishes
	};

	loadSampleFishes = () => {
		this.setState({ fishes: sampleFishes });
	};

	addToOrder = key => {
		// 1. take a copy of the existing state
		const order = { ...this.state.order };
		// 2. Add or update the order
		order[key] = order[key] + 1 || 1;
		// 3. Set the new order object to state
		this.setState({ order: order });
	};

	deleteFromOrder = key => {
		// 1. take a copy of the existing state
		const order = { ...this.state.order };
		// 2. update the order
		delete order[key]; // can use delete here because we're not mirroring to firebase
		// 3. Set the new order object to state
		this.setState({ order }); // shorthand
	};

	render() {
		return (
			<div className="catch-of-the-day">
				<div className="menu">
					<Header tagline="Fresh Seafood Market" />
					<ul className="fishes">
						{Object.keys(this.state.fishes).map(key => (
							<Fish
								key={key}
								details={this.state.fishes[key]}
								addToOrder={this.addToOrder}
								index={key}
							/>
						))}
					</ul>
				</div>
				<Order
					fishes={this.state.fishes}
					order={this.state.order}
					deleteFromOrder={this.deleteFromOrder}
				/>
				<Inventory
					addFish={this.addFish}
					updateFish={this.updateFish}
					deleteFish={this.deleteFish}
					loadSampleFishes={this.loadSampleFishes}
					fishes={this.state.fishes}
				/>
			</div>
		);
	}
}

export default App;
