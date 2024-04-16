export type OAuthDto = {
  code: string;
};

export abstract class AbstractOAuthStrategy {
  async logIn(authDto: OAuthDto): Promise<any> {
    return null;
  }
  async getUser(accessToken: string): Promise<any> {
    return null;
  }
  async getAuthUrl(): Promise<string> {
    return null;
  }
}
