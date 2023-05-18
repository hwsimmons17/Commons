import jwtDecode from "jwt-decode";

export type FacebookUser = {
  email: string;
  name: string;
  picture: string;
  id: string;
};

type MetabaseJWT<T> = {
  user_metadata: T;
};

type FacebookMetadata = {
  avatar_url: string;
  email: string;
  full_name: string;
  name: string;
  nickname: string;
  picture: string;
  provider_id: string;
  slug: string;
  sub: string;
};

export class Facebook {
  appID: string;

  constructor(appID: string) {
    this.appID = appID;
  }

  // Note user must be logged in via metabase
  getUserMetadata = (): FacebookMetadata => {
    const cookies = document.cookie;

    const decoded: MetabaseJWT<FacebookMetadata> = jwtDecode(cookies);

    return decoded.user_metadata;
  };
}
