import type { INodeProperties } from 'n8n-workflow';

export const personGetDescription: INodeProperties[] = [
	{
		displayName: 'Person ID',
		name: 'personId',
		type: 'number',
		required: true,
		typeOptions: { minValue: 1 },
		displayOptions: {
			show: {
				operation: ['get'],
				resource: ['person'],
			},
		},
		default: 0,
		description: 'The ID of the person to retrieve',
	},
];
