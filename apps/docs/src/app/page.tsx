import { Demo } from '@/ui/demo';

export default function Home(): React.JSX.Element {
  return (
    <main className="flex h-full flex-col items-center justify-center space-y-8 p-4">
      <h1 className="font-bold">Docs</h1>

      <div className="space-y-4">
        <pre className="select-all rounded-lg border px-3 py-2">
          bun storybook
        </pre>

        <Demo />
      </div>

      <article className="prose lg:prose-xl">
        <h1>Garlic bread with cheese: What the science tells us</h1>
        <p>
          For years parents have espoused the health benefits of eating garlic
          bread with cheese to their children, with the food earning such an
          iconic status in our culture that kids will often dress up as warm,
          cheesy loaf for Halloween.
        </p>
        <p>
          But a recent study shows that the celebrated appetizer may be linked
          to a series of rabies cases springing up around the country.
        </p>
      </article>
    </main>
  );
}
