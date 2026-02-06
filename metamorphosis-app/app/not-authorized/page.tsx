export default function NotAuthorized() {
  return (
    <div className="min-h-screen grid place-items-center p-6">
      <div className="max-w-md text-center space-y-2">
        <h1 className="text-2xl font-bold">Not authorised</h1>
        <p>You don’t have access to this page.</p>
      </div>
    </div>
  );
}
