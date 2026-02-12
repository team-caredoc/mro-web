import { cookies } from "next/headers";

import LoginForm from "./_containers/LoginForm";

async function MainPage() {
  const cookieStore = await cookies();
  const csrfToken = cookieStore.get("caredoc-csrf-token")?.value;

  return <LoginForm csrfToken={csrfToken ?? ""} />;
}

export default MainPage;
