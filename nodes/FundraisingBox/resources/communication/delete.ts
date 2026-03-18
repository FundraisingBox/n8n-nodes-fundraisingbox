import type { INodeProperties } from 'n8n-workflow';

export const communicationDeleteDescription: INodeProperties[] = [
	{
		displayName: 'Communication ID',
		name: 'communicationId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				operation: ['delete'],
				resource: ['communication'],
			},
		},
		default: 0,
		description: 'The ID of the communication to delete',
	},
];
