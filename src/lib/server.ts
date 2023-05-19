import { FacebookUser } from "./facebook";

export class ServerClient {
  url: URL;

  constructor() {
    this.url = new URL(process.env.NEXT_PUBLIC_SERVER_URL!);
  }

  saveUser = async (user: FacebookUser) => {
    var url = this.url;
    url.pathname = "/user";
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!res.ok) {
      throw Error("error saving user");
    }
  };
}
