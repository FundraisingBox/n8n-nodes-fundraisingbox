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
				description: 'Get a donation type by ID',
			},
			{
				name: 'List',
				value: 'list',
				action: 'List donation types',
				description: 'List all donation types',
			},
		],
		default: 'get',
	},
	...donationTypeGetDescription,
	...donationTypeListDescription,
];
