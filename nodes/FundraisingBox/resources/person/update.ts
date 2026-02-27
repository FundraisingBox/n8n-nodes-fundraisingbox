import type { INodeProperties } from 'n8n-workflow';

export const personUpdateDescription: INodeProperties[] = [
	{
		displayName: 'Person ID',
		name: 'personId',
		type: 'number',
		required: true,
		typeOptions: { minValue: 1 },
		displayOptions: {
			show: {
				operation: ['update'],
				resource: ['person'],
			},
		},
		default: 0,
		description: 'The ID of the person to update',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				operation: ['update'],
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
				displayName: 'First Name',
				name: 'first_name',
				type: 'string',
				default: '',
				description: "Person's given name",
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
				displayName: 'Last Name',
				name: 'last_name',
				type: 'string',
				default: '',
				description: "Person's family name",
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
