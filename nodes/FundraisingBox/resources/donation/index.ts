import type { INodeProperties } from 'n8n-workflow';
import { donationGetDescription } from './get';
import { donationListDescription } from './list';

export const donationDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['donation'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				action: 'Get a donation',
				description: 'Get a donation by ID',
			},
			{
				name: 'List',
				value: 'list',
				action: 'List donations',
				description: 'List donations',
			},
		],
		default: 'get',
	},
	...donationGetDescription,
	...donationListDescription,
];
