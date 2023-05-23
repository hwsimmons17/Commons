import jwtDecode from "jwt-decode";
import { FacebookUser } from "./facebook";
import { UUID } from "crypto";
import moment from "moment";

export type Post = {
  id: UUID;
  created_at: Date;
  content: string;
  parent_id: UUID | null;
  creator_name: string;
  creator_picture: string;
  formattedTime: string;
};

export class ServerClient {
  url: URL;
  authHeader: string;

  constructor() {
    this.url = new URL(process.env.NEXT_PUBLIC_SERVER_URL!);

    let cookies = document.cookie.split("; ").reduce((prev, current) => {
      const [name, ...value] = current.split("=");
      //@ts-ignore
      prev[name] = value.join("=");
      return prev;
    }, {});
    //@ts-ignore
    let decoded = cookies["custom_session"];

    this.authHeader = decoded;
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

  createPost = async (content: string) => {
    var url = this.url;
    url.pathname = "/posts";
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.authHeader,
      },
      body: JSON.stringify({ content }),
    });

    if (!res.ok) {
      throw Error("error saving user");
    }
  };

  getPosts = async (): Promise<[Post]> => {
    var url = this.url;
    url.pathname = "/posts";
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.authHeader,
      },
    });

    if (!res.ok) {
      throw Error("error saving user");
    }

    let body: [Post] = await res.json();

    body.forEach((post) => {
      post.formattedTime = formatTime(post.created_at);
    });

    return body;
  };
}

const formatTime = (time: Date): string => {
  return moment(time).fromNow();
};
