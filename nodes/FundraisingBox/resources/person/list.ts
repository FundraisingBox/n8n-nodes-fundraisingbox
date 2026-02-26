import type { INodeProperties } from 'n8n-workflow';

const showOnlyForPersonList = {
	operation: ['list'],
	resource: ['person'],
};

export const personListDescription: INodeProperties[] = [
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: { show: showOnlyForPersonList },
		default: false,
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: { minValue: 1 },
		displayOptions: {
			show: {
				...showOnlyForPersonList,
				returnAll: [false],
			},
		},
		default: 50,
		description: 'Max number of results to return',
	},
];
