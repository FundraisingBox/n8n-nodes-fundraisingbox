import type { INodeProperties } from 'n8n-workflow';

export const personCreateDescription: INodeProperties[] = [
	{
		displayName: 'First Name',
		name: 'first_name',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				operation: ['create'],
				resource: ['person'],
			},
		},
		description: "Person's given name",
	},
	{
		displayName: 'Last Name',
		name: 'last_name',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				operation: ['create'],
				resource: ['person'],
			},
		},
		description: "Person's family name",
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
				resource: ['person'],
			},
		},
		options: [
			{
				displayName: 'Company ID',
				name: 'company_id',
				type: 'number',
				default: 0,
				description: 'ID of the company to associate this person with',
			},
			{
				displayName: 'External Person ID',
				name: 'external_person_id',
				type: 'string',
				default: '',
				description: 'Identifier from an external system',
			},
			{
				displayName: 'Greeting',
				name: 'greeting',
				type: 'string',
				default: '',
				description: 'Custom greeting text used in communications',
			},
			{
				displayName: 'Info',
				name: 'info',
				type: 'string',
				typeOptions: { rows: 3 },
				default: '',
				description: 'Free-text notes about the person',
			},

			{
				displayName: 'Position',
				name: 'position',
				type: 'string',
				default: '',
				description: 'Job title or role',
			},
			{
				displayName: 'Salutation',
				name: 'salutation',
				type: 'options',
				options: [
					{ name: 'Couple', value: 'couple' },
					{ name: 'Diverse', value: 'diverse' },
					{ name: 'Family', value: 'family' },
					{ name: 'Mr.', value: 'Mr.' },
					{ name: 'Mrs.', value: 'Mrs.' },
				],
				default: 'Mrs.',
			},
			{
				displayName: 'Title',
				name: 'title',
				type: 'string',
				default: '',
				description: 'Academic or professional title (e.g. Dr)',
			},
		],
	},
];
