import type { INodeProperties } from 'n8n-workflow';
import { donationTypeGetDescription } from './get';
import { donationTypeListDescription } from './list';

export const donationTypeDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['donationType'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				action: 'Get a donation type',
				description: 'Retrieve a donation type',
			},
			{
				name: 'Get Many',
				value: 'list',
				action: 'Get many donation types',
				description: 'Retrieve a list of donation types',
			},
		],
		default: 'get',
	},
	...donationTypeGetDescription,
	...donationTypeListDescription,
];
