import type { INodeProperties } from 'n8n-workflow';

const showOnlyForProjectList = {
	operation: ['list'],
	resource: ['project'],
};

export const projectListDescription: INodeProperties[] = [
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: { show: showOnlyForProjectList },
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
				...showOnlyForProjectList,
				returnAll: [false],
			},
		},
		default: 50,
		description: 'Max number of results to return',
	},
];
