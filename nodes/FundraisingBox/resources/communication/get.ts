import type { INodeProperties } from 'n8n-workflow';

export const communicationGetDescription: INodeProperties[] = [
	{
		displayName: 'Communication ID',
		name: 'communicationId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				operation: ['get'],
				resource: ['communication'],
			},
		},
		default: 0,
		description: 'The ID of the communication to retrieve',
	},
];
