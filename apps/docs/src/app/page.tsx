export default function Home(): React.JSX.Element {
  return (
    <main className="flex h-full flex-col items-center justify-center">
      <h1 className="p-4 font-bold">Docs</h1>
      <div className="space-y-4">
        <pre className="select-all rounded-lg border px-3 py-2">
          bun storybook
        </pre>
      </div>
    </main>
  );
}
