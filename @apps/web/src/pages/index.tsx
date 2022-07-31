import { useAssertiveStore } from '@/frontend/context/assertives';

export default function IndexPage() {
  const { showNoti } = useAssertiveStore();

  return (
    <div className="mx-auto max-w-screen-lg py-12">
      <button onClick={() => showNoti({ title: 'hello', content: 'world' })}>click me</button>
    </div>
  );
}
