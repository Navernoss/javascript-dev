import { client } from "./utils/client.ts";

const supabase = client();

interface paySubscriptionContext {
  telegram_id: number;
  isSubscription: boolean;
}

async function paySubscription(
  { telegram_id, isSubscription }: paySubscriptionContext,
): Promise<void> {
  const { data, error } = await supabase
    .from("users")
    .update({ isSubscription: isSubscription })
    .eq("telegram_id", telegram_id);

  if (error) {
    console.error("Ошибка при обновлении подписки:", error);
    throw error;
  }

  console.log("Статус подписки успешно обновлён:", data);
}

export { paySubscription };
