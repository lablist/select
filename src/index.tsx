'use strict';

interface IHelloMessage {
  name: string;
};

import { createRoot } from 'react-dom/client';

function HelloMessage({ name }:IHelloMessage) {
  return <div>Hello {name}</div>;
}

const appEl = document.getElementById('app') as HTMLElement;
const root = createRoot(appEl);
root.render(<HelloMessage name="Taylor" />);
