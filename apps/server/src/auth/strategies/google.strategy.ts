import { BadRequestException, Injectable } from '@nestjs/common';

import { googleConstants } from '@apps/constants/google.constant';
import { AbstractOAuthStrategy, OAuthDto } from '@apps/types/auth.type';
import { AuthorizationCode } from 'simple-oauth2';

@Injectable()
export class GoogleStrategy implements AbstractOAuthStrategy {
  private oauth2Client: AuthorizationCode;
  constructor() {
    this.oauth2Client = new AuthorizationCode({
      client: {
        id: googleConstants.clientID,
        secret: googleConstants.clientSecret,
      },
      auth: {
        authorizeHost: googleConstants.authorizeHost,
        authorizePath: googleConstants.authorizePath,
        tokenHost: googleConstants.tokenHost,
        tokenPath: googleConstants.tokenPath,
      },
    });
  }

  async logIn(authData: OAuthDto) {
    console.log({ authData });

    if (!('code' in authData)) {
      throw new BadRequestException('Code is not provided');
    }

    const response = await this.oauth2Client.getToken({
      code: authData.code,
      redirect_uri: googleConstants.callbackURL,
      scope: googleConstants.scopes,
    });

    const { access_token } = response.token as { access_token: string };
    const user = await this.getUser(access_token);
    console.log({ user });

    return { accessToken: access_token };
  }

  async getUser(accessToken: string) {
    const response = await fetch(googleConstants.profileURL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      console.log(response.statusText);
      return null;
    }
    const data = await response.json();
    return data;
  }

  async getAuthUrl() {
    const authorizationUri = this.oauth2Client.authorizeURL({
      redirect_uri: googleConstants.callbackURL,
      scope: googleConstants.scopes,
    });
    return authorizationUri;
  }
}
