export class Provider {
  provider: any;

  constructor(provider: any) {
    this.provider = provider;
  }

  /**
   * @throws {Error}
   */
  connect = async () => {
    const [provider, hasProvider] = getProvider();
    if (!hasProvider) {
      throw Error("No provider");
    }
    try {
      const resp = await this.provider.connect();
      console.log(resp);
    } catch (err) {
      throw err;
    }
  };

  signMessage = async (message: string) => {
    const encodedMessage = new TextEncoder().encode(message);
    const signedMessage = await this.provider.request({
      method: "signMessage",
      params: {
        message: encodedMessage,
        display: "hex",
      },
    });
    console.log(signedMessage);
  };
}

export const getProvider: () => [Provider, boolean] = function () {
  //@ts-ignore
  const provider = window.phantom?.solana as any;

  if (provider?.isPhantom) {
    return [new Provider(provider), true];
  }

  return [new Provider(null), false];
};
