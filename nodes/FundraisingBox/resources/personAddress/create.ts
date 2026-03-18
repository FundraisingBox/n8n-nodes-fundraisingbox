import type { INodeProperties } from 'n8n-workflow';

export const personAddressCreateDescription: INodeProperties[] = [
	{
		displayName: 'Person ID',
		name: 'fb_person_id',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				operation: ['create'],
				resource: ['personAddress'],
			},
		},
		default: 0,
		description: 'The ID of the person to associate this address with',
	},
	{
		displayName: 'Street Address',
		name: 'address',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: ['create'],
				resource: ['personAddress'],
			},
		},
		default: '',
		description: 'Street address including house number',
	},
	{
		displayName: 'Postal Code',
		name: 'post_code',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: ['create'],
				resource: ['personAddress'],
			},
		},
		default: '',
	},
	{
		displayName: 'City',
		name: 'city',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: ['create'],
				resource: ['personAddress'],
			},
		},
		default: '',
	},
	{
		displayName: 'Country',
		name: 'country',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: ['create'],
				resource: ['personAddress'],
			},
		},
		default: '',
		description: 'Country code (e.g. DE, AT, CH)',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				operation: ['create'],
				resource: ['personAddress'],
			},
		},
		options: [
			{
				displayName: 'Is Main',
				name: 'is_main',
				type: 'boolean',
				default: true,
				description: 'Whether this is the primary address for the person',
			},
			{
				displayName: 'State',
				name: 'state',
				type: 'string',
				default: '',
				description: 'State or region',
			},
			{
				displayName: 'Type',
				name: 'type',
				type: 'options',
				options: [
					{ name: 'Home', value: 'home' },
					{ name: 'Other', value: 'other' },
					{ name: 'Work', value: 'work' },
				],
				default: 'home',
				description: 'Classification of the address',
			},
		],
	},
];
