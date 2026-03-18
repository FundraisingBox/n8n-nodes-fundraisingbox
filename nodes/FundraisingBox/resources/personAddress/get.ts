import type { INodeProperties } from 'n8n-workflow';

export const personAddressGetDescription: INodeProperties[] = [
	{
		displayName: 'Address ID',
		name: 'addressId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				operation: ['get'],
				resource: ['personAddress'],
			},
		},
		default: 0,
		description: 'The ID of the address to retrieve',
	},
];
