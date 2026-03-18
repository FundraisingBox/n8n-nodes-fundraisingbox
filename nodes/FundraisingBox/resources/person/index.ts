import type { INodeProperties } from 'n8n-workflow';
import { personCreateDescription } from './create';
import { personGetDescription } from './get';
import { personListDescription } from './list';
import { personUpdateDescription } from './update';

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
				name: 'Create',
				value: 'create',
				action: 'Create a person',
				description: 'Create a new person',
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get a person',
				description: 'Retrieve a person',
			},
			{
				name: 'Get Many',
				value: 'list',
				action: 'Get many persons',
				description: 'Retrieve a list of persons',
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a person',
				description: 'Update an existing person',
			},
		],
		default: 'get',
	},
	...personCreateDescription,
	...personGetDescription,
	...personListDescription,
	...personUpdateDescription,
];
