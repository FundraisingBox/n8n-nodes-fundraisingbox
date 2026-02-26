import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
	Icon,
} from 'n8n-workflow';

export class FundraisingBoxApi implements ICredentialType {
	name = 'fundraisingBoxApi';

	icon: Icon = 'file:../nodes/FundraisingBox/fundraisingbox.svg';

	displayName = 'FundraisingBox API';

	documentationUrl = 'https://github.com/fundraisingbox/n8n-nodes-fundraisingbox#credentials';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			required: true,
			default: '',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			auth: {
				username: '={{$credentials.apiKey}}',
				password: 'x',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.fundraisingbox.com/v1',
			url: '/persons.json?perPage=1',
			method: 'GET',
		},
	};
}
