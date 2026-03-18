import type { INodeProperties } from 'n8n-workflow';

const showOnlyForSourceList = {
	operation: ['list'],
	resource: ['source'],
};

export const sourceListDescription: INodeProperties[] = [
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: { show: showOnlyForSourceList },
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
				...showOnlyForSourceList,
				returnAll: [false],
			},
		},
		default: 50,
		description: 'Max number of results to return',
	},
];
