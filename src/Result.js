import { h, render, Component, Text } from 'ink'

export default ({ result }) => (
	<div>
		<Text>Module: {result._id}</Text>
		<br />
		<Text>Description: {result.description}</Text>
		<br />
		<Text>Maintainers:</Text>
		<br />
		{result.maintainers.map(m => (
			<Text>
				- {m.name}
				<br />
			</Text>
		))}
	</div>
)
