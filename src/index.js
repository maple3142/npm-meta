#!/usr/bin/env node
import { h, render, Component, Text } from 'ink'
import TextInput from 'ink-text-input'
import Spinner from 'ink-spinner'
import autobind from 'autobind-decorator'
import axios from 'axios'

import Result from './Result'

const initialState = {
	search: '',
	status: 'wait',
	result: {},
	cont: ''
}

class App extends Component {
	state = initialState
	constructor() {
		super()
	}
	render(props, state) {
		return (
			<div>
				{state.status === 'wait' ? (
					<div>
						<Text>Search: </Text>
						<TextInput
							value={state.search}
							onChange={this.handleChange('search')}
							onSubmit={this.onSearch}
						/>
					</div>
				) : state.status === 'loading' ? (
					<div>
						<Spinner green /> <Text>Loading...</Text>
					</div>
				) : (
					<div>
						{state.status === 'error' ? (
							<Text>
								Module {state.search} not found.<br />
								<br />
							</Text>
						) : (
							<Result result={state.result} />
						)}
						<Text>Continue?(y/n):&nbsp;</Text>
						<TextInput value={state.cont} onChange={this.handleChange('cont')} onSubmit={this.onContinue} />
					</div>
				)}
			</div>
		)
	}

	@autobind
	handleChange(name) {
		return value =>
			this.setState({
				[name]: value
			})
	}

	@autobind
	onSearch(search) {
		this.setState({
			status: 'loading'
		})
		axios
			.get(`https://registry.npmjs.org/${encodeURIComponent(search)}`)
			.then(({ data }) =>
				this.setState({
					status: 'ok',
					result: data
				})
			)
			.catch(e =>
				this.setState({
					status: 'error'
				})
			)
	}

	@autobind
	onContinue(cont) {
		if (cont.startsWith('y')) {
			this.setState(initialState)
		} else process.exit(0)
	}
}

render(<App />)
