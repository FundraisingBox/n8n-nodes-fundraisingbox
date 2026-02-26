import type { INodeProperties } from 'n8n-workflow';
import { personGetDescription } from './get';
import { personListDescription } from './list';

export const personDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['person'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				action: 'Get a person',
				description: 'Get a person by ID',
			},
			{
				name: 'List',
				value: 'list',
				action: 'List persons',
				description: 'List persons',
			},
		],
		default: 'get',
	},
	...personGetDescription,
	...personListDescription,
];
