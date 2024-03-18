import { client } from "./utils/client.ts";

const supabase = client();

interface getSubscriptionContext {
  telegram_id: number;
}

async function getSubscription(
  { telegram_id }: getSubscriptionContext,
): Promise<boolean | null> {
  const { data, error } = await supabase
    .from("users")
    .select("isSubscription")
    .eq("telegram_id", telegram_id)
    .single();

  if (error) {
    console.error("Ошибка при получении статуса подписки:", error);
    return null;
  }

  console.log("Статус подписки получен:", data);
  return data.isSubscription;
}

export { getSubscription };
