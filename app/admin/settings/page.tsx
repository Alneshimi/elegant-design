import { changePassword } from "./actions";

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: Promise<{
    success?: string;
  }>;
}) {
  const params =
    await searchParams;

  return (
    <div>
      <h1 className="text-4xl font-bold mb-10">
        Settings
      </h1>

      {params.success ===
        "password-updated" && (
        <div className="bg-green-100 text-green-700 border border-green-300 p-4 rounded-lg mb-6">
          ✅ Password updated successfully
        </div>
      )}

      <div className="bg-white p-8 rounded-xl shadow max-w-xl">

        <h2 className="text-2xl font-semibold mb-6">
          Change Password
        </h2>

        <form
          action={
            changePassword
          }
          className="space-y-5"
        >
          <div>
            <label className="block mb-2">
              Current Password
            </label>

            <input
              name="currentPassword"
              type="password"
              className="w-full border p-3 rounded-lg"
            />
          </div>

          <div>
            <label className="block mb-2">
              New Password
            </label>

            <input
              name="newPassword"
              type="password"
              className="w-full border p-3 rounded-lg"
            />
          </div>

          <div>
            <label className="block mb-2">
              Confirm New Password
            </label>

            <input
              name="confirmPassword"
              type="password"
              className="w-full border p-3 rounded-lg"
            />
          </div>

          <button
            type="submit"
            className="bg-black text-white px-6 py-3 rounded-lg"
          >
            Update Password
          </button>
        </form>

      </div>
    </div>
  );
}