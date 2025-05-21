import { RequestApi } from 'api/apiClients/request';
import { apiConfig } from 'config';
import { ICredentials, ILoginResponse, IRequestOptions } from 'types';

export class SignInController {
  constructor(private request = new RequestApi()) {}

  async login(body: ICredentials) {
    const options: IRequestOptions = {
      url: apiConfig.ENDPOINTS.LOGIN,
      method: 'post',
      headers: {
        'content-type': 'application/json',
      },
      data: body,
    };
    return await this.request.send<ILoginResponse>(options);
  }
}
