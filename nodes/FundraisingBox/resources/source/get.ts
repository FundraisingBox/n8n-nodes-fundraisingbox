import type { INodeProperties } from 'n8n-workflow';

export const sourceGetDescription: INodeProperties[] = [
	{
		displayName: 'Source ID',
		name: 'sourceId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				operation: ['get'],
				resource: ['source'],
			},
		},
		default: 0,
		description: 'The ID of the source to retrieve',
	},
];
