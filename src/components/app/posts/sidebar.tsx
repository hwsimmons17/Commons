import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";

interface SidebarProps {
  userName: string;
  userImage: string;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Sidebar(props: SidebarProps) {
  const supabase = useSupabaseClient();
  const router = useRouter();

  const signout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
      <div className="flex h-16 shrink-0 items-center">
        <img className="h-14 w-auto" src="./Commons_icon.png" alt="Commons" />
      </div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1"></ul>
          </li>
          <li>
            <div className="text-xs font-semibold leading-6 text-gray-400">
              Your groups
            </div>
            <ul role="list" className="-mx-2 mt-2 space-y-1">
              <li>
                <div
                  className={classNames(
                    "text-gray-700 hover:text-indigo-600 hover:bg-gray-50 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold cursor-pointer"
                  )}
                >
                  <img
                    src="./rolex_seadweller.jpeg"
                    className="object-cover border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border"
                  />
                  <span className="truncate">
                    Drinking Coffee & Talking Watches
                  </span>
                </div>
              </li>
            </ul>
          </li>
          <li className="-mx-6 mt-auto" onClick={signout}>
            <a
              href="#"
              className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50"
            >
              <img
                className="h-8 w-8 rounded-full bg-gray-50"
                src={props.userImage}
                alt=""
              />
              <span className="sr-only">Your profile</span>
              <span aria-hidden="true">{props.userName}</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
